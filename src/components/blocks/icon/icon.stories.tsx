import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';
import * as Ai from 'react-icons/ai';
import * as Fa from 'react-icons/fa';
import * as Si from 'react-icons/si';
import { useState } from 'react';

const meta = {
  title: 'Blocks/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['test', 'autodocs'],
  argTypes: {
    icon: {
      control: false,
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'color',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined', 'background'],
    },
    background: {
      control: 'color',
    },
    animated: {
      control: 'boolean',
    },
    animationType: {
      control: { type: 'select' },
      options: ['spin', 'pulse', 'bounce'],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Ai.AiOutlineHome,
    size: 'md',
    color: 'currentColor',
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
      <Icon icon={Ai.AiOutlineUser} size="lg" variant="background" background="#dbeafe" color="#3b82f6" />
      <Icon icon={Ai.AiOutlineHeart} size="lg" variant="background" background="#fee2e2" color="#ef4444" />
      <Icon icon={Ai.AiOutlineCheck} size="lg" variant="background" background="#d1fae5" color="#10b981" />
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

export const IconShowcase: Story = {
  args: {
    icon: Ai.AiOutlineHome,
  },
  parameters: { controls: { disable: true } },
  render: () => {
    const iconCategories = [
      {
        name: 'Navigation',
        icons: [
          { icon: Ai.AiOutlineHome, name: 'Home' },
          { icon: Ai.AiOutlineArrowLeft, name: 'Back' },
          { icon: Ai.AiOutlineArrowRight, name: 'Forward' },
          { icon: Ai.AiOutlineMenu, name: 'Menu' },
          { icon: Ai.AiOutlineClose, name: 'Close' },
          { icon: Ai.AiOutlineSearch, name: 'Search' },
        ],
      },
      {
        name: 'Actions',
        icons: [
          { icon: Ai.AiOutlineEdit, name: 'Edit' },
          { icon: Ai.AiOutlineDelete, name: 'Delete' },
          { icon: Ai.AiOutlinePlus, name: 'Add' },
          { icon: Ai.AiOutlineMinus, name: 'Remove' },
          { icon: Ai.AiOutlineCheck, name: 'Check' },
          { icon: Ai.AiOutlineDownload, name: 'Download' },
        ],
      },
      {
        name: 'Social',
        icons: [
          { icon: Fa.FaFacebook, name: 'Facebook' },
          { icon: Fa.FaTwitter, name: 'Twitter' },
          { icon: Fa.FaLinkedin, name: 'LinkedIn' },
          { icon: Fa.FaInstagram, name: 'Instagram' },
          { icon: Fa.FaYoutube, name: 'YouTube' },
          { icon: Fa.FaGithub, name: 'GitHub' },
        ],
      },
      {
        name: 'UI Elements',
        icons: [
          { icon: Ai.AiOutlineUser, name: 'User' },
          { icon: Ai.AiOutlineSetting, name: 'Settings' },
          { icon: Ai.AiOutlineNotification, name: 'Notification' },
          { icon: Ai.AiOutlineHeart, name: 'Heart' },
          { icon: Ai.AiOutlineStar, name: 'Star' },
          { icon: Ai.AiOutlineEye, name: 'View' },
        ],
      },
    ];

    return (
      <div className="space-y-8">
        {iconCategories.map((category) => (
          <div key={category.name}>
            <h3 className="mb-4 text-lg font-semibold">{category.name}</h3>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {category.icons.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Icon icon={item.icon} size="lg" />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
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