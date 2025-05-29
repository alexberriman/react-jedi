import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import {
  useRovingTabIndex,
  useEscapeKey,
  useArrowNavigation,
  useTypeahead,
  createMenuNavigation,
} from "@/lib/accessibility/keyboard-navigation";
import { ChevronRight, ChevronDown } from "lucide-react";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  action?: () => void;
  submenu?: MenuItem[];
}

interface KeyboardNavigationMenuProps {
  items: MenuItem[];
  onSelect?: (item: MenuItem) => void;
  className?: string;
  showShortcuts?: boolean;
  orientation?: "horizontal" | "vertical";
  role?: "menu" | "navigation";
}

export function KeyboardNavigationMenu({
  items,
  onSelect,
  className,
  showShortcuts = true,
  orientation = "vertical",
  role = "menu",
}: Readonly<KeyboardNavigationMenuProps>) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Use roving tabindex for keyboard navigation
  const { focusedIndex, setFocusedIndex } = useRovingTabIndex(menuRef, {
    orientation,
    loop: true,
  });

  // Enable typeahead search
  useTypeahead(menuRef, {
    onMatch: (query) => {
      setSearchQuery(query);
      // Find first matching item
      const flatItems = flattenItems(items);
      const matchIndex = flatItems.findIndex((item) =>
        item.label.toLowerCase().startsWith(query.toLowerCase())
      );
      if (matchIndex !== -1) {
        setFocusedIndex(matchIndex);
      }
    },
  });

  // Handle escape key
  useEscapeKey(() => {
    setSelectedId(null);
    setSearchQuery("");
  });

  // Handle arrow navigation with submenu support
  useArrowNavigation(menuRef, {
    orientation,
    onNavigate: (direction) => {
      const flatItems = flattenItems(items);
      const currentItem = flatItems[focusedIndex];

      if (!currentItem) return;

      if (direction === "right" && currentItem.submenu) {
        // Expand submenu
        setExpandedIds((prev) => new Set(prev).add(currentItem.id));
      } else if (direction === "left") {
        // Collapse current submenu or go to parent
        const parentItem = findParentItem(items, currentItem.id);
        if (parentItem && expandedIds.has(parentItem.id)) {
          setExpandedIds((prev) => {
            const next = new Set(prev);
            next.delete(parentItem.id);
            return next;
          });
        }
      }
    },
  });

  // Initialize menu navigation
  useEffect(() => {
    if (!menuRef.current) return;

    const navigation = createMenuNavigation(menuRef, {
      orientation,
      itemSelector: '[role="menuitem"]',
      submenuSelector: '[role="menu"]',
    });

    navigation.initialize();
    return () => navigation.cleanup();
  }, [orientation]);

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;

    if (item.submenu) {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(item.id)) {
          next.delete(item.id);
        } else {
          next.add(item.id);
        }
        return next;
      });
    } else {
      item.action?.();
      onSelect?.(item);
      setSelectedId(item.id);
    }
  };

  const renderMenuItem = (item: MenuItem, index: number, level: number = 0) => {
    const isExpanded = expandedIds.has(item.id);
    const isSelected = selectedId === item.id;
    const isFocused = index === focusedIndex;

    return (
      <div key={item.id} data-level={level}>
        <div
          role="menuitem"
          tabIndex={isFocused ? 0 : -1}
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            isFocused && "bg-muted",
            isSelected && "bg-primary text-primary-foreground",
            item.disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onClick={() => handleItemClick(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleItemClick(item);
            }
          }}
          aria-expanded={item.submenu ? isExpanded : undefined}
          aria-disabled={item.disabled}
          style={{ paddingLeft: `${(level + 1) * 12}px` }}
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <span>{item.label}</span>
          </div>

          <div className="flex items-center gap-2">
            {showShortcuts && item.shortcut && (
              <kbd className="px-1.5 py-0.5 text-xs bg-muted border rounded">{item.shortcut}</kbd>
            )}
            {item.submenu && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
          </div>
        </div>

        {item.submenu && isExpanded && (
          <div role="menu" className="ml-2">
            {item.submenu.map((subItem, subIndex) =>
              renderMenuItem(subItem, items.indexOf(item) + subIndex + 1, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={menuRef}
      role={role}
      className={cn(
        "w-full max-w-sm",
        orientation === "horizontal" && "flex flex-row gap-2",
        className
      )}
      aria-label="Navigation menu"
    >
      {searchQuery && (
        <div className="px-3 py-1 text-sm text-muted-foreground">Searching: {searchQuery}</div>
      )}
      {items.map((item, index) => renderMenuItem(item, index))}
    </div>
  );
}

// Helper functions
function flattenItems(items: MenuItem[]): MenuItem[] {
  const flat: MenuItem[] = [];

  function traverse(items: MenuItem[]) {
    for (const item of items) {
      flat.push(item);
      if (item.submenu) {
        traverse(item.submenu);
      }
    }
  }

  traverse(items);
  return flat;
}

function findParentItem(items: MenuItem[], childId: string): MenuItem | null {
  for (const item of items) {
    if (item.submenu?.some((sub) => sub.id === childId)) {
      return item;
    }
    if (item.submenu) {
      const parent = findParentItem(item.submenu, childId);
      if (parent) return parent;
    }
  }
  return null;
}
