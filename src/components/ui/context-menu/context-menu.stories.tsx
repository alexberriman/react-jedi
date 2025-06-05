import type { Meta, StoryFn } from "@storybook/react-vite";
import * as React from "react";
import { within, userEvent, expect, waitFor } from "storybook/test";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuShortcut,
} from "./";
import {
  CopyIcon,
  Scissors as CutIcon,
  ClipboardPaste as PasteIcon,
  TrashIcon,
  LinkIcon,
  UserIcon,
  StarIcon,
  Settings2Icon,
  ChevronRightIcon,
} from "lucide-react";

const meta: Meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modern, animated context menu for right-click interactions with a cutting-edge 2025 design aesthetic.",
      },
    },
  },

  tags: ["autodocs", "ui-context-menu"],
};

export default meta;

export const Default: StoryFn = () => {
  return (
    <div className="flex h-[350px] w-[450px] items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[200px] w-[350px] items-center justify-center rounded-md bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-zinc-200 dark:border-zinc-800 text-sm">
          Right-click me to open the context menu
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>
            <UserIcon className="size-4" />
            Profile
            <ContextMenuShortcut>⌘P</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Settings2Icon className="size-4" />
            Settings
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <CopyIcon className="size-4" />
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <CutIcon className="size-4" />
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <PasteIcon className="size-4" />
            Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <TrashIcon className="size-4" />
            Delete
            <ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

Default.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  // Find the trigger area
  const trigger = canvas.getByText("Right-click me to open the context menu");

  // Right-click to open context menu
  await userEvent.pointer([{ target: trigger, keys: "[MouseRight]" }]);

  // Wait for menu to appear - use screen since menus are often portaled
  await waitFor(
    () => {
      const profileItem = within(document.body).queryByText("Profile");
      expect(profileItem).toBeInTheDocument();
    },
    { timeout: 10_000 }
  );

  // Verify all menu items are visible
  expect(within(document.body).getByText("Settings")).toBeInTheDocument();
  expect(within(document.body).getByText("Copy")).toBeInTheDocument();
  expect(within(document.body).getByText("Cut")).toBeInTheDocument();
  expect(within(document.body).getByText("Paste")).toBeInTheDocument();
  expect(within(document.body).getByText("Delete")).toBeInTheDocument();

  // Click on Copy menu item
  await userEvent.click(within(document.body).getByText("Copy"));

  // Verify menu closes after clicking
  await waitFor(() => {
    expect(within(document.body).queryByText("Profile")).not.toBeInTheDocument();
  });
};

export const WithCheckboxAndRadio: StoryFn = () => {
  const [isChecked, setIsChecked] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState("medium");

  return (
    <div className="flex h-[350px] w-[450px] items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[200px] w-[350px] items-center justify-center rounded-md bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-zinc-200 dark:border-zinc-800 text-sm">
          Right-click for advanced options
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuLabel>Preferences</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked={isChecked} onCheckedChange={setIsChecked}>
            <span>Show notifications</span>
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Priority</ContextMenuLabel>
          <ContextMenuRadioGroup value={radioValue} onValueChange={setRadioValue}>
            <ContextMenuRadioItem value="high">
              <span>High</span>
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="medium">
              <span>Medium</span>
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="low">
              <span>Low</span>
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

WithCheckboxAndRadio.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  // Find and right-click the trigger
  const trigger = canvas.getByText("Right-click for advanced options");
  await userEvent.pointer([{ target: trigger, keys: "[MouseRight]" }]);

  // Wait for menu to appear
  await waitFor(
    () => {
      const preferencesLabel = within(document.body).queryByText("Preferences");
      expect(preferencesLabel).toBeInTheDocument();
    },
    { timeout: 10_000 }
  );

  // Find and click the checkbox - add timeout
  await waitFor(
    () => {
      const checkbox = within(document.body).getByText("Show notifications");
      expect(checkbox).toBeInTheDocument();
    },
    { timeout: 10_000 }
  );
  const checkbox = within(document.body).getByText("Show notifications");
  await userEvent.click(checkbox);

  // Click on a radio option
  const highPriority = within(document.body).getByText("High");
  await userEvent.click(highPriority);

  // Click outside to close menu
  await userEvent.click(document.body);

  // Verify menu is closed
  await waitFor(() => {
    expect(within(document.body).queryByText("Preferences")).not.toBeInTheDocument();
  });
};

export const WithSubMenu: StoryFn = () => {
  return (
    <div className="flex h-[350px] w-[450px] items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[200px] w-[350px] items-center justify-center rounded-md bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-zinc-200 dark:border-zinc-800 text-sm">
          Right-click for nested menus
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>
            <StarIcon className="size-4" />
            Add to favorites
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <LinkIcon className="size-4" />
              Share
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <LinkIcon className="size-4" />
                Copy link
              </ContextMenuItem>
              <ContextMenuItem>Email</ContextMenuItem>
              <ContextMenuItem>Message</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>More options</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>Twitter</ContextMenuItem>
                  <ContextMenuItem>LinkedIn</ContextMenuItem>
                  <ContextMenuItem>Facebook</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <Settings2Icon className="size-4" />
            Settings
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

WithSubMenu.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  // Right-click to open context menu
  const trigger = canvas.getByText("Right-click for nested menus");
  await userEvent.pointer([{ target: trigger, keys: "[MouseRight]" }]);

  // Wait for menu to appear
  await waitFor(
    () => {
      const favoritesItem = within(document.body).queryByText("Add to favorites");
      expect(favoritesItem).toBeInTheDocument();
    },
    { timeout: 10_000 }
  );

  // Hover over Share to open submenu
  const shareItem = within(document.body).getByText("Share");
  await userEvent.hover(shareItem);

  // Wait for submenu to appear
  await waitFor(() => {
    expect(within(document.body).getByText("Copy link")).toBeInTheDocument();
  });

  // Hover over "More options" to open nested submenu
  const moreOptions = within(document.body).getByText("More options");
  await userEvent.hover(moreOptions);

  // Wait for nested submenu
  await waitFor(() => {
    expect(within(document.body).getByText("Twitter")).toBeInTheDocument();
  });

  // Click on Twitter option
  await userEvent.click(within(document.body).getByText("Twitter"));

  // Verify menu closes
  await waitFor(() => {
    expect(within(document.body).queryByText("Add to favorites")).not.toBeInTheDocument();
  });
};

export const Modern2025: StoryFn = () => {
  const [theme, setTheme] = React.useState("gradient");
  const [autoSave, setAutoSave] = React.useState(true);

  return (
    <div className="flex h-[400px] w-[600px] items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 dark:from-violet-500/5 dark:via-purple-500/5 dark:to-pink-500/5 p-8">
      <ContextMenu>
        <ContextMenuTrigger
          className="
            relative flex h-[250px] w-[450px] items-center justify-center
            rounded-2xl overflow-hidden group cursor-context-menu
            bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20
            dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20
            backdrop-blur-md border border-white/10 dark:border-white/5
            shadow-[0_8px_32px_0_rgba(168,85,247,0.15)]
            hover:shadow-[0_8px_48px_0_rgba(168,85,247,0.25)]
            transition-all duration-300 ease-out
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 text-center">
            <div className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              Advanced Context Menu
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Right-click for modern interface
            </div>
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-32 w-32 opacity-30"
                style={{
                  background: `radial-gradient(circle, ${
                    ["purple", "pink", "orange"][i]
                  } 0%, transparent 70%)`,
                  animation: `float${i + 1} ${20 + i * 5}s linear infinite`,
                  left: `${i * 30}%`,
                  top: `${i * 20}%`,
                }}
              />
            ))}
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent className="w-72 rounded-2xl border-white/10 dark:border-white/5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
          <ContextMenuLabel className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wider uppercase">
            Theme Options
          </ContextMenuLabel>
          <ContextMenuSeparator className="bg-zinc-200/50 dark:bg-zinc-700/50" />

          <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
            <ContextMenuRadioItem value="gradient" className="rounded-lg">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                <span>Gradient Mode</span>
              </div>
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="glass" className="rounded-lg">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30" />
                <span>Glass Mode</span>
              </div>
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="neon" className="rounded-lg">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span>Neon Mode</span>
              </div>
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>

          <ContextMenuSeparator className="bg-zinc-200/50 dark:bg-zinc-700/50" />

          <ContextMenuLabel className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wider uppercase">
            Actions
          </ContextMenuLabel>

          <ContextMenuCheckboxItem
            checked={autoSave}
            onCheckedChange={setAutoSave}
            className="rounded-lg"
          >
            <Settings2Icon className="size-4" />
            <span>Auto-save enabled</span>
          </ContextMenuCheckboxItem>

          <ContextMenuSeparator className="bg-zinc-200/50 dark:bg-zinc-700/50" />

          <ContextMenuSub>
            <ContextMenuSubTrigger className="rounded-lg">
              <ChevronRightIcon className="size-4" />
              <span>Advanced</span>
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-56 rounded-2xl border-white/10 dark:border-white/5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
              <ContextMenuItem className="rounded-lg">Export settings</ContextMenuItem>
              <ContextMenuItem className="rounded-lg">Import settings</ContextMenuItem>
              <ContextMenuSeparator className="bg-zinc-200/50 dark:bg-zinc-700/50" />
              <ContextMenuItem className="rounded-lg">Reset to defaults</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>

          <ContextMenuSeparator className="bg-zinc-200/50 dark:bg-zinc-700/50" />

          <ContextMenuItem variant="destructive" className="rounded-lg">
            <TrashIcon className="size-4" />
            <span>Clear all data</span>
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(60px, 0) rotate(180deg); }
          75% { transform: translate(30px, 30px) rotate(270deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-40px, 40px) rotate(-90deg); }
          50% { transform: translate(-80px, 0) rotate(-180deg); }
          75% { transform: translate(-40px, -40px) rotate(-270deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(50px, 20px) rotate(60deg); }
          50% { transform: translate(0, 40px) rotate(120deg); }
          75% { transform: translate(-50px, 20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

Modern2025.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  // Right-click the trigger - use the parent element instead of the text
  const triggerText = canvas.getByText("Advanced Context Menu");
  const trigger = triggerText.closest('[class*="cursor-context-menu"]') || triggerText;
  await userEvent.pointer([{ target: trigger, keys: "[MouseRight]" }]);

  // Wait for menu to appear
  await waitFor(
    () => {
      const themeOptions = within(document.body).queryByText("Theme Options");
      expect(themeOptions).toBeInTheDocument();
    },
    { timeout: 10_000 }
  );

  // Hover over Advanced to open submenu directly (skip radio/checkbox interactions)
  const advanced = within(document.body).getByText("Advanced");
  await userEvent.hover(advanced);

  // Wait for submenu to appear
  await waitFor(
    () => {
      const exportSettingsElement = within(document.body).getByText("Export settings");
      expect(exportSettingsElement).toBeInTheDocument();
      expect(exportSettingsElement).toBeVisible();
    },
    { timeout: 10_000 }
  );

  // Verify all submenu items are visible
  expect(within(document.body).getByText("Import settings")).toBeInTheDocument();
  expect(within(document.body).getByText("Reset to defaults")).toBeInTheDocument();

  // Click Export settings
  await userEvent.click(within(document.body).getByText("Export settings"));

  // Verify menu is closed - use a longer timeout and check for visibility
  await waitFor(
    () => {
      expect(within(document.body).queryByText("Theme Options")).not.toBeInTheDocument();
    },
    { timeout: 5000 }
  );
};
