import { header } from "./shared/header";
import { footer } from "./shared/footer";

export const marketingServicesSchema = {
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
          "relative py-24 px-6 overflow-hidden bg-gradient-to-br from-green-950 via-blue-950 to-purple-950",
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
                  "absolute top-0 left-0 w-[600px] h-[600px] bg-green-500/20 rounded-full filter blur-[150px]",
              },
            },
            {
              type: "Box",
              props: {
                className:
                  "absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full filter blur-[150px]",
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
                    children: "Our Services",
                  },
                },
                {
                  type: "Heading",
                  props: {
                    level: 1,
                    className:
                      "text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400",
                    children: "Solutions That Scale With You",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-xl md:text-2xl text-zinc-300 mb-8",
                    children:
                      "From strategy to execution, we offer comprehensive digital services that help your business thrive in the modern landscape.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // Services Overview
    {
      type: "Box",
      props: {
        className: "py-24 bg-gradient-to-b from-zinc-950 to-black",
      },
      children: [
        {
          type: "Container",
          children: [
            // Service 1: Design
            {
              type: "Box",
              props: {
                className: "mb-32",
              },
              children: [
                {
                  type: "Grid",
                  props: {
                    columns: { sm: 1, lg: 2 },
                    gap: 16,
                    className: "items-center",
                  },
                  children: [
                    {
                      type: "Box",
                      children: [
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "mb-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20",
                            children: "Design Excellence",
                          },
                        },
                        {
                          type: "Heading",
                          props: {
                            level: 2,
                            className: "text-4xl font-bold mb-6",
                            children: "UI/UX Design & Branding",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 text-lg mb-8",
                            children:
                              "We create stunning, user-centric designs that not only look beautiful but also drive engagement and conversions. Our design philosophy combines aesthetics with functionality.",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-purple-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "User Research & Analysis",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-purple-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "Wireframing & Prototyping",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-purple-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "Visual Design & Branding",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-purple-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "Design Systems & Guidelines",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "relative h-[400px] rounded-3xl overflow-hidden group",
                      },
                      children: [
                        {
                          type: "Image",
                          props: {
                            src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000",
                            alt: "Design process",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-500",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-br from-purple-900/40 to-pink-900/40",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Service 2: Development
            {
              type: "Box",
              props: {
                className: "mb-32",
              },
              children: [
                {
                  type: "Grid",
                  props: {
                    columns: { sm: 1, lg: 2 },
                    gap: 16,
                    className: "items-center",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "lg:order-2",
                      },
                      children: [
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "mb-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20",
                            children: "Technical Excellence",
                          },
                        },
                        {
                          type: "Heading",
                          props: {
                            level: 2,
                            className: "text-4xl font-bold mb-6",
                            children: "Web & App Development",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 text-lg mb-8",
                            children:
                              "We build robust, scalable digital solutions using the latest technologies. From responsive websites to complex applications, we deliver performance and reliability.",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-blue-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "Frontend Development (React, Vue, Angular)",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-blue-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "Backend Development (Node.js, Python, PHP)",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-blue-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "Mobile App Development (iOS, Android)",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-blue-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "API Development & Integration",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className:
                          "relative h-[400px] rounded-3xl overflow-hidden group lg:order-1",
                      },
                      children: [
                        {
                          type: "Image",
                          props: {
                            src: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2000",
                            alt: "Development process",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-500",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-br from-blue-900/40 to-cyan-900/40",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Service 3: Marketing
            {
              type: "Box",
              props: {
                className: "mb-32",
              },
              children: [
                {
                  type: "Grid",
                  props: {
                    columns: { sm: 1, lg: 2 },
                    gap: 16,
                    className: "items-center",
                  },
                  children: [
                    {
                      type: "Box",
                      children: [
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "mb-4 bg-gradient-to-r from-green-500/10 to-yellow-500/10 border-green-500/20",
                            children: "Growth Strategies",
                          },
                        },
                        {
                          type: "Heading",
                          props: {
                            level: 2,
                            className: "text-4xl font-bold mb-6",
                            children: "Digital Marketing & SEO",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 text-lg mb-8",
                            children:
                              "We craft data-driven marketing strategies that amplify your brand reach and drive meaningful engagement. Our approach combines creativity with analytics for maximum impact.",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-green-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "Search Engine Optimization (SEO)",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-green-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "Pay-Per-Click Advertising (PPC)",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-green-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "Social Media Marketing",
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
                                  type: "Box",
                                  props: {
                                    className: "w-2 h-2 rounded-full bg-green-400",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-zinc-300",
                                    children: "Content Marketing & Strategy",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "relative h-[400px] rounded-3xl overflow-hidden group",
                      },
                      children: [
                        {
                          type: "Image",
                          props: {
                            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
                            alt: "Marketing analytics",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-500",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-br from-green-900/40 to-yellow-900/40",
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

    // Process Section
    {
      type: "Box",
      props: {
        className: "py-24 bg-black",
      },
      children: [
        {
          type: "Container",
          children: [
            {
              type: "Box",
              props: {
                className: "text-center mb-16",
              },
              children: [
                {
                  type: "Badge",
                  props: {
                    variant: "outline",
                    className:
                      "mb-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20",
                    children: "Our Process",
                  },
                },
                {
                  type: "Heading",
                  props: {
                    level: 2,
                    className: "text-4xl md:text-5xl font-bold mb-4",
                    children: "How We Work",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-xl text-zinc-300 max-w-3xl mx-auto",
                    children:
                      "Our proven process ensures successful project delivery and exceeds client expectations.",
                  },
                },
              ],
            },

            {
              type: "Grid",
              props: {
                columns: { sm: 1, md: 2, lg: 4 },
                gap: 8,
              },
              children: [
                // Step 1
                {
                  type: "Box",
                  props: {
                    className: "text-center relative",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-2xl font-bold",
                            children: "1",
                          },
                        },
                      ],
                    },
                    {
                      type: "Heading",
                      props: {
                        level: 3,
                        className: "text-xl font-semibold mb-3",
                        children: "Discovery",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Understanding your goals, audience, and requirements",
                      },
                    },
                  ],
                },

                // Step 2
                {
                  type: "Box",
                  props: {
                    className: "text-center relative",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-2xl font-bold",
                            children: "2",
                          },
                        },
                      ],
                    },
                    {
                      type: "Heading",
                      props: {
                        level: 3,
                        className: "text-xl font-semibold mb-3",
                        children: "Strategy",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Developing a comprehensive plan and approach",
                      },
                    },
                  ],
                },

                // Step 3
                {
                  type: "Box",
                  props: {
                    className: "text-center relative",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-2xl font-bold",
                            children: "3",
                          },
                        },
                      ],
                    },
                    {
                      type: "Heading",
                      props: {
                        level: 3,
                        className: "text-xl font-semibold mb-3",
                        children: "Execute",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Bringing your vision to life with precision",
                      },
                    },
                  ],
                },

                // Step 4
                {
                  type: "Box",
                  props: {
                    className: "text-center relative",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/25",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-2xl font-bold",
                            children: "4",
                          },
                        },
                      ],
                    },
                    {
                      type: "Heading",
                      props: {
                        level: 3,
                        className: "text-xl font-semibold mb-3",
                        children: "Optimize",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Continuous improvement and growth",
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
                  "relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-950 via-blue-950 to-purple-950 border border-blue-500/20 p-16 text-center",
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
                          "absolute top-0 left-0 w-[600px] h-[600px] bg-green-500/20 rounded-full filter blur-[150px]",
                      },
                    },
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full filter blur-[150px]",
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
                        children: "Let's Build Something Amazing",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-xl text-zinc-300 mb-8 max-w-2xl mx-auto",
                        children:
                          "Ready to transform your digital presence? Let's discuss how we can help your business reach new heights.",
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
                              "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 border-0 shadow-lg shadow-blue-500/25",
                            children: "Start Your Project",
                          },
                        },
                        {
                          type: "Button",
                          props: {
                            variant: "outline",
                            size: "lg",
                            className: "backdrop-blur-sm bg-white/5",
                            children: "View Our Work",
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
