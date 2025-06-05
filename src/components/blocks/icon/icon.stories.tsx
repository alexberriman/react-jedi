import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./icon";
import * as Ai from "react-icons/ai";
import * as Fa from "react-icons/fa";
import * as Fi from "react-icons/fi";
import * as Si from "react-icons/si";
import type { IconType } from "react-icons";
import { useState, useMemo } from "react";

const meta = {
  title: "Blocks/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["test", "autodocs"],
  argTypes: {
    icon: {
      control: false,
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    color: {
      control: "color",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "filled", "outlined", "background"],
    },
    background: {
      control: "color",
    },
    animated: {
      control: "boolean",
    },
    animationType: {
      control: { type: "select" },
      options: ["spin", "pulse", "bounce"],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Ai.AiOutlineHome,
    size: "md",
    color: "currentColor",
  },
};

export const Sizes: Story = {
  args: {
    icon: Ai.AiOutlineHome,
  },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Ai.AiOutlineHome} size="xs" />
      <Icon icon={Ai.AiOutlineHome} size="sm" />
      <Icon icon={Ai.AiOutlineHome} size="md" />
      <Icon icon={Ai.AiOutlineHome} size="lg" />
      <Icon icon={Ai.AiOutlineHome} size="xl" />
      <Icon icon={Ai.AiOutlineHome} size={48} />
    </div>
  ),
};

export const Colors: Story = {
  args: {
    icon: Ai.AiOutlineHeart,
  },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Ai.AiOutlineHeart} size="lg" color="#ef4444" />
      <Icon icon={Ai.AiOutlineCheck} size="lg" color="#10b981" />
      <Icon icon={Ai.AiOutlineInfo} size="lg" color="#3b82f6" />
      <Icon icon={Ai.AiOutlineWarning} size="lg" color="#f59e0b" />
      <Icon icon={Ai.AiOutlineStar} size="lg" color="#8b5cf6" />
    </div>
  ),
};

export const WithBackground: Story = {
  args: {
    icon: Ai.AiOutlineHome,
  },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Ai.AiOutlineHome} size="lg" variant="background" background="#f3f4f6" />
      <Icon
        icon={Ai.AiOutlineUser}
        size="lg"
        variant="background"
        background="#dbeafe"
        color="#3b82f6"
      />
      <Icon
        icon={Ai.AiOutlineHeart}
        size="lg"
        variant="background"
        background="#fee2e2"
        color="#ef4444"
      />
      <Icon
        icon={Ai.AiOutlineCheck}
        size="lg"
        variant="background"
        background="#d1fae5"
        color="#10b981"
      />
    </div>
  ),
};

export const Animated: Story = {
  args: {
    icon: Ai.AiOutlineLoading,
  },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-6">
      <Icon icon={Ai.AiOutlineLoading} size="lg" animated animationType="spin" />
      <Icon icon={Ai.AiOutlineHeart} size="lg" animated animationType="pulse" color="#ef4444" />
      <Icon icon={Ai.AiOutlineArrowDown} size="lg" animated animationType="bounce" />
    </div>
  ),
};

function ClickableIcon() {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <Icon
        icon={clicked ? Ai.AiOutlineHeart : Ai.AiFillHeart}
        size="lg"
        color="#ef4444"
        onClick={() => setClicked(!clicked)}
        ariaLabel="Toggle favorite"
      />
      <p className="text-sm text-gray-600">Click the heart to toggle</p>
    </div>
  );
}

export const Clickable: Story = {
  args: {
    icon: Ai.AiOutlineHeart,
  },
  parameters: { controls: { disable: true } },
  render: () => <ClickableIcon />,
};

interface IconItem {
  icon: IconType;
  name: string;
  category: string;
  importPath: string;
}

const iconLibrary: IconItem[] = [
  // Navigation Icons
  {
    icon: Ai.AiOutlineHome,
    name: "AiOutlineHome",
    category: "Navigation",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineArrowLeft,
    name: "AiOutlineArrowLeft",
    category: "Navigation",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineArrowRight,
    name: "AiOutlineArrowRight",
    category: "Navigation",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineArrowUp,
    name: "AiOutlineArrowUp",
    category: "Navigation",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineArrowDown,
    name: "AiOutlineArrowDown",
    category: "Navigation",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineMenu,
    name: "AiOutlineMenu",
    category: "Navigation",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineClose,
    name: "AiOutlineClose",
    category: "Navigation",
    importPath: "react-icons/ai",
  },
  {
    icon: Fi.FiChevronLeft,
    name: "FiChevronLeft",
    category: "Navigation",
    importPath: "react-icons/fi",
  },
  {
    icon: Fi.FiChevronRight,
    name: "FiChevronRight",
    category: "Navigation",
    importPath: "react-icons/fi",
  },
  {
    icon: Fi.FiChevronUp,
    name: "FiChevronUp",
    category: "Navigation",
    importPath: "react-icons/fi",
  },
  {
    icon: Fi.FiChevronDown,
    name: "FiChevronDown",
    category: "Navigation",
    importPath: "react-icons/fi",
  },
  {
    icon: Fi.FiCornerUpLeft,
    name: "FiCornerUpLeft",
    category: "Navigation",
    importPath: "react-icons/fi",
  },

  // Actions
  {
    icon: Ai.AiOutlineEdit,
    name: "AiOutlineEdit",
    category: "Actions",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineDelete,
    name: "AiOutlineDelete",
    category: "Actions",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlinePlus,
    name: "AiOutlinePlus",
    category: "Actions",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineMinus,
    name: "AiOutlineMinus",
    category: "Actions",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineCheck,
    name: "AiOutlineCheck",
    category: "Actions",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineDownload,
    name: "AiOutlineDownload",
    category: "Actions",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineUpload,
    name: "AiOutlineUpload",
    category: "Actions",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineCopy,
    name: "AiOutlineCopy",
    category: "Actions",
    importPath: "react-icons/ai",
  },
  { icon: Fi.FiSave, name: "FiSave", category: "Actions", importPath: "react-icons/fi" },
  { icon: Fi.FiTrash2, name: "FiTrash2", category: "Actions", importPath: "react-icons/fi" },
  { icon: Fi.FiShare2, name: "FiShare2", category: "Actions", importPath: "react-icons/fi" },
  { icon: Fi.FiRefreshCw, name: "FiRefreshCw", category: "Actions", importPath: "react-icons/fi" },

  // UI Elements
  {
    icon: Ai.AiOutlineUser,
    name: "AiOutlineUser",
    category: "UI Elements",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineSetting,
    name: "AiOutlineSetting",
    category: "UI Elements",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineBell,
    name: "AiOutlineBell",
    category: "UI Elements",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineHeart,
    name: "AiOutlineHeart",
    category: "UI Elements",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineStar,
    name: "AiOutlineStar",
    category: "UI Elements",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineEye,
    name: "AiOutlineEye",
    category: "UI Elements",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineSearch,
    name: "AiOutlineSearch",
    category: "UI Elements",
    importPath: "react-icons/ai",
  },
  { icon: Fi.FiFilter, name: "FiFilter", category: "UI Elements", importPath: "react-icons/fi" },
  { icon: Fi.FiGrid, name: "FiGrid", category: "UI Elements", importPath: "react-icons/fi" },
  { icon: Fi.FiList, name: "FiList", category: "UI Elements", importPath: "react-icons/fi" },
  {
    icon: Fi.FiCalendar,
    name: "FiCalendar",
    category: "UI Elements",
    importPath: "react-icons/fi",
  },
  { icon: Fi.FiClock, name: "FiClock", category: "UI Elements", importPath: "react-icons/fi" },

  // Social Media
  { icon: Fa.FaFacebook, name: "FaFacebook", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaTwitter, name: "FaTwitter", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaLinkedin, name: "FaLinkedin", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaInstagram, name: "FaInstagram", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaYoutube, name: "FaYoutube", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaGithub, name: "FaGithub", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaPinterest, name: "FaPinterest", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaReddit, name: "FaReddit", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaDiscord, name: "FaDiscord", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaSlack, name: "FaSlack", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaTiktok, name: "FaTiktok", category: "Social", importPath: "react-icons/fa" },
  { icon: Fa.FaWhatsapp, name: "FaWhatsapp", category: "Social", importPath: "react-icons/fa" },

  // Business
  {
    icon: Ai.AiOutlineShoppingCart,
    name: "AiOutlineShoppingCart",
    category: "Business",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineDollar,
    name: "AiOutlineDollar",
    category: "Business",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineCreditCard,
    name: "AiOutlineCreditCard",
    category: "Business",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineBarChart,
    name: "AiOutlineBarChart",
    category: "Business",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineLineChart,
    name: "AiOutlineLineChart",
    category: "Business",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlinePieChart,
    name: "AiOutlinePieChart",
    category: "Business",
    importPath: "react-icons/ai",
  },
  { icon: Fi.FiBriefcase, name: "FiBriefcase", category: "Business", importPath: "react-icons/fi" },
  {
    icon: Fi.FiTrendingUp,
    name: "FiTrendingUp",
    category: "Business",
    importPath: "react-icons/fi",
  },
  {
    icon: Fi.FiTrendingDown,
    name: "FiTrendingDown",
    category: "Business",
    importPath: "react-icons/fi",
  },
  {
    icon: Fi.FiDollarSign,
    name: "FiDollarSign",
    category: "Business",
    importPath: "react-icons/fi",
  },
  {
    icon: Fi.FiShoppingBag,
    name: "FiShoppingBag",
    category: "Business",
    importPath: "react-icons/fi",
  },
  {
    icon: Fi.FiShoppingCart,
    name: "FiShoppingCart",
    category: "Business",
    importPath: "react-icons/fi",
  },

  // Communication
  {
    icon: Ai.AiOutlineMail,
    name: "AiOutlineMail",
    category: "Communication",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineMessage,
    name: "AiOutlineMessage",
    category: "Communication",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineComment,
    name: "AiOutlineComment",
    category: "Communication",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlinePhone,
    name: "AiOutlinePhone",
    category: "Communication",
    importPath: "react-icons/ai",
  },
  {
    icon: Fi.FiMessageSquare,
    name: "FiMessageSquare",
    category: "Communication",
    importPath: "react-icons/fi",
  },
  {
    icon: Fi.FiMessageCircle,
    name: "FiMessageCircle",
    category: "Communication",
    importPath: "react-icons/fi",
  },
  { icon: Fi.FiMail, name: "FiMail", category: "Communication", importPath: "react-icons/fi" },
  { icon: Fi.FiPhone, name: "FiPhone", category: "Communication", importPath: "react-icons/fi" },
  {
    icon: Fi.FiPhoneCall,
    name: "FiPhoneCall",
    category: "Communication",
    importPath: "react-icons/fi",
  },
  { icon: Fi.FiVideo, name: "FiVideo", category: "Communication", importPath: "react-icons/fi" },
  { icon: Fi.FiMic, name: "FiMic", category: "Communication", importPath: "react-icons/fi" },
  { icon: Fi.FiMicOff, name: "FiMicOff", category: "Communication", importPath: "react-icons/fi" },

  // Files & Folders
  {
    icon: Ai.AiOutlineFile,
    name: "AiOutlineFile",
    category: "Files",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineFolder,
    name: "AiOutlineFolder",
    category: "Files",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineFolderOpen,
    name: "AiOutlineFolderOpen",
    category: "Files",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlinePaperClip,
    name: "AiOutlinePaperClip",
    category: "Files",
    importPath: "react-icons/ai",
  },
  { icon: Fi.FiFile, name: "FiFile", category: "Files", importPath: "react-icons/fi" },
  { icon: Fi.FiFileText, name: "FiFileText", category: "Files", importPath: "react-icons/fi" },
  { icon: Fi.FiFolder, name: "FiFolder", category: "Files", importPath: "react-icons/fi" },
  { icon: Fi.FiPaperclip, name: "FiPaperclip", category: "Files", importPath: "react-icons/fi" },
  { icon: Fi.FiImage, name: "FiImage", category: "Files", importPath: "react-icons/fi" },
  { icon: Fi.FiFilm, name: "FiFilm", category: "Files", importPath: "react-icons/fi" },
  { icon: Fi.FiMusic, name: "FiMusic", category: "Files", importPath: "react-icons/fi" },
  { icon: Fi.FiDownload, name: "FiDownload", category: "Files", importPath: "react-icons/fi" },

  // Technology Brands
  { icon: Si.SiReact, name: "SiReact", category: "Technology", importPath: "react-icons/si" },
  {
    icon: Si.SiTypescript,
    name: "SiTypescript",
    category: "Technology",
    importPath: "react-icons/si",
  },
  {
    icon: Si.SiTailwindcss,
    name: "SiTailwindcss",
    category: "Technology",
    importPath: "react-icons/si",
  },
  {
    icon: Si.SiNodedotjs,
    name: "SiNodedotjs",
    category: "Technology",
    importPath: "react-icons/si",
  },
  { icon: Si.SiGit, name: "SiGit", category: "Technology", importPath: "react-icons/si" },
  { icon: Si.SiDocker, name: "SiDocker", category: "Technology", importPath: "react-icons/si" },
  { icon: Si.SiPython, name: "SiPython", category: "Technology", importPath: "react-icons/si" },
  {
    icon: Si.SiAmazonwebservices,
    name: "SiAmazonwebservices",
    category: "Technology",
    importPath: "react-icons/si",
  },
  {
    icon: Si.SiGooglecloud,
    name: "SiGooglecloud",
    category: "Technology",
    importPath: "react-icons/si",
  },
  { icon: Si.SiVercel, name: "SiVercel", category: "Technology", importPath: "react-icons/si" },
  { icon: Si.SiGraphql, name: "SiGraphql", category: "Technology", importPath: "react-icons/si" },
  { icon: Si.SiWebpack, name: "SiWebpack", category: "Technology", importPath: "react-icons/si" },

  // Security
  {
    icon: Ai.AiOutlineLock,
    name: "AiOutlineLock",
    category: "Security",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineUnlock,
    name: "AiOutlineUnlock",
    category: "Security",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineKey,
    name: "AiOutlineKey",
    category: "Security",
    importPath: "react-icons/ai",
  },
  { icon: Fi.FiShield, name: "FiShield", category: "Security", importPath: "react-icons/fi" },
  { icon: Fi.FiLock, name: "FiLock", category: "Security", importPath: "react-icons/fi" },
  { icon: Fi.FiUnlock, name: "FiUnlock", category: "Security", importPath: "react-icons/fi" },
  { icon: Fi.FiKey, name: "FiKey", category: "Security", importPath: "react-icons/fi" },
  { icon: Fi.FiShieldOff, name: "FiShieldOff", category: "Security", importPath: "react-icons/fi" },
  { icon: Fi.FiEyeOff, name: "FiEyeOff", category: "Security", importPath: "react-icons/fi" },
  {
    icon: Fi.FiAlertTriangle,
    name: "FiAlertTriangle",
    category: "Security",
    importPath: "react-icons/fi",
  },
  {
    icon: Fi.FiAlertCircle,
    name: "FiAlertCircle",
    category: "Security",
    importPath: "react-icons/fi",
  },
  { icon: Fi.FiInfo, name: "FiInfo", category: "Security", importPath: "react-icons/fi" },

  // Media Controls
  {
    icon: Ai.AiOutlinePlayCircle,
    name: "AiOutlinePlayCircle",
    category: "Media",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlinePauseCircle,
    name: "AiOutlinePauseCircle",
    category: "Media",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineStepForward,
    name: "AiOutlineStepForward",
    category: "Media",
    importPath: "react-icons/ai",
  },
  {
    icon: Ai.AiOutlineStepBackward,
    name: "AiOutlineStepBackward",
    category: "Media",
    importPath: "react-icons/ai",
  },
  { icon: Fi.FiPlay, name: "FiPlay", category: "Media", importPath: "react-icons/fi" },
  { icon: Fi.FiPause, name: "FiPause", category: "Media", importPath: "react-icons/fi" },
  {
    icon: Fi.FiSkipForward,
    name: "FiSkipForward",
    category: "Media",
    importPath: "react-icons/fi",
  },
  { icon: Fi.FiSkipBack, name: "FiSkipBack", category: "Media", importPath: "react-icons/fi" },
  { icon: Fi.FiVolume2, name: "FiVolume2", category: "Media", importPath: "react-icons/fi" },
  { icon: Fi.FiVolumeX, name: "FiVolumeX", category: "Media", importPath: "react-icons/fi" },
  { icon: Fi.FiRepeat, name: "FiRepeat", category: "Media", importPath: "react-icons/fi" },
  { icon: Fi.FiShuffle, name: "FiShuffle", category: "Media", importPath: "react-icons/fi" },
];

const categories = [...new Set(iconLibrary.map((item) => item.category))].sort((a, b) =>
  a.localeCompare(b)
);

function IconGalleryComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const filteredIcons = useMemo(() => {
    return iconLibrary.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = async (iconItem: IconItem) => {
    const code = `import { ${iconItem.name} } from '${iconItem.importPath}';\n\n<Icon icon={${iconItem.name}} size="${selectedSize}" />`;
    await navigator.clipboard.writeText(code);
    setCopiedIcon(iconItem.name);
    globalThis.setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <div className="p-4">
      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div>
          <label htmlFor="search-icons" className="block text-sm font-medium mb-2">
            Search Icons
          </label>
          <input
            id="search-icons"
            type="text"
            placeholder="Search by icon name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category-select" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Size Selector */}
        <div>
          <div className="block text-sm font-medium mb-2">Size</div>
          <div className="flex gap-2">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded text-sm ${
                  selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredIcons.length} of {iconLibrary.length} icons
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {filteredIcons.map((item) => (
          <button
            key={item.name}
            className="relative group p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer w-full text-left"
            onClick={() => copyToClipboard(item)}
            title={`${item.name} - Click to copy code`}
            type="button"
          >
            <div className="flex flex-col items-center gap-2">
              <Icon icon={item.icon} size={selectedSize} />
              <span className="text-xs text-gray-600 text-center break-all line-clamp-2">
                {item.name}
              </span>
            </div>

            {/* Hover tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {copiedIcon === item.name ? "Copied!" : "Click to copy"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export const IconGallery: Story = {
  args: {
    icon: Ai.AiOutlineHome,
  },
  parameters: {
    controls: { disable: true },
    layout: "fullscreen",
  },
  render: () => <IconGalleryComponent />,
};

export const BrandIcons: Story = {
  args: {
    icon: Si.SiReact,
  },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
      <Icon icon={Si.SiReact} size="lg" color="#61DAFB" />
      <Icon icon={Si.SiTypescript} size="lg" color="#3178C6" />
      <Icon icon={Si.SiTailwindcss} size="lg" color="#06B6D4" />
      <Icon icon={Si.SiNodedotjs} size="lg" color="#339933" />
      <Icon icon={Si.SiGit} size="lg" color="#F05032" />
      <Icon icon={Si.SiDocker} size="lg" color="#2496ED" />
      <Icon icon={Si.SiPython} size="lg" color="#3776AB" />
      <Icon icon={Si.SiAmazon} size="lg" color="#FF9900" />
    </div>
  ),
};

export const WithTooltip: Story = {
  args: {
    icon: Ai.AiOutlineInfo,
  },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <div className="group relative">
        <Icon icon={Ai.AiOutlineInfo} size="md" />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Information
        </span>
      </div>
      <div className="group relative">
        <Icon icon={Ai.AiOutlineWarning} size="md" color="#f59e0b" />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Warning
        </span>
      </div>
      <div className="group relative">
        <Icon icon={Ai.AiOutlineCheckCircle} size="md" color="#10b981" />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Success
        </span>
      </div>
    </div>
  ),
};
