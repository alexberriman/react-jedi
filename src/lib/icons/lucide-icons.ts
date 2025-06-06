/**
 * Default icon mappings for commonly used Lucide React icons
 * These icons are pre-registered for use in SDUI mode
 */
import {
  AlertCircle,
  AlertTriangle,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileText,
  Filter,
  Folder,
  Hash,
  Heart,
  Home,
  Info,
  Loader2,
  Mail,
  Menu,
  Minus,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  Pencil,
  Plus,
  Search,
  Settings,
  Share,
  ShoppingCart,
  Star,
  Sun,
  Terminal,
  Trash,
  Upload,
  User,
  UserPlus,
  Users,
  X,
  XCircle,
  Zap,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Calendar,
  Clock,
  Download,
  Edit,
  Globe,
  Link,
  Lock,
  LogOut,
  Map,
  MapPin,
  MessageSquare,
  Phone,
  Play,
  RefreshCw,
  Save,
  Send,
  Shield,
  ShoppingBag,
  Smartphone,
  Tag,
  ThumbsUp,
  Trash2,
  TrendingUp,
  Unlock,
  Video,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import { iconRegistry } from "./icon-registry";

// Type for our icon map
type IconMap = Record<string, LucideIcon>;

// Map of icon names to components
export const lucideIcons: IconMap = {
  // Alerts & Status
  "alert-circle": AlertCircle,
  "alert-triangle": AlertTriangle,
  "check": Check,
  "check-circle": CheckCircle,
  "info": Info,
  "x": X,
  "x-circle": XCircle,
  
  // Navigation
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "arrow-down": ArrowDown,
  "menu": Menu,
  "more-horizontal": MoreHorizontal,
  "more-vertical": MoreVertical,
  
  // Actions
  "copy": Copy,
  "download": Download,
  "edit": Edit,
  "external-link": ExternalLink,
  "eye": Eye,
  "eye-off": EyeOff,
  "filter": Filter,
  "pencil": Pencil,
  "plus": Plus,
  "minus": Minus,
  "refresh": RefreshCw,
  "save": Save,
  "search": Search,
  "send": Send,
  "share": Share,
  "trash": Trash,
  "trash-2": Trash2,
  "upload": Upload,
  
  // Objects & Files
  "file": File,
  "file-text": FileText,
  "folder": Folder,
  "package": Package,
  
  // User & Social
  "user": User,
  "user-plus": UserPlus,
  "users": Users,
  "heart": Heart,
  "message-square": MessageSquare,
  "thumbs-up": ThumbsUp,
  
  // UI Elements
  "calendar": Calendar,
  "circle": Circle,
  "clock": Clock,
  "hash": Hash,
  "home": Home,
  "link": Link,
  "loader": Loader2,
  "lock": Lock,
  "log-out": LogOut,
  "mail": Mail,
  "map": Map,
  "map-pin": MapPin,
  "moon": Moon,
  "phone": Phone,
  "play": Play,
  "settings": Settings,
  "shield": Shield,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  "smartphone": Smartphone,
  "star": Star,
  "sun": Sun,
  "tag": Tag,
  "terminal": Terminal,
  "trending-up": TrendingUp,
  "unlock": Unlock,
  "video": Video,
  "wifi": Wifi,
  "zap": Zap,
  "globe": Globe,
};

/**
 * Register all Lucide icons with the icon registry
 * This is called automatically when the module is imported
 */
export function registerLucideIcons(): void {
  for (const [name, component] of Object.entries(lucideIcons)) {
    iconRegistry.register(name, {
      component,
      defaultSize: 24,
      defaultStrokeWidth: 2,
    });
  }
}

// Auto-register icons when module is imported
registerLucideIcons();