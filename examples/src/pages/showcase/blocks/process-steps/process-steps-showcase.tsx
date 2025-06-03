import { useState } from "react";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { PageHeader } from "../../../../components/ui/page-header";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { Tab, TabList, TabPanel, Tabs } from "../../../../components/ui/tabs";
import { usePageMetadata } from "../../../../lib/meta";

export function ProcessStepsShowcasePage() {
  usePageMetadata({
    title: "Process Steps Block",
    description: "Visual workflow blocks for displaying step-by-step processes with multiple layout variants",
  });

  const [interactiveStep, setInteractiveStep] = useState(1);

  const basicSpec: ComponentSpec = {
    type: "ProcessSteps",
    props: {
      steps: [
        {
          title: "Sign Up",
          description: "Create your account",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineUserAdd",
              color: "currentColor"
            }
          },
        },
        {
          title: "Verify Email",
          description: "Confirm your email address",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineMail",
              color: "currentColor"
            }
          },
        },
        {
          title: "Complete Profile",
          description: "Add your details",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineProfile",
              color: "currentColor"
            }
          },
        },
        {
          title: "Get Started",
          description: "Begin using the app",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineRocket",
              color: "currentColor"
            }
          },
        },
      ],
      currentStep: 2,
      animated: true,
    },
  };

  const verticalSpec: ComponentSpec = {
    type: "ProcessSteps",
    props: {
      variant: "vertical",
      steps: [
        {
          title: "Research",
          description: "Understand user needs and market",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineSearch",
              color: "currentColor"
            }
          },
          badge: "Week 1",
        },
        {
          title: "Design",
          description: "Create wireframes and prototypes",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineSketch",
              color: "currentColor"
            }
          },
          badge: "Week 2-3",
        },
        {
          title: "Development",
          description: "Build the product",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCode",
              color: "currentColor"
            }
          },
          badge: "Week 4-8",
        },
        {
          title: "Testing",
          description: "QA and user testing",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCheckCircle",
              color: "currentColor"
            }
          },
          badge: "Week 9",
        },
        {
          title: "Launch",
          description: "Deploy to production",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineRocket",
              color: "currentColor"
            }
          },
          badge: "Week 10",
        },
      ],
      currentStep: 2,
      animated: true,
      size: "lg",
    },
  };

  const circularSpec: ComponentSpec = {
    type: "ProcessSteps",
    props: {
      variant: "circular",
      steps: [
        {
          title: "Plan",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineFileText",
              color: "currentColor"
            }
          },
        },
        {
          title: "Design",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineSketch",
              color: "currentColor"
            }
          },
        },
        {
          title: "Build",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCode",
              color: "currentColor"
            }
          },
        },
        {
          title: "Test",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCheckCircle",
              color: "currentColor"
            }
          },
        },
        {
          title: "Deploy",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCloudUpload",
              color: "currentColor"
            }
          },
        },
        {
          title: "Monitor",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineBarChart",
              color: "currentColor"
            }
          },
        },
      ],
      currentStep: 3,
      animated: true,
      connectorStyle: "dashed",
    },
  };

  const cardsSpec: ComponentSpec = {
    type: "ProcessSteps",
    props: {
      variant: "cards",
      steps: [
        {
          title: "Discovery",
          description: "We analyze your requirements and create a project roadmap",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCompass",
              color: "currentColor"
            }
          },
          badge: "1-2 days",
        },
        {
          title: "Strategy",
          description: "Define goals, KPIs, and success metrics for your project",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineAim",
              color: "currentColor"
            }
          },
          badge: "2-3 days",
        },
        {
          title: "Design",
          description: "Create stunning visual designs and interactive prototypes",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineSketch",
              color: "currentColor"
            }
          },
          badge: "1 week",
        },
        {
          title: "Development",
          description: "Build your product with modern technologies and best practices",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCode",
              color: "currentColor"
            }
          },
          badge: "2-4 weeks",
        },
        {
          title: "Testing",
          description: "Rigorous testing to ensure quality and performance",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCheckSquare",
              color: "currentColor"
            }
          },
          badge: "1 week",
        },
        {
          title: "Launch",
          description: "Deploy your product and provide ongoing support",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineRocket",
              color: "currentColor"
            }
          },
          badge: "1 day",
        },
      ],
      currentStep: 3,
      animated: true,
      size: "md",
    },
  };

  const branchingSpec: ComponentSpec = {
    type: "ProcessSteps",
    props: {
      variant: "branching",
      steps: [
        {
          title: "Application Submitted",
          description: "Your application has been received",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineFileText",
              color: "currentColor"
            }
          },
          status: "completed",
        },
        {
          title: "Initial Review",
          description: "Checking basic requirements",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineEye",
              color: "currentColor"
            }
          },
          status: "completed",
          branches: [
            {
              title: "Technical Assessment",
              description: "Evaluating technical skills",
              icon: {
                type: "Icon",
                props: {
                  icon: "AiOutlineCode",
                  color: "currentColor"
                }
              },
              status: "current",
            },
            {
              title: "Background Check",
              description: "Verifying references",
              icon: {
                type: "Icon",
                props: {
                  icon: "AiOutlineAudit",
                  color: "currentColor"
                }
              },
              status: "upcoming",
            },
          ],
        },
        {
          title: "Final Decision",
          description: "Review complete",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCheckCircle",
              color: "currentColor"
            }
          },
          status: "upcoming",
        },
        {
          title: "Onboarding",
          description: "Welcome to the team!",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineTeam",
              color: "currentColor"
            }
          },
          status: "upcoming",
        },
      ],
      animated: true,
    },
  };

  const interactiveSpec: ComponentSpec = {
    type: "ProcessSteps",
    props: {
      steps: [
        {
          title: "Select Plan",
          description: "Choose your subscription",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCreditCard",
              color: "currentColor"
            }
          },
        },
        {
          title: "Create Account",
          description: "Sign up with email",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineUser",
              color: "currentColor"
            }
          },
        },
        {
          title: "Setup Profile",
          description: "Personalize your experience",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineSetting",
              color: "currentColor"
            }
          },
        },
        {
          title: "Start Using",
          description: "You're all set!",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineCheckCircle",
              color: "currentColor"
            }
          },
        },
      ],
      currentStep: interactiveStep,
      interactive: true,
      animated: true,
      onStepClick: (index: number) => setInteractiveStep(index),
    },
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Process Steps"
        description="Visual workflow blocks for displaying step-by-step processes with multiple layout variants including horizontal timeline, vertical steps, circular process, numbered cards, and branching paths."
      />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="examples">
          <TabList>
            <Tab value="examples">Examples</Tab>
            <Tab value="usage">Usage</Tab>
            <Tab value="props">Props</Tab>
          </TabList>

          <TabPanel value="examples" className="space-y-8 mt-6">
            <ShowcaseWrapper
              title="Horizontal Timeline (Default)"
              description="Perfect for showing linear processes like onboarding flows or checkout steps"
              spec={basicSpec}
            />

            <ShowcaseWrapper
              title="Vertical Steps"
              description="Ideal for mobile layouts or when you need more space for descriptions"
              spec={verticalSpec}
            />

            <ShowcaseWrapper
              title="Circular Process"
              description="Great for cyclical processes or continuous improvement workflows"
              spec={circularSpec}
            />

            <ShowcaseWrapper
              title="Card Layout"
              description="Use when you need more detailed descriptions or want a grid layout"
              spec={cardsSpec}
            />

            <ShowcaseWrapper
              title="Branching Paths"
              description="Perfect for complex workflows with conditional paths or parallel processes"
              spec={branchingSpec}
            />

            <ShowcaseWrapper
              title="Interactive Steps"
              description="Click on any step to navigate through the process"
              spec={interactiveSpec}
            />
          </TabPanel>

          <TabPanel value="usage" className="mt-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Basic Usage</h3>
              <pre className="language-json">
{`{
  "type": "ProcessSteps",
  "props": {
    "steps": [
      {
        "title": "Step 1",
        "description": "First step description",
        "icon": {
          "type": "Icon",
          "props": {
            "icon": "AiOutlineNumber1"
          }
        }
      },
      {
        "title": "Step 2",
        "description": "Second step description"
      }
    ],
    "currentStep": 1
  }
}`}
              </pre>

              <h3>With Different Variants</h3>
              <pre className="language-json">
{`{
  "type": "ProcessSteps",
  "props": {
    "variant": "vertical", // or "circular", "cards", "branching"
    "steps": [...],
    "animated": true,
    "size": "lg"
  }
}`}
              </pre>

              <h3>Interactive Steps</h3>
              <pre className="language-json">
{`{
  "type": "ProcessSteps",
  "props": {
    "steps": [...],
    "interactive": true,
    "onStepClick": "handleStepClick"
  }
}`}
              </pre>
            </div>
          </TabPanel>

          <TabPanel value="props" className="mt-6">
            <div className="prose dark:prose-invert max-w-none">
              <table>
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>steps</code></td>
                    <td><code>ProcessStep[]</code></td>
                    <td>Required</td>
                    <td>Array of step objects</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>&quot;horizontal&quot; | &quot;vertical&quot; | &quot;circular&quot; | &quot;cards&quot; | &quot;branching&quot;</code></td>
                    <td><code>&quot;horizontal&quot;</code></td>
                    <td>Layout variant</td>
                  </tr>
                  <tr>
                    <td><code>currentStep</code></td>
                    <td><code>number</code></td>
                    <td><code>undefined</code></td>
                    <td>Index of the current active step</td>
                  </tr>
                  <tr>
                    <td><code>completedSteps</code></td>
                    <td><code>number[]</code></td>
                    <td><code>[]</code></td>
                    <td>Array of completed step indices</td>
                  </tr>
                  <tr>
                    <td><code>showConnectors</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Show connecting lines between steps</td>
                  </tr>
                  <tr>
                    <td><code>connectorStyle</code></td>
                    <td><code>&quot;solid&quot; | &quot;dashed&quot; | &quot;arrow&quot;</code></td>
                    <td><code>&quot;solid&quot;</code></td>
                    <td>Style of connecting lines</td>
                  </tr>
                  <tr>
                    <td><code>animated</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable entrance animations</td>
                  </tr>
                  <tr>
                    <td><code>interactive</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Allow clicking on steps</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</code></td>
                    <td><code>&quot;md&quot;</code></td>
                    <td>Size of steps and text</td>
                  </tr>
                  <tr>
                    <td><code>onStepClick</code></td>
                    <td><code>(index: number) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>Callback when a step is clicked</td>
                  </tr>
                </tbody>
              </table>

              <h3>ProcessStep Object</h3>
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>title</code></td>
                    <td><code>string</code></td>
                    <td>Step title (required)</td>
                  </tr>
                  <tr>
                    <td><code>description</code></td>
                    <td><code>string</code></td>
                    <td>Optional step description</td>
                  </tr>
                  <tr>
                    <td><code>icon</code></td>
                    <td><code>React.ReactNode</code></td>
                    <td>Optional step icon</td>
                  </tr>
                  <tr>
                    <td><code>number</code></td>
                    <td><code>string | number</code></td>
                    <td>Custom step number/label</td>
                  </tr>
                  <tr>
                    <td><code>status</code></td>
                    <td><code>&quot;completed&quot; | &quot;current&quot; | &quot;upcoming&quot; | &quot;disabled&quot;</code></td>
                    <td>Override automatic status</td>
                  </tr>
                  <tr>
                    <td><code>badge</code></td>
                    <td><code>string</code></td>
                    <td>Optional badge text</td>
                  </tr>
                  <tr>
                    <td><code>branches</code></td>
                    <td><code>ProcessStep[]</code></td>
                    <td>Sub-steps for branching variant</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}