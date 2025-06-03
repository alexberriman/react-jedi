import { useState, useMemo } from 'react';
import { Icon } from '@alexberriman/react-jedi';
import * as Ai from 'react-icons/ai';
import * as Fa from 'react-icons/fa';
import * as Fi from 'react-icons/fi';
import * as Si from 'react-icons/si';
import type { IconType } from 'react-icons';

interface IconItem {
  icon: IconType;
  name: string;
  category: string;
  importPath: string;
}

const iconLibrary: IconItem[] = [
  // Navigation Icons
  { icon: Ai.AiOutlineHome, name: 'AiOutlineHome', category: 'Navigation', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineArrowLeft, name: 'AiOutlineArrowLeft', category: 'Navigation', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineArrowRight, name: 'AiOutlineArrowRight', category: 'Navigation', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineArrowUp, name: 'AiOutlineArrowUp', category: 'Navigation', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineArrowDown, name: 'AiOutlineArrowDown', category: 'Navigation', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineMenu, name: 'AiOutlineMenu', category: 'Navigation', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineClose, name: 'AiOutlineClose', category: 'Navigation', importPath: 'react-icons/ai' },
  { icon: Fi.FiChevronLeft, name: 'FiChevronLeft', category: 'Navigation', importPath: 'react-icons/fi' },
  { icon: Fi.FiChevronRight, name: 'FiChevronRight', category: 'Navigation', importPath: 'react-icons/fi' },
  { icon: Fi.FiChevronUp, name: 'FiChevronUp', category: 'Navigation', importPath: 'react-icons/fi' },
  { icon: Fi.FiChevronDown, name: 'FiChevronDown', category: 'Navigation', importPath: 'react-icons/fi' },

  // Actions
  { icon: Ai.AiOutlineEdit, name: 'AiOutlineEdit', category: 'Actions', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineDelete, name: 'AiOutlineDelete', category: 'Actions', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlinePlus, name: 'AiOutlinePlus', category: 'Actions', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineMinus, name: 'AiOutlineMinus', category: 'Actions', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineCheck, name: 'AiOutlineCheck', category: 'Actions', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineDownload, name: 'AiOutlineDownload', category: 'Actions', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineUpload, name: 'AiOutlineUpload', category: 'Actions', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineCopy, name: 'AiOutlineCopy', category: 'Actions', importPath: 'react-icons/ai' },
  { icon: Fi.FiSave, name: 'FiSave', category: 'Actions', importPath: 'react-icons/fi' },
  { icon: Fi.FiTrash2, name: 'FiTrash2', category: 'Actions', importPath: 'react-icons/fi' },

  // UI Elements
  { icon: Ai.AiOutlineUser, name: 'AiOutlineUser', category: 'UI Elements', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineSetting, name: 'AiOutlineSetting', category: 'UI Elements', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineBell, name: 'AiOutlineBell', category: 'UI Elements', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineHeart, name: 'AiOutlineHeart', category: 'UI Elements', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineStar, name: 'AiOutlineStar', category: 'UI Elements', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineEye, name: 'AiOutlineEye', category: 'UI Elements', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineSearch, name: 'AiOutlineSearch', category: 'UI Elements', importPath: 'react-icons/ai' },
  { icon: Fi.FiFilter, name: 'FiFilter', category: 'UI Elements', importPath: 'react-icons/fi' },
  { icon: Fi.FiGrid, name: 'FiGrid', category: 'UI Elements', importPath: 'react-icons/fi' },
  { icon: Fi.FiList, name: 'FiList', category: 'UI Elements', importPath: 'react-icons/fi' },

  // Social Media
  { icon: Fa.FaFacebook, name: 'FaFacebook', category: 'Social', importPath: 'react-icons/fa' },
  { icon: Fa.FaTwitter, name: 'FaTwitter', category: 'Social', importPath: 'react-icons/fa' },
  { icon: Fa.FaLinkedin, name: 'FaLinkedin', category: 'Social', importPath: 'react-icons/fa' },
  { icon: Fa.FaInstagram, name: 'FaInstagram', category: 'Social', importPath: 'react-icons/fa' },
  { icon: Fa.FaYoutube, name: 'FaYoutube', category: 'Social', importPath: 'react-icons/fa' },
  { icon: Fa.FaGithub, name: 'FaGithub', category: 'Social', importPath: 'react-icons/fa' },
  { icon: Fa.FaPinterest, name: 'FaPinterest', category: 'Social', importPath: 'react-icons/fa' },
  { icon: Fa.FaReddit, name: 'FaReddit', category: 'Social', importPath: 'react-icons/fa' },
  { icon: Fa.FaDiscord, name: 'FaDiscord', category: 'Social', importPath: 'react-icons/fa' },
  { icon: Fa.FaSlack, name: 'FaSlack', category: 'Social', importPath: 'react-icons/fa' },

  // Business
  { icon: Ai.AiOutlineShoppingCart, name: 'AiOutlineShoppingCart', category: 'Business', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineDollar, name: 'AiOutlineDollar', category: 'Business', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineCreditCard, name: 'AiOutlineCreditCard', category: 'Business', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineBarChart, name: 'AiOutlineBarChart', category: 'Business', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineLineChart, name: 'AiOutlineLineChart', category: 'Business', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlinePieChart, name: 'AiOutlinePieChart', category: 'Business', importPath: 'react-icons/ai' },
  { icon: Fi.FiBriefcase, name: 'FiBriefcase', category: 'Business', importPath: 'react-icons/fi' },
  { icon: Fi.FiTrendingUp, name: 'FiTrendingUp', category: 'Business', importPath: 'react-icons/fi' },
  { icon: Fi.FiTrendingDown, name: 'FiTrendingDown', category: 'Business', importPath: 'react-icons/fi' },
  { icon: Fi.FiDollarSign, name: 'FiDollarSign', category: 'Business', importPath: 'react-icons/fi' },

  // Communication
  { icon: Ai.AiOutlineMail, name: 'AiOutlineMail', category: 'Communication', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineMessage, name: 'AiOutlineMessage', category: 'Communication', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineComment, name: 'AiOutlineComment', category: 'Communication', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlinePhone, name: 'AiOutlinePhone', category: 'Communication', importPath: 'react-icons/ai' },
  { icon: Fi.FiMessageSquare, name: 'FiMessageSquare', category: 'Communication', importPath: 'react-icons/fi' },
  { icon: Fi.FiMessageCircle, name: 'FiMessageCircle', category: 'Communication', importPath: 'react-icons/fi' },
  { icon: Fi.FiMail, name: 'FiMail', category: 'Communication', importPath: 'react-icons/fi' },
  { icon: Fi.FiPhone, name: 'FiPhone', category: 'Communication', importPath: 'react-icons/fi' },
  { icon: Fi.FiPhoneCall, name: 'FiPhoneCall', category: 'Communication', importPath: 'react-icons/fi' },
  { icon: Fi.FiVideo, name: 'FiVideo', category: 'Communication', importPath: 'react-icons/fi' },

  // Files & Folders
  { icon: Ai.AiOutlineFile, name: 'AiOutlineFile', category: 'Files', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineFolder, name: 'AiOutlineFolder', category: 'Files', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineFolderOpen, name: 'AiOutlineFolderOpen', category: 'Files', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlinePaperClip, name: 'AiOutlinePaperClip', category: 'Files', importPath: 'react-icons/ai' },
  { icon: Fi.FiFile, name: 'FiFile', category: 'Files', importPath: 'react-icons/fi' },
  { icon: Fi.FiFileText, name: 'FiFileText', category: 'Files', importPath: 'react-icons/fi' },
  { icon: Fi.FiFolder, name: 'FiFolder', category: 'Files', importPath: 'react-icons/fi' },
  { icon: Fi.FiPaperclip, name: 'FiPaperclip', category: 'Files', importPath: 'react-icons/fi' },
  { icon: Fi.FiImage, name: 'FiImage', category: 'Files', importPath: 'react-icons/fi' },
  { icon: Fi.FiFilm, name: 'FiFilm', category: 'Files', importPath: 'react-icons/fi' },

  // Technology Brands
  { icon: Si.SiReact, name: 'SiReact', category: 'Technology', importPath: 'react-icons/si' },
  { icon: Si.SiTypescript, name: 'SiTypescript', category: 'Technology', importPath: 'react-icons/si' },
  { icon: Si.SiTailwindcss, name: 'SiTailwindcss', category: 'Technology', importPath: 'react-icons/si' },
  { icon: Si.SiNodedotjs, name: 'SiNodedotjs', category: 'Technology', importPath: 'react-icons/si' },
  { icon: Si.SiGit, name: 'SiGit', category: 'Technology', importPath: 'react-icons/si' },
  { icon: Si.SiDocker, name: 'SiDocker', category: 'Technology', importPath: 'react-icons/si' },
  { icon: Si.SiPython, name: 'SiPython', category: 'Technology', importPath: 'react-icons/si' },
  { icon: Si.SiAmazonaws, name: 'SiAmazonaws', category: 'Technology', importPath: 'react-icons/si' },
  { icon: Si.SiGooglecloud, name: 'SiGooglecloud', category: 'Technology', importPath: 'react-icons/si' },
  { icon: Si.SiMicrosoftazure, name: 'SiMicrosoftazure', category: 'Technology', importPath: 'react-icons/si' },

  // Security
  { icon: Ai.AiOutlineLock, name: 'AiOutlineLock', category: 'Security', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineUnlock, name: 'AiOutlineUnlock', category: 'Security', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineKey, name: 'AiOutlineKey', category: 'Security', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineShield, name: 'AiOutlineShield', category: 'Security', importPath: 'react-icons/ai' },
  { icon: Fi.FiLock, name: 'FiLock', category: 'Security', importPath: 'react-icons/fi' },
  { icon: Fi.FiUnlock, name: 'FiUnlock', category: 'Security', importPath: 'react-icons/fi' },
  { icon: Fi.FiKey, name: 'FiKey', category: 'Security', importPath: 'react-icons/fi' },
  { icon: Fi.FiShield, name: 'FiShield', category: 'Security', importPath: 'react-icons/fi' },
  { icon: Fi.FiShieldOff, name: 'FiShieldOff', category: 'Security', importPath: 'react-icons/fi' },
  { icon: Fi.FiEyeOff, name: 'FiEyeOff', category: 'Security', importPath: 'react-icons/fi' },

  // Media Controls
  { icon: Ai.AiOutlinePlayCircle, name: 'AiOutlinePlayCircle', category: 'Media', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlinePauseCircle, name: 'AiOutlinePauseCircle', category: 'Media', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineStepForward, name: 'AiOutlineStepForward', category: 'Media', importPath: 'react-icons/ai' },
  { icon: Ai.AiOutlineStepBackward, name: 'AiOutlineStepBackward', category: 'Media', importPath: 'react-icons/ai' },
  { icon: Fi.FiPlay, name: 'FiPlay', category: 'Media', importPath: 'react-icons/fi' },
  { icon: Fi.FiPause, name: 'FiPause', category: 'Media', importPath: 'react-icons/fi' },
  { icon: Fi.FiSkipForward, name: 'FiSkipForward', category: 'Media', importPath: 'react-icons/fi' },
  { icon: Fi.FiSkipBack, name: 'FiSkipBack', category: 'Media', importPath: 'react-icons/fi' },
  { icon: Fi.FiVolume2, name: 'FiVolume2', category: 'Media', importPath: 'react-icons/fi' },
  { icon: Fi.FiVolumeX, name: 'FiVolumeX', category: 'Media', importPath: 'react-icons/fi' },
];

const categories = [...new Set(iconLibrary.map(item => item.category))].sort((a, b) => a.localeCompare(b));

const sizes = [
  { label: 'XS (12px)', value: 'xs' },
  { label: 'SM (16px)', value: 'sm' },
  { label: 'MD (20px)', value: 'md' },
  { label: 'LG (24px)', value: 'lg' },
  { label: 'XL (32px)', value: 'xl' },
];

const colors = [
  { label: 'Default', value: 'currentColor' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Green', value: '#10b981' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Purple', value: '#8b5cf6' },
  { label: 'Orange', value: '#f59e0b' },
];

export function IconShowcase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [selectedColor, setSelectedColor] = useState('currentColor');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconItem | null>(null);

  const filteredIcons = useMemo(() => {
    return iconLibrary.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = async (iconItem: IconItem) => {
    const code = `import { ${iconItem.name} } from '${iconItem.importPath}';\n\n<Icon icon={${iconItem.name}} size="${selectedSize}" color="${selectedColor}" />`;
    await navigator.clipboard.writeText(code);
    setCopiedIcon(iconItem.name);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  const copyIconName = async (name: string) => {
    await navigator.clipboard.writeText(name);
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Icon Component</h1>
        <p className="text-lg text-gray-600 mb-6">
          A comprehensive icon component with support for all react-icons libraries. Features include
          different sizes, colors, variants, animations, and accessibility support.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8 space-y-4">
        {/* Search and Category Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search-icons" className="block text-sm font-medium mb-2">Search Icons</label>
            <input
              id="search-icons"
              type="text"
              placeholder="Search by icon name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:w-48">
            <label htmlFor="category-select" className="block text-sm font-medium mb-2">Category</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Size and Color Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div id="size-label" className="block text-sm font-medium mb-2">Size</div>
            <div className="flex gap-2" role="group" aria-labelledby="size-label">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value as typeof selectedSize)}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedSize === size.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div id="color-label" className="block text-sm font-medium mb-2">Color</div>
            <div className="flex gap-2" role="group" aria-labelledby="color-label">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`px-3 py-1 rounded text-sm flex items-center gap-2 ${
                    selectedColor === color.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: color.value === 'currentColor' ? '#000' : color.value }}
                  />
                  {color.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredIcons.length} of {iconLibrary.length} icons
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
        {filteredIcons.map((item) => (
          <button
            key={item.name}
            className="relative group p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer w-full"
            onClick={() => {
              setSelectedIcon(item);
              setShowCode(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedIcon(item);
                setShowCode(true);
              }
            }}
            tabIndex={0}
            aria-label={`${item.name} icon`}
          >
            <div className="flex flex-col items-center gap-3">
              <Icon
                icon={item.icon}
                size={selectedSize}
                color={selectedColor}
              />
              <span className="text-xs text-gray-600 text-center break-all">
                {item.name}
              </span>
            </div>
            
            {/* Copy buttons */}
            <div className="absolute inset-0 bg-white bg-opacity-95 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(item);
                }}
                className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              >
                {copiedIcon === item.name ? 'Copied!' : 'Copy Code'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyIconName(item.name);
                }}
                className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 w-full"
              >
                Copy Name
              </button>
            </div>
          </button>
        ))}
      </div>

      {/* Code Preview Modal */}
      {showCode && selectedIcon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{selectedIcon.name}</h3>
                <button
                  onClick={() => setShowCode(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon icon={Ai.AiOutlineClose} size="lg" />
                </button>
              </div>
              
              <div className="mb-6 flex justify-center">
                <Icon
                  icon={selectedIcon.icon}
                  size={48}
                  color={selectedColor}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Installation</h4>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <code>npm install react-icons</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Import</h4>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <code>{`import { ${selectedIcon.name} } from '${selectedIcon.importPath}';`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Usage</h4>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <code>{`<Icon 
  icon={${selectedIcon.name}} 
  size="${selectedSize}" 
  color="${selectedColor}"
/>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">All Variants</h4>
                  <div className="space-y-2">
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      <code>{`// Default
<Icon icon={${selectedIcon.name}} />

// With background
<Icon 
  icon={${selectedIcon.name}} 
  variant="background" 
  background="#f3f4f6" 
/>

// Animated
<Icon 
  icon={${selectedIcon.name}} 
  animated 
  animationType="spin" 
/>

// Clickable
<Icon 
  icon={${selectedIcon.name}} 
  onClick={() => console.log('clicked')} 
  ariaLabel="Click me" 
/>`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => copyToClipboard(selectedIcon)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Copy Code
                </button>
                <button
                  onClick={() => setShowCode(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}