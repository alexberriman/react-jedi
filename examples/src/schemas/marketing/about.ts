import { header } from "./shared/header";
import { footer } from "./shared/footer";

export const marketingAboutSchema = {
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
          "relative py-24 px-6 overflow-hidden bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950",
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
                  "absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full filter blur-[150px]",
              },
            },
            {
              type: "Box",
              props: {
                className:
                  "absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full filter blur-[150px]",
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
                    children: "About Us",
                  },
                },
                {
                  type: "Heading",
                  props: {
                    level: 1,
                    className:
                      "text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400",
                    children: "Shaping the Digital Tomorrow",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-xl md:text-2xl text-zinc-300 mb-8",
                    children:
                      "We're not just another digital agency. We're innovators, creators, and dreamers pushing the boundaries of what's possible in the digital realm.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // Mission & Vision Section
    {
      type: "Box",
      props: {
        className: "py-24 bg-gradient-to-b from-zinc-950 to-black",
      },
      children: [
        {
          type: "Container",
          children: [
            {
              type: "Grid",
              props: {
                columns: { sm: 1, md: 2 },
                gap: 16,
                className: "items-center",
              },
              children: [
                {
                  type: "Box",
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "mb-8",
                      },
                      children: [
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "mb-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20",
                            children: "Our Mission",
                          },
                        },
                        {
                          type: "Heading",
                          props: {
                            level: 2,
                            className: "text-4xl font-bold mb-4",
                            children: "Empowering Businesses Through Innovation",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 text-lg",
                            children:
                              "We believe in the transformative power of digital technology. Our mission is to empower businesses of all sizes to reach their full potential through innovative digital solutions that drive growth, enhance customer experiences, and create lasting value.",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      children: [
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "mb-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20",
                            children: "Our Vision",
                          },
                        },
                        {
                          type: "Heading",
                          props: {
                            level: 2,
                            className: "text-4xl font-bold mb-4",
                            children: "Becoming the Digital Partner of Choice",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 text-lg",
                            children:
                              "We envision a future where digital excellence is accessible to all. Our goal is to be the trusted partner that businesses turn to when they need to navigate the digital landscape, innovate, and stay ahead of the competition.",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "Box",
                  props: {
                    className: "relative h-[500px] rounded-3xl overflow-hidden",
                  },
                  children: [
                    {
                      type: "Image",
                      props: {
                        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000",
                        alt: "Team collaboration",
                        className: "object-cover w-full h-full",
                      },
                    },
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-transparent to-blue-900/40",
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

    // Values Section
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
                    children: "Our Values",
                  },
                },
                {
                  type: "Heading",
                  props: {
                    level: 2,
                    className: "text-4xl md:text-5xl font-bold mb-4",
                    children: "What Drives Us Forward",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-xl text-zinc-300 max-w-3xl mx-auto",
                    children:
                      "Our core values shape everything we do, from how we work with clients to how we innovate and grow.",
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
                // Value 1
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 backdrop-blur-sm border-zinc-800 p-8 text-center group hover:border-purple-500/50 transition-all duration-300",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-2xl",
                            children: "🚀",
                          },
                        },
                      ],
                    },
                    {
                      type: "Heading",
                      props: {
                        level: 3,
                        className: "text-xl font-semibold mb-2",
                        children: "Innovation",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Constantly pushing boundaries and exploring new possibilities",
                      },
                    },
                  ],
                },

                // Value 2
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 backdrop-blur-sm border-zinc-800 p-8 text-center group hover:border-blue-500/50 transition-all duration-300",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-2xl",
                            children: "💡",
                          },
                        },
                      ],
                    },
                    {
                      type: "Heading",
                      props: {
                        level: 3,
                        className: "text-xl font-semibold mb-2",
                        children: "Excellence",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Delivering exceptional quality in everything we create",
                      },
                    },
                  ],
                },

                // Value 3
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 backdrop-blur-sm border-zinc-800 p-8 text-center group hover:border-indigo-500/50 transition-all duration-300",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-2xl",
                            children: "🤝",
                          },
                        },
                      ],
                    },
                    {
                      type: "Heading",
                      props: {
                        level: 3,
                        className: "text-xl font-semibold mb-2",
                        children: "Collaboration",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Working together to achieve shared success",
                      },
                    },
                  ],
                },

                // Value 4
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 backdrop-blur-sm border-zinc-800 p-8 text-center group hover:border-pink-500/50 transition-all duration-300",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-2xl",
                            children: "❤️",
                          },
                        },
                      ],
                    },
                    {
                      type: "Heading",
                      props: {
                        level: 3,
                        className: "text-xl font-semibold mb-2",
                        children: "Integrity",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Building trust through transparency and honesty",
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

    // Team Section
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
                className: "text-center mb-16",
              },
              children: [
                {
                  type: "Badge",
                  props: {
                    variant: "outline",
                    className:
                      "mb-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20",
                    children: "Our Team",
                  },
                },
                {
                  type: "Heading",
                  props: {
                    level: 2,
                    className: "text-4xl md:text-5xl font-bold mb-4",
                    children: "Meet the Innovators",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-xl text-zinc-300 max-w-3xl mx-auto",
                    children:
                      "Our diverse team of experts brings together creativity, technical expertise, and strategic thinking.",
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
                // Team Member 1
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 overflow-hidden group hover:border-purple-500/50 transition-all duration-300",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "relative h-64 overflow-hidden",
                      },
                      children: [
                        {
                          type: "Image",
                          props: {
                            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600",
                            alt: "Team member",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-300",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "p-6",
                      },
                      children: [
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className: "text-xl font-semibold mb-1",
                            children: "Alex Chen",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-purple-400 mb-3",
                            children: "CEO & Founder",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-400 text-sm",
                            children: "Visionary leader with 15+ years in digital innovation",
                          },
                        },
                      ],
                    },
                  ],
                },

                // Team Member 2
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 overflow-hidden group hover:border-blue-500/50 transition-all duration-300",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "relative h-64 overflow-hidden",
                      },
                      children: [
                        {
                          type: "Image",
                          props: {
                            src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600",
                            alt: "Team member",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-300",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "p-6",
                      },
                      children: [
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className: "text-xl font-semibold mb-1",
                            children: "Sarah Martinez",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-blue-400 mb-3",
                            children: "Creative Director",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-400 text-sm",
                            children: "Award-winning designer pushing creative boundaries",
                          },
                        },
                      ],
                    },
                  ],
                },

                // Team Member 3
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 overflow-hidden group hover:border-indigo-500/50 transition-all duration-300",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "relative h-64 overflow-hidden",
                      },
                      children: [
                        {
                          type: "Image",
                          props: {
                            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
                            alt: "Team member",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-300",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "p-6",
                      },
                      children: [
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className: "text-xl font-semibold mb-1",
                            children: "David Kim",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-indigo-400 mb-3",
                            children: "CTO",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-400 text-sm",
                            children: "Tech innovator with expertise in scalable systems",
                          },
                        },
                      ],
                    },
                  ],
                },

                // Team Member 4
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 overflow-hidden group hover:border-pink-500/50 transition-all duration-300",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "relative h-64 overflow-hidden",
                      },
                      children: [
                        {
                          type: "Image",
                          props: {
                            src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=600",
                            alt: "Team member",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-300",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "p-6",
                      },
                      children: [
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className: "text-xl font-semibold mb-1",
                            children: "Emma Wilson",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-pink-400 mb-3",
                            children: "Marketing Lead",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-400 text-sm",
                            children: "Growth expert driving ROI-focused strategies",
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
