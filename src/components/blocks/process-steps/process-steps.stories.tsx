import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProcessSteps } from "./process-steps";
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
  Star,
} from "lucide-react";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Blocks/ProcessSteps",
  component: ProcessSteps,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["horizontal", "vertical", "circular", "cards", "branching"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    connectorStyle: {
      control: "select",
      options: ["solid", "dashed", "arrow"],
    },
  },
  args: {
    steps: [],
  },
} satisfies Meta<typeof ProcessSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

const checkoutSteps = [
  {
    title: "Cart",
    description: "Review your items",
    icon: <Package />,
  },
  {
    title: "Shipping",
    description: "Enter address",
    icon: <Truck />,
  },
  {
    title: "Payment",
    description: "Payment details",
    icon: <CreditCard />,
  },
  {
    title: "Complete",
    description: "Order confirmed",
    icon: <CheckCircle />,
  },
];

const onboardingSteps = [
  {
    title: "Sign Up",
    description: "Create your account",
    icon: <UserCheck />,
    badge: "Required",
  },
  {
    title: "Profile",
    description: "Complete your profile",
    icon: <FileText />,
  },
  {
    title: "Verification",
    description: "Verify your email",
    icon: <Mail />,
  },
  {
    title: "Get Started",
    description: "Explore the platform",
    icon: <Rocket />,
  },
];

const developmentSteps = [
  {
    title: "Planning",
    description: "Define requirements and architecture",
    icon: <FileText />,
  },
  {
    title: "Development",
    description: "Write code and implement features",
    icon: <Code />,
  },
  {
    title: "Testing",
    description: "Run tests and fix bugs",
    icon: <Shield />,
  },
  {
    title: "Deployment",
    description: "Deploy to production",
    icon: <Rocket />,
  },
  {
    title: "Monitoring",
    description: "Track performance and errors",
    icon: <Database />,
  },
];

const circularProcessSteps = [
  {
    title: "Research",
    icon: <Search />,
  },
  {
    title: "Design",
    icon: <FileText />,
  },
  {
    title: "Build",
    icon: <Code />,
  },
  {
    title: "Test",
    icon: <Shield />,
  },
  {
    title: "Deploy",
    icon: <Rocket />,
  },
  {
    title: "Monitor",
    icon: <Database />,
  },
];

const branchingSteps = [
  {
    title: "Application Received",
    description: "We've received your application",
    icon: <FileText />,
    status: "completed" as const,
  },
  {
    title: "Initial Review",
    description: "Checking basic requirements",
    icon: <Search />,
    status: "completed" as const,
    branches: [
      {
        title: "Document Verification",
        description: "Verifying submitted documents",
        icon: <Shield />,
        status: "current" as const,
      },
      {
        title: "Background Check",
        description: "Running background verification",
        icon: <UserCheck />,
        status: "upcoming" as const,
      },
    ],
  },
  {
    title: "Final Decision",
    description: "Review complete",
    icon: <CheckCircle />,
    status: "upcoming" as const,
  },
  {
    title: "Onboarding",
    description: "Welcome to the team",
    icon: <Rocket />,
    status: "upcoming" as const,
  },
];

// SDUI-compatible step data (without React icons)
const checkoutStepsSDUI = [
  { title: "Cart", description: "Review your items" },
  { title: "Shipping", description: "Enter address" },
  { title: "Payment", description: "Payment details" },
  { title: "Complete", description: "Order confirmed" },
];

const onboardingStepsSDUI = [
  { title: "Sign Up", description: "Create your account", badge: "Required" },
  { title: "Profile", description: "Complete your profile" },
  { title: "Verification", description: "Verify your email" },
  { title: "Get Started", description: "Explore the platform" },
];

const developmentStepsSDUI = [
  { title: "Planning", description: "Define requirements and architecture" },
  { title: "Development", description: "Write code and implement features" },
  { title: "Testing", description: "Run tests and fix bugs" },
  { title: "Deployment", description: "Deploy to production" },
  { title: "Monitoring", description: "Track performance and errors" },
];

const circularProcessStepsSDUI = [
  { title: "Research" },
  { title: "Design" },
  { title: "Build" },
  { title: "Test" },
  { title: "Deploy" },
  { title: "Monitor" },
];

const branchingStepsSDUI = [
  {
    title: "Application Received",
    description: "We've received your application",
    status: "completed" as const,
  },
  {
    title: "Initial Review",
    description: "Checking basic requirements",
    status: "completed" as const,
    branches: [
      {
        title: "Document Verification",
        description: "Verifying submitted documents",
        status: "current" as const,
      },
      {
        title: "Background Check",
        description: "Running background verification",
        status: "upcoming" as const,
      },
    ],
  },
  {
    title: "Final Decision",
    description: "Review complete",
    status: "upcoming" as const,
  },
  {
    title: "Onboarding",
    description: "Welcome to the team",
    status: "upcoming" as const,
  },
];

const defaultStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify step titles are rendered
    await expect(canvas.getByText("Cart")).toBeInTheDocument();
    await expect(canvas.getByText("Shipping")).toBeInTheDocument();
    await expect(canvas.getByText("Payment")).toBeInTheDocument();
    await expect(canvas.getByText("Complete")).toBeInTheDocument();
    
    // Verify step descriptions are rendered
    await expect(canvas.getByText("Review your items")).toBeInTheDocument();
    await expect(canvas.getByText("Enter address")).toBeInTheDocument();
    await expect(canvas.getByText("Payment details")).toBeInTheDocument();
    await expect(canvas.getByText("Order confirmed")).toBeInTheDocument();
  },
};

export const Default = enhanceStoryForDualMode<typeof ProcessSteps>(
  defaultStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: checkoutStepsSDUI,
      currentStep: 1,
      animated: true,
    },
  }
) satisfies Story;

const verticalStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: onboardingSteps,
    variant: "vertical",
    currentStep: 2,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify step titles
    await expect(canvas.getByText("Sign Up")).toBeInTheDocument();
    await expect(canvas.getByText("Profile")).toBeInTheDocument();
    await expect(canvas.getByText("Verification")).toBeInTheDocument();
    await expect(canvas.getByText("Get Started")).toBeInTheDocument();
    
    // Verify badge
    await expect(canvas.getByText("Required")).toBeInTheDocument();
  },
};

export const Vertical = enhanceStoryForDualMode<typeof ProcessSteps>(
  verticalStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: onboardingStepsSDUI,
      variant: "vertical",
      currentStep: 2,
      animated: true,
    },
  }
) satisfies Story;

const circularStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: circularProcessSteps,
    variant: "circular",
    currentStep: 2,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all step titles in circular layout
    await expect(canvas.getByText("Research")).toBeInTheDocument();
    await expect(canvas.getByText("Design")).toBeInTheDocument();
    await expect(canvas.getByText("Build")).toBeInTheDocument();
    await expect(canvas.getByText("Test")).toBeInTheDocument();
    await expect(canvas.getByText("Deploy")).toBeInTheDocument();
    await expect(canvas.getByText("Monitor")).toBeInTheDocument();
  },
};

export const Circular = enhanceStoryForDualMode<typeof ProcessSteps>(
  circularStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: circularProcessStepsSDUI,
      variant: "circular",
      currentStep: 2,
      animated: true,
    },
  }
) satisfies Story;

const cardsStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: developmentSteps,
    variant: "cards",
    currentStep: 3,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify development process steps
    await expect(canvas.getByText("Planning")).toBeInTheDocument();
    await expect(canvas.getByText("Development")).toBeInTheDocument();
    await expect(canvas.getByText("Testing")).toBeInTheDocument();
    await expect(canvas.getByText("Deployment")).toBeInTheDocument();
    await expect(canvas.getByText("Monitoring")).toBeInTheDocument();
    
    // Verify descriptions
    await expect(canvas.getByText("Define requirements and architecture")).toBeInTheDocument();
    await expect(canvas.getByText("Deploy to production")).toBeInTheDocument();
  },
};

export const Cards = enhanceStoryForDualMode<typeof ProcessSteps>(
  cardsStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: developmentStepsSDUI,
      variant: "cards",
      currentStep: 3,
      animated: true,
    },
  }
) satisfies Story;

const branchingStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: branchingSteps,
    variant: "branching",
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify main steps
    await expect(canvas.getByText("Application Received")).toBeInTheDocument();
    await expect(canvas.getByText("Initial Review")).toBeInTheDocument();
    await expect(canvas.getByText("Final Decision")).toBeInTheDocument();
    await expect(canvas.getByText("Onboarding")).toBeInTheDocument();
    
    // Verify branch steps
    await expect(canvas.getByText("Document Verification")).toBeInTheDocument();
    await expect(canvas.getByText("Background Check")).toBeInTheDocument();
  },
};

export const Branching = enhanceStoryForDualMode<typeof ProcessSteps>(
  branchingStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: branchingStepsSDUI,
      variant: "branching",
      animated: true,
    },
  }
) satisfies Story;

const interactiveStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    interactive: true,
    animated: true,
  },
  render: function InteractiveStory(args) {
    const [currentStep, setCurrentStep] = React.useState(args.currentStep || 0);

    return (
      <ProcessSteps
        {...args}
        currentStep={currentStep}
        onStepClick={(index) => setCurrentStep(index)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify interactive functionality
    const shippingStep = canvas.getByText("Shipping");
    await expect(shippingStep).toBeInTheDocument();
    
    // Click on a step to test interactivity
    await userEvent.click(shippingStep);
  },
};

export const Interactive = enhanceStoryForDualMode<typeof ProcessSteps>(
  interactiveStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: checkoutStepsSDUI,
      currentStep: 1,
      interactive: true,
      animated: true,
    },
  }
) satisfies Story;

const withCustomNumbersStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: [
      { title: "Step A", number: "A", description: "First step" },
      { title: "Step B", number: "B", description: "Second step" },
      { title: "Step C", number: "C", description: "Third step" },
      { title: "Step D", number: "D", description: "Fourth step" },
    ],
    currentStep: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify custom numbers are displayed
    await expect(canvas.getByText("Step A")).toBeInTheDocument();
    await expect(canvas.getByText("Step B")).toBeInTheDocument();
    await expect(canvas.getByText("Step C")).toBeInTheDocument();
    await expect(canvas.getByText("Step D")).toBeInTheDocument();
  },
};

export const WithCustomNumbers = enhanceStoryForDualMode<typeof ProcessSteps>(withCustomNumbersStory) satisfies Story;

const completedStepsStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: checkoutSteps,
    completedSteps: [0, 1, 2, 3],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all steps are marked as completed
    await expect(canvas.getByText("Cart")).toBeInTheDocument();
    await expect(canvas.getByText("Shipping")).toBeInTheDocument();
    await expect(canvas.getByText("Payment")).toBeInTheDocument();
    await expect(canvas.getByText("Complete")).toBeInTheDocument();
  },
};

export const CompletedSteps = enhanceStoryForDualMode<typeof ProcessSteps>(
  completedStepsStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: checkoutStepsSDUI,
      completedSteps: [0, 1, 2, 3],
    },
  }
) satisfies Story;

const withoutConnectorsStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    showConnectors: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify steps are rendered without connectors
    await expect(canvas.getByText("Cart")).toBeInTheDocument();
    await expect(canvas.getByText("Shipping")).toBeInTheDocument();
  },
};

export const WithoutConnectors = enhanceStoryForDualMode<typeof ProcessSteps>(
  withoutConnectorsStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: checkoutStepsSDUI,
      currentStep: 1,
      showConnectors: false,
    },
  }
) satisfies Story;

const dashedConnectorsStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    connectorStyle: "dashed",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify steps with dashed connectors
    await expect(canvas.getByText("Cart")).toBeInTheDocument();
    await expect(canvas.getByText("Payment")).toBeInTheDocument();
  },
};

export const DashedConnectors = enhanceStoryForDualMode<typeof ProcessSteps>(
  dashedConnectorsStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: checkoutStepsSDUI,
      currentStep: 1,
      connectorStyle: "dashed",
    },
  }
) satisfies Story;

const smallSizeStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    size: "sm",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify small size rendering
    await expect(canvas.getByText("Cart")).toBeInTheDocument();
    await expect(canvas.getByText("Review your items")).toBeInTheDocument();
  },
};

export const SmallSize = enhanceStoryForDualMode<typeof ProcessSteps>(
  smallSizeStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: checkoutStepsSDUI,
      currentStep: 1,
      size: "sm",
    },
  }
) satisfies Story;

const largeSizeStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    size: "lg",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify large size rendering
    await expect(canvas.getByText("Cart")).toBeInTheDocument();
    await expect(canvas.getByText("Review your items")).toBeInTheDocument();
  },
};

export const LargeSize = enhanceStoryForDualMode<typeof ProcessSteps>(
  largeSizeStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: checkoutStepsSDUI,
      currentStep: 1,
      size: "lg",
    },
  }
) satisfies Story;

const disabledStepsStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: [
      { ...checkoutSteps[0], status: "completed" },
      { ...checkoutSteps[1], status: "current" },
      { ...checkoutSteps[2], status: "disabled" },
      { ...checkoutSteps[3], status: "disabled" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify steps with different statuses
    await expect(canvas.getByText("Cart")).toBeInTheDocument();
    await expect(canvas.getByText("Shipping")).toBeInTheDocument();
    await expect(canvas.getByText("Payment")).toBeInTheDocument();
    await expect(canvas.getByText("Complete")).toBeInTheDocument();
  },
};

export const DisabledSteps = enhanceStoryForDualMode<typeof ProcessSteps>(
  disabledStepsStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: [
        { ...checkoutStepsSDUI[0], status: "completed" },
        { ...checkoutStepsSDUI[1], status: "current" },
        { ...checkoutStepsSDUI[2], status: "disabled" },
        { ...checkoutStepsSDUI[3], status: "disabled" },
      ],
    },
  }
) satisfies Story;

const longProcessSteps = [
  { title: "Research", icon: <Search />, description: "Market analysis" },
  { title: "Planning", icon: <FileText />, description: "Project roadmap" },
  { title: "Design", icon: <Settings />, description: "UI/UX design" },
  { title: "Development", icon: <Code />, description: "Build features" },
  { title: "Testing", icon: <Shield />, description: "Quality assurance" },
  { title: "Documentation", icon: <FileText />, description: "Write docs" },
  { title: "Deployment", icon: <Rocket />, description: "Go live" },
  { title: "Marketing", icon: <Globe />, description: "Promote product" },
  { title: "Support", icon: <Phone />, description: "Customer service" },
  { title: "Analytics", icon: <Database />, description: "Track metrics" },
];

const longProcessStepsSDUI = [
  { title: "Research", description: "Market analysis" },
  { title: "Planning", description: "Project roadmap" },
  { title: "Design", description: "UI/UX design" },
  { title: "Development", description: "Build features" },
  { title: "Testing", description: "Quality assurance" },
  { title: "Documentation", description: "Write docs" },
  { title: "Deployment", description: "Go live" },
  { title: "Marketing", description: "Promote product" },
  { title: "Support", description: "Customer service" },
  { title: "Analytics", description: "Track metrics" },
];

const longProcessStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: longProcessSteps,
    currentStep: 4,
    size: "sm",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify some of the many steps
    await expect(canvas.getByText("Research")).toBeInTheDocument();
    await expect(canvas.getByText("Development")).toBeInTheDocument();
    await expect(canvas.getByText("Testing")).toBeInTheDocument();
    await expect(canvas.getByText("Analytics")).toBeInTheDocument();
  },
};

export const LongProcess = enhanceStoryForDualMode<typeof ProcessSteps>(
  longProcessStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: longProcessStepsSDUI,
      currentStep: 4,
      size: "sm",
    },
  }
) satisfies Story;

const installationSteps = [
  {
    title: "Download",
    description: "Get the installer",
    icon: <Globe />,
  },
  {
    title: "Install",
    description: "Run the setup",
    icon: <Settings />,
  },
  {
    title: "Configure",
    description: "Set preferences",
    icon: <Database />,
  },
  {
    title: "Activate",
    description: "Enter license key",
    icon: <Shield />,
  },
  {
    title: "Ready",
    description: "Start using the app",
    icon: <CheckCircle />,
  },
];

const installationStepsSDUI = [
  { title: "Download", description: "Get the installer" },
  { title: "Install", description: "Run the setup" },
  { title: "Configure", description: "Set preferences" },
  { title: "Activate", description: "Enter license key" },
  { title: "Ready", description: "Start using the app" },
];

const installationGuideStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: installationSteps,
    variant: "vertical",
    currentStep: 2,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify installation steps
    await expect(canvas.getByText("Download")).toBeInTheDocument();
    await expect(canvas.getByText("Install")).toBeInTheDocument();
    await expect(canvas.getByText("Configure")).toBeInTheDocument();
    await expect(canvas.getByText("Activate")).toBeInTheDocument();
    await expect(canvas.getByText("Ready")).toBeInTheDocument();
    
    // Verify descriptions
    await expect(canvas.getByText("Get the installer")).toBeInTheDocument();
    await expect(canvas.getByText("Enter license key")).toBeInTheDocument();
  },
};

export const InstallationGuide = enhanceStoryForDualMode<typeof ProcessSteps>(
  installationGuideStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: installationStepsSDUI,
      variant: "vertical",
      currentStep: 2,
      animated: true,
    },
  }
) satisfies Story;

const hiringSteps = [
  {
    title: "Apply",
    description: "Submit application",
    icon: <FileText />,
  },
  {
    title: "Phone Screen",
    description: "30 min call",
    icon: <Phone />,
    badge: "Day 1-3",
  },
  {
    title: "Technical Interview",
    description: "Skills assessment",
    icon: <Code />,
    badge: "Day 5-7",
  },
  {
    title: "On-site Interview",
    description: "Meet the team",
    icon: <Briefcase />,
    badge: "Day 10-14",
  },
  {
    title: "Offer",
    description: "Review package",
    icon: <Star />,
    badge: "Day 15-20",
  },
];

const hiringStepsSDUI = [
  { title: "Apply", description: "Submit application" },
  { title: "Phone Screen", description: "30 min call", badge: "Day 1-3" },
  { title: "Technical Interview", description: "Skills assessment", badge: "Day 5-7" },
  { title: "On-site Interview", description: "Meet the team", badge: "Day 10-14" },
  { title: "Offer", description: "Review package", badge: "Day 15-20" },
];

const hiringProcessStory: StoryObj<typeof ProcessSteps> = {
  args: {
    steps: hiringSteps,
    variant: "cards",
    currentStep: 2,
    animated: true,
    interactive: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify hiring process steps
    await expect(canvas.getByText("Apply")).toBeInTheDocument();
    await expect(canvas.getByText("Phone Screen")).toBeInTheDocument();
    await expect(canvas.getByText("Technical Interview")).toBeInTheDocument();
    await expect(canvas.getByText("On-site Interview")).toBeInTheDocument();
    await expect(canvas.getByText("Offer")).toBeInTheDocument();
    
    // Verify badges
    await expect(canvas.getByText("Day 1-3")).toBeInTheDocument();
    await expect(canvas.getByText("Day 15-20")).toBeInTheDocument();
  },
};

export const HiringProcess = enhanceStoryForDualMode<typeof ProcessSteps>(
  hiringProcessStory,
  {
    renderSpec: {
      type: "ProcessSteps",
      steps: hiringStepsSDUI,
      variant: "cards",
      currentStep: 2,
      animated: true,
      interactive: true,
    },
  }
) satisfies Story;
