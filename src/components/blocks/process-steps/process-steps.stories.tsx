import type { Meta, StoryObj } from '@storybook/react'
import { ProcessSteps } from './process-steps'
import { 
  Package, 
  CreditCard, 
  Truck, 
  CheckCircle,
  Search,
  FileText,
  UserCheck,
  Briefcase,
  Code,
  Rocket,
  Settings,
  Database,
  Shield,
  Globe,
  Mail,
  Phone,
  Star
} from 'lucide-react'

const meta = {
  title: 'Blocks/ProcessSteps',
  component: ProcessSteps,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical', 'circular', 'cards', 'branching'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    connectorStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'arrow'],
    },
  },
} satisfies Meta<typeof ProcessSteps>

export default meta
type Story = StoryObj<typeof meta>

const checkoutSteps = [
  {
    title: 'Cart',
    description: 'Review your items',
    icon: <Package />,
  },
  {
    title: 'Shipping',
    description: 'Enter address',
    icon: <Truck />,
  },
  {
    title: 'Payment',
    description: 'Payment details',
    icon: <CreditCard />,
  },
  {
    title: 'Complete',
    description: 'Order confirmed',
    icon: <CheckCircle />,
  },
]

const onboardingSteps = [
  {
    title: 'Sign Up',
    description: 'Create your account',
    icon: <UserCheck />,
    badge: 'Required',
  },
  {
    title: 'Profile',
    description: 'Complete your profile',
    icon: <FileText />,
  },
  {
    title: 'Verification',
    description: 'Verify your email',
    icon: <Mail />,
  },
  {
    title: 'Get Started',
    description: 'Explore the platform',
    icon: <Rocket />,
  },
]

const developmentSteps = [
  {
    title: 'Planning',
    description: 'Define requirements and architecture',
    icon: <FileText />,
  },
  {
    title: 'Development',
    description: 'Write code and implement features',
    icon: <Code />,
  },
  {
    title: 'Testing',
    description: 'Run tests and fix bugs',
    icon: <Shield />,
  },
  {
    title: 'Deployment',
    description: 'Deploy to production',
    icon: <Rocket />,
  },
  {
    title: 'Monitoring',
    description: 'Track performance and errors',
    icon: <Database />,
  },
]

const circularProcessSteps = [
  {
    title: 'Research',
    icon: <Search />,
  },
  {
    title: 'Design',
    icon: <FileText />,
  },
  {
    title: 'Build',
    icon: <Code />,
  },
  {
    title: 'Test',
    icon: <Shield />,
  },
  {
    title: 'Deploy',
    icon: <Rocket />,
  },
  {
    title: 'Monitor',
    icon: <Database />,
  },
]

const branchingSteps = [
  {
    title: 'Application Received',
    description: 'We\'ve received your application',
    icon: <FileText />,
    status: 'completed' as const,
  },
  {
    title: 'Initial Review',
    description: 'Checking basic requirements',
    icon: <Search />,
    status: 'completed' as const,
    branches: [
      {
        title: 'Document Verification',
        description: 'Verifying submitted documents',
        icon: <Shield />,
        status: 'current' as const,
      },
      {
        title: 'Background Check',
        description: 'Running background verification',
        icon: <UserCheck />,
        status: 'upcoming' as const,
      },
    ],
  },
  {
    title: 'Final Decision',
    description: 'Review complete',
    icon: <CheckCircle />,
    status: 'upcoming' as const,
  },
  {
    title: 'Onboarding',
    description: 'Welcome to the team',
    icon: <Rocket />,
    status: 'upcoming' as const,
  },
]

export const Default: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    animated: true,
  },
}

export const Vertical: Story = {
  args: {
    steps: onboardingSteps,
    variant: 'vertical',
    currentStep: 2,
    animated: true,
  },
}

export const Circular: Story = {
  args: {
    steps: circularProcessSteps,
    variant: 'circular',
    currentStep: 2,
    animated: true,
  },
}

export const Cards: Story = {
  args: {
    steps: developmentSteps,
    variant: 'cards',
    currentStep: 3,
    animated: true,
  },
}

export const Branching: Story = {
  args: {
    steps: branchingSteps,
    variant: 'branching',
    animated: true,
  },
}

export const Interactive: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    interactive: true,
    animated: true,
  },
  render: function InteractiveStory(args) {
    const [currentStep, setCurrentStep] = React.useState(args.currentStep || 0)
    
    return (
      <ProcessSteps
        {...args}
        currentStep={currentStep}
        onStepClick={(index) => setCurrentStep(index)}
      />
    )
  },
}

export const WithCustomNumbers: Story = {
  args: {
    steps: [
      { title: 'Step A', number: 'A', description: 'First step' },
      { title: 'Step B', number: 'B', description: 'Second step' },
      { title: 'Step C', number: 'C', description: 'Third step' },
      { title: 'Step D', number: 'D', description: 'Fourth step' },
    ],
    currentStep: 2,
  },
}

export const CompletedSteps: Story = {
  args: {
    steps: checkoutSteps,
    completedSteps: [0, 1, 2, 3],
  },
}

export const WithoutConnectors: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    showConnectors: false,
  },
}

export const DashedConnectors: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    connectorStyle: 'dashed',
  },
}

export const SmallSize: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    size: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    size: 'lg',
  },
}

export const DisabledSteps: Story = {
  args: {
    steps: [
      { ...checkoutSteps[0], status: 'completed' },
      { ...checkoutSteps[1], status: 'current' },
      { ...checkoutSteps[2], status: 'disabled' },
      { ...checkoutSteps[3], status: 'disabled' },
    ],
  },
}

export const LongProcess: Story = {
  args: {
    steps: [
      { title: 'Research', icon: <Search />, description: 'Market analysis' },
      { title: 'Planning', icon: <FileText />, description: 'Project roadmap' },
      { title: 'Design', icon: <Settings />, description: 'UI/UX design' },
      { title: 'Development', icon: <Code />, description: 'Build features' },
      { title: 'Testing', icon: <Shield />, description: 'Quality assurance' },
      { title: 'Documentation', icon: <FileText />, description: 'Write docs' },
      { title: 'Deployment', icon: <Rocket />, description: 'Go live' },
      { title: 'Marketing', icon: <Globe />, description: 'Promote product' },
      { title: 'Support', icon: <Phone />, description: 'Customer service' },
      { title: 'Analytics', icon: <Database />, description: 'Track metrics' },
    ],
    currentStep: 4,
    size: 'sm',
  },
}

export const InstallationGuide: Story = {
  args: {
    steps: [
      {
        title: 'Download',
        description: 'Get the installer',
        icon: <Globe />,
      },
      {
        title: 'Install',
        description: 'Run the setup',
        icon: <Settings />,
      },
      {
        title: 'Configure',
        description: 'Set preferences',
        icon: <Database />,
      },
      {
        title: 'Activate',
        description: 'Enter license key',
        icon: <Shield />,
      },
      {
        title: 'Ready',
        description: 'Start using the app',
        icon: <CheckCircle />,
      },
    ],
    variant: 'vertical',
    currentStep: 2,
    animated: true,
  },
}

export const HiringProcess: Story = {
  args: {
    steps: [
      {
        title: 'Apply',
        description: 'Submit application',
        icon: <FileText />,
      },
      {
        title: 'Phone Screen',
        description: '30 min call',
        icon: <Phone />,
        badge: 'Day 1-3',
      },
      {
        title: 'Technical Interview',
        description: 'Skills assessment',
        icon: <Code />,
        badge: 'Day 5-7',
      },
      {
        title: 'On-site Interview',
        description: 'Meet the team',
        icon: <Briefcase />,
        badge: 'Day 10-14',
      },
      {
        title: 'Offer',
        description: 'Review package',
        icon: <Star />,
        badge: 'Day 15-20',
      },
    ],
    variant: 'cards',
    currentStep: 2,
    animated: true,
    interactive: true,
  },
}

import * as React from 'react'