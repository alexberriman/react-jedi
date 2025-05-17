import { header } from "./shared/header";
import { footer } from "./shared/footer";

export const marketingPricingSchema = {
  type: "Box",
  props: {
    className: "w-full min-h-screen pt-20",
  },
  children: [
    header,

    // Hero Section
    {
      type: "Box",
      props: {
        className:
          "relative py-24 px-6 overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950",
      },
      children: [
        // Background decoration
        {
          type: "Box",
          props: {
            className: "absolute inset-0 z-0",
          },
          children: [
            {
              type: "Box",
              props: {
                className:
                  "absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full filter blur-[150px]",
              },
            },
            {
              type: "Box",
              props: {
                className:
                  "absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full filter blur-[150px]",
              },
            },
          ],
        },

        {
          type: "Container",
          props: {
            className: "relative z-10",
          },
          children: [
            {
              type: "Box",
              props: {
                className: "max-w-4xl mx-auto text-center",
              },
              children: [
                {
                  type: "Badge",
                  props: {
                    variant: "outline",
                    className: "mb-6 backdrop-blur-sm bg-white/5 border-white/20",
                    children: "Pricing Plans",
                  },
                },
                {
                  type: "Heading",
                  props: {
                    level: 1,
                    className:
                      "text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400",
                    children: "Plans That Scale With You",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 mb-8",
                    children:
                      "Choose the perfect plan for your business. Flexible pricing designed to grow with your needs.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // Pricing Plans
    {
      type: "Box",
      props: {
        className: "py-24 bg-gradient-to-b from-zinc-950 to-black",
      },
      children: [
        {
          type: "Container",
          children: [
            // Annual/Monthly Toggle
            {
              type: "Flex",
              props: {
                className: "justify-center mb-16",
              },
              children: [
                {
                  type: "Box",
                  props: {
                    className:
                      "bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-full p-1 border border-zinc-200 dark:border-zinc-800",
                  },
                  children: [
                    {
                      type: "Flex",
                      props: {
                        gap: 2,
                      },
                      children: [
                        {
                          type: "Button",
                          props: {
                            variant: "ghost",
                            className:
                              "rounded-full px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-zinc-900 dark:text-white",
                            children: "Monthly",
                          },
                        },
                        {
                          type: "Button",
                          props: {
                            variant: "ghost",
                            className: "rounded-full px-6",
                            children: "Annual (Save 20%)",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            {
              type: "Grid",
              props: {
                columns: { sm: 1, md: 2, lg: 3 },
                gap: 8,
                className: "mb-16",
              },
              children: [
                // Starter Plan
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 relative overflow-hidden hover:border-purple-500/50 transition-all duration-300",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "p-8",
                      },
                      children: [
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className: "text-2xl font-bold mb-2",
                            children: "Starter",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-600 dark:text-zinc-400 mb-6",
                            children: "Perfect for small businesses just getting started",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className: "mb-6",
                          },
                          children: [
                            {
                              type: "Text",
                              props: {
                                className: "text-5xl font-bold mb-2",
                                children: "$99",
                              },
                            },
                            {
                              type: "Text",
                              props: {
                                className: "text-zinc-600 dark:text-zinc-400",
                                children: "per month",
                              },
                            },
                          ],
                        },
                        {
                          type: "Button",
                          props: {
                            variant: "outline",
                            className: "w-full mb-8",
                            children: "Get Started",
                          },
                        },
                        {
                          type: "Stack",
                          props: {
                            gap: 4,
                          },
                          children: [
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "5 Project limit",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "Basic analytics",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "Email support",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "Mobile app access",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                // Professional Plan (Popular)
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border-purple-500/50 relative overflow-hidden transition-all duration-300 scale-105",
                  },
                  children: [
                    // Popular badge
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-600 text-zinc-900 dark:text-white px-4 py-1 rounded-bl-lg",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-sm font-medium",
                            children: "Most Popular",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "p-8",
                      },
                      children: [
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className: "text-2xl font-bold mb-2",
                            children: "Professional",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-600 dark:text-zinc-400 mb-6",
                            children: "Ideal for growing businesses with advanced needs",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className: "mb-6",
                          },
                          children: [
                            {
                              type: "Text",
                              props: {
                                className:
                                  "text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
                                children: "$299",
                              },
                            },
                            {
                              type: "Text",
                              props: {
                                className: "text-zinc-600 dark:text-zinc-400",
                                children: "per month",
                              },
                            },
                          ],
                        },
                        {
                          type: "Button",
                          props: {
                            variant: "default",
                            className:
                              "w-full mb-8 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-0",
                            children: "Get Started",
                          },
                        },
                        {
                          type: "Stack",
                          props: {
                            gap: 4,
                          },
                          children: [
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "Unlimited projects",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "Advanced analytics",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "Priority support",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "Team collaboration",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300 font-medium",
                                    children: "All Starter features",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                // Enterprise Plan
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 relative overflow-hidden hover:border-indigo-500/50 transition-all duration-300",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "p-8",
                      },
                      children: [
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className: "text-2xl font-bold mb-2",
                            children: "Enterprise",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-600 dark:text-zinc-400 mb-6",
                            children: "Custom solutions for large organizations",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className: "mb-6",
                          },
                          children: [
                            {
                              type: "Text",
                              props: {
                                className: "text-4xl font-bold mb-2",
                                children: "Custom",
                              },
                            },
                            {
                              type: "Text",
                              props: {
                                className: "text-zinc-600 dark:text-zinc-400",
                                children: "Contact for pricing",
                              },
                            },
                          ],
                        },
                        {
                          type: "Button",
                          props: {
                            variant: "outline",
                            className: "w-full mb-8",
                            children: "Contact Sales",
                          },
                        },
                        {
                          type: "Stack",
                          props: {
                            gap: 4,
                          },
                          children: [
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "Custom integrations",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "Dedicated account manager",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "24/7 phone support",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300",
                                    children: "SLA guarantees",
                                  },
                                },
                              ],
                            },
                            {
                              type: "Flex",
                              props: {
                                gap: 3,
                                className: "items-center",
                              },
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-green-400",
                                    children: "✓",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-700 dark:text-zinc-300 font-medium",
                                    children: "All Professional features",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Feature Comparison
            {
              type: "Box",
              props: {
                className: "mb-24",
              },
              children: [
                {
                  type: "Heading",
                  props: {
                    level: 2,
                    className: "text-3xl font-bold text-center mb-12",
                    children: "Feature Comparison",
                  },
                },
                {
                  type: "Box",
                  props: {
                    className: "overflow-x-auto",
                  },
                  children: [
                    {
                      type: "Table",
                      props: {
                        className: "w-full",
                      },
                      children: [
                        {
                          type: "thead",
                          children: [
                            {
                              type: "tr",
                              children: [
                                {
                                  type: "th",
                                  props: {
                                    className:
                                      "text-left p-4 border-b border-zinc-200 dark:border-zinc-800",
                                    children: "Features",
                                  },
                                },
                                {
                                  type: "th",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800",
                                    children: "Starter",
                                  },
                                },
                                {
                                  type: "th",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800",
                                    children: "Professional",
                                  },
                                },
                                {
                                  type: "th",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800",
                                    children: "Enterprise",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                        {
                          type: "tbody",
                          children: [
                            {
                              type: "tr",
                              children: [
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "Projects",
                                  },
                                },
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "5",
                                  },
                                },
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "Unlimited",
                                  },
                                },
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "Unlimited",
                                  },
                                },
                              ],
                            },
                            {
                              type: "tr",
                              children: [
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "Team Members",
                                  },
                                },
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "1",
                                  },
                                },
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "10",
                                  },
                                },
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "Unlimited",
                                  },
                                },
                              ],
                            },
                            {
                              type: "tr",
                              children: [
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "Storage",
                                  },
                                },
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "10GB",
                                  },
                                },
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "100GB",
                                  },
                                },
                                {
                                  type: "td",
                                  props: {
                                    className:
                                      "text-center p-4 border-b border-zinc-200 dark:border-zinc-800/50",
                                    children: "Custom",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // FAQ Section
    {
      type: "Box",
      props: {
        className: "py-24 bg-white dark:bg-black",
      },
      children: [
        {
          type: "Container",
          children: [
            {
              type: "Box",
              props: {
                className: "max-w-3xl mx-auto",
              },
              children: [
                {
                  type: "Box",
                  props: {
                    className: "text-center mb-12",
                  },
                  children: [
                    {
                      type: "Badge",
                      props: {
                        variant: "outline",
                        className:
                          "mb-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20",
                        children: "FAQ",
                      },
                    },
                    {
                      type: "Heading",
                      props: {
                        level: 2,
                        className: "text-4xl font-bold mb-4",
                        children: "Frequently Asked Questions",
                      },
                    },
                  ],
                },
                {
                  type: "Accordion",
                  props: {
                    type: "single",
                    collapsible: true,
                  },
                  children: [
                    {
                      type: "AccordionItem",
                      props: {
                        value: "item-1",
                      },
                      children: [
                        {
                          type: "AccordionTrigger",
                          props: {
                            children: "Can I switch plans later?",
                          },
                        },
                        {
                          type: "AccordionContent",
                          props: {
                            children:
                              "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
                          },
                        },
                      ],
                    },
                    {
                      type: "AccordionItem",
                      props: {
                        value: "item-2",
                      },
                      children: [
                        {
                          type: "AccordionTrigger",
                          props: {
                            children: "Is there a free trial?",
                          },
                        },
                        {
                          type: "AccordionContent",
                          props: {
                            children:
                              "We offer a 14-day free trial for all plans. No credit card required to start.",
                          },
                        },
                      ],
                    },
                    {
                      type: "AccordionItem",
                      props: {
                        value: "item-3",
                      },
                      children: [
                        {
                          type: "AccordionTrigger",
                          props: {
                            children: "What payment methods do you accept?",
                          },
                        },
                        {
                          type: "AccordionContent",
                          props: {
                            children:
                              "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
                          },
                        },
                      ],
                    },
                    {
                      type: "AccordionItem",
                      props: {
                        value: "item-4",
                      },
                      children: [
                        {
                          type: "AccordionTrigger",
                          props: {
                            children: "Is my data secure?",
                          },
                        },
                        {
                          type: "AccordionContent",
                          props: {
                            children:
                              "Absolutely. We use enterprise-grade security measures including SSL encryption, regular backups, and compliance with international data protection standards.",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // CTA Section
    {
      type: "Box",
      props: {
        className: "py-24 bg-gradient-to-b from-black to-zinc-950",
      },
      children: [
        {
          type: "Container",
          children: [
            {
              type: "Box",
              props: {
                className:
                  "relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 border border-purple-500/20 p-16 text-center",
              },
              children: [
                // Background decoration
                {
                  type: "Box",
                  props: {
                    className: "absolute inset-0 z-0",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full filter blur-[150px]",
                      },
                    },
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full filter blur-[150px]",
                      },
                    },
                  ],
                },
                // Content
                {
                  type: "Box",
                  props: {
                    className: "relative z-10",
                  },
                  children: [
                    {
                      type: "Heading",
                      props: {
                        level: 2,
                        className: "text-4xl md:text-5xl font-bold mb-6",
                        children: "Ready to Get Started?",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-xl text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto",
                        children:
                          "Join thousands of businesses that trust Nexus Digital. Start your free trial today.",
                      },
                    },
                    {
                      type: "Box",
                      props: {
                        className: "flex flex-wrap gap-4 justify-center",
                      },
                      children: [
                        {
                          type: "Button",
                          props: {
                            variant: "default",
                            size: "lg",
                            className:
                              "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-lg shadow-purple-500/25",
                            children: "Start Free Trial",
                          },
                        },
                        {
                          type: "Button",
                          props: {
                            variant: "outline",
                            size: "lg",
                            className: "backdrop-blur-sm bg-white/5",
                            children: "Book a Demo",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    footer,
  ],
};
