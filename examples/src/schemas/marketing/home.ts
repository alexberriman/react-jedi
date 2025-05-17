import { header } from "./shared/header";
import { footer } from "./shared/footer";

export const marketingHomeSchema = {
  type: "Box",
  props: {
    className: "w-full min-h-screen",
  },
  children: [
    header,

    // Hero Section
    {
      type: "Box",
      props: {
        className:
          "relative py-32 px-6 overflow-hidden bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950",
      },
      children: [
        // Background patterns
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
                  "absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 rounded-full filter blur-[150px]",
              },
            },
            {
              type: "Box",
              props: {
                className:
                  "absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full filter blur-[150px]",
              },
            },
            {
              type: "Box",
              props: {
                className:
                  "absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-pink-500/10 rounded-full filter blur-[150px]",
              },
            },
            // Grid pattern overlay
            {
              type: "Box",
              props: {
                className:
                  "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]",
              },
            },
          ],
        },

        // Hero Content
        {
          type: "Container",
          props: {
            className: "relative z-10",
          },
          children: [
            {
              type: "Grid",
              props: {
                columns: { sm: 1, lg: 2 },
                gap: 12,
                className: "items-center",
              },
              children: [
                // Left Content
                {
                  type: "Box",
                  children: [
                    {
                      type: "Badge",
                      props: {
                        variant: "outline",
                        className: "mb-6 backdrop-blur-sm bg-white/5 border-white/20",
                        children: "🔥 2025's Most Innovative Agency",
                      },
                    },
                    {
                      type: "Heading",
                      props: {
                        level: 1,
                        className:
                          "text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400",
                        children: "Transform Your Digital Future Today",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-xl md:text-2xl text-zinc-300 mb-8",
                        children:
                          "We craft exceptional digital experiences that elevate brands and drive extraordinary results. Join industry leaders who trust us with their digital transformation.",
                      },
                    },
                    {
                      type: "Box",
                      props: {
                        className: "flex flex-wrap gap-4 mb-8",
                      },
                      children: [
                        {
                          type: "Button",
                          props: {
                            variant: "default",
                            size: "lg",
                            className:
                              "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-purple-500/25",
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
                    {
                      type: "Flex",
                      props: {
                        gap: 8,
                        className: "items-center",
                      },
                      children: [
                        {
                          type: "Box",
                          props: {
                            className: "flex -space-x-3",
                          },
                          children: [
                            {
                              type: "Avatar",
                              props: {
                                className:
                                  "border-2 border-zinc-900 bg-gradient-to-br from-blue-500 to-purple-600",
                                children: "A",
                              },
                            },
                            {
                              type: "Avatar",
                              props: {
                                className:
                                  "border-2 border-zinc-900 bg-gradient-to-br from-purple-500 to-pink-600",
                                children: "B",
                              },
                            },
                            {
                              type: "Avatar",
                              props: {
                                className:
                                  "border-2 border-zinc-900 bg-gradient-to-br from-pink-500 to-yellow-600",
                                children: "C",
                              },
                            },
                          ],
                        },
                        {
                          type: "Box",
                          children: [
                            {
                              type: "Text",
                              props: {
                                className: "text-sm text-zinc-400",
                                children: "Trusted by 500+ companies",
                              },
                            },
                            {
                              type: "Text",
                              props: {
                                className: "text-xs text-zinc-500",
                                children: "★★★★★ 4.9/5 rating",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                // Right Visual
                {
                  type: "Box",
                  props: {
                    className: "relative h-[500px] lg:h-[600px]",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "absolute inset-0 rounded-3xl overflow-hidden",
                      },
                      children: [
                        {
                          type: "Image",
                          props: {
                            src: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2000",
                            alt: "Digital transformation",
                            className: "object-cover w-full h-full",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40",
                          },
                        },
                      ],
                    },
                    // Floating UI cards
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute -top-4 -right-4 w-48 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl shadow-purple-500/25 p-4",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-sm font-medium text-white/90",
                            children: "Projects Delivered",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-3xl font-bold text-white",
                            children: "1,245+",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute bottom-8 -left-4 w-48 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl shadow-pink-500/25 p-4",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-sm font-medium text-white/90",
                            children: "Client Satisfaction",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-3xl font-bold text-white",
                            children: "99.8%",
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

    // Features Section
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
                      "mb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-purple-500/20",
                    children: "What We Do",
                  },
                },
                {
                  type: "Heading",
                  props: {
                    level: 2,
                    className: "text-4xl md:text-5xl font-bold mb-4",
                    children: "Services That Drive Success",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-xl text-zinc-300 max-w-3xl mx-auto",
                    children:
                      "We combine creativity, technology, and strategy to deliver solutions that exceed expectations.",
                  },
                },
              ],
            },

            {
              type: "Grid",
              props: {
                columns: { sm: 1, md: 2, lg: 3 },
                gap: 8,
              },
              children: [
                // Service 1
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 hover:border-blue-500/50 transition-all duration-300 group relative overflow-hidden",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      },
                    },
                    {
                      type: "Box",
                      props: {
                        className: "relative p-8",
                      },
                      children: [
                        {
                          type: "Box",
                          props: {
                            className:
                              "w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
                          },
                          children: [
                            {
                              type: "Text",
                              props: {
                                className: "text-3xl",
                                children: "🎨",
                              },
                            },
                          ],
                        },
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className:
                              "text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors",
                            children: "UI/UX Design",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-400 mb-6",
                            children:
                              "Crafting intuitive, beautiful interfaces that users love. We focus on creating seamless experiences that convert visitors into customers.",
                          },
                        },
                        {
                          type: "Badge",
                          props: {
                            variant: "secondary",
                            className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                            children: "Learn More →",
                          },
                        },
                      ],
                    },
                  ],
                },

                // Service 2
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      },
                    },
                    {
                      type: "Box",
                      props: {
                        className: "relative p-8",
                      },
                      children: [
                        {
                          type: "Box",
                          props: {
                            className:
                              "w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
                          },
                          children: [
                            {
                              type: "Text",
                              props: {
                                className: "text-3xl",
                                children: "⚡",
                              },
                            },
                          ],
                        },
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className:
                              "text-2xl font-semibold mb-4 group-hover:text-purple-400 transition-colors",
                            children: "Development",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-400 mb-6",
                            children:
                              "Building blazing-fast, scalable applications with the latest technologies. From web to mobile, we deliver exceptional performance.",
                          },
                        },
                        {
                          type: "Badge",
                          props: {
                            variant: "secondary",
                            className: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                            children: "Learn More →",
                          },
                        },
                      ],
                    },
                  ],
                },

                // Service 3
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 hover:border-pink-500/50 transition-all duration-300 group relative overflow-hidden",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      },
                    },
                    {
                      type: "Box",
                      props: {
                        className: "relative p-8",
                      },
                      children: [
                        {
                          type: "Box",
                          props: {
                            className:
                              "w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
                          },
                          children: [
                            {
                              type: "Text",
                              props: {
                                className: "text-3xl",
                                children: "📈",
                              },
                            },
                          ],
                        },
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className:
                              "text-2xl font-semibold mb-4 group-hover:text-pink-400 transition-colors",
                            children: "Marketing",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-400 mb-6",
                            children:
                              "Strategic digital marketing that drives real results. SEO, SEM, social media, and content strategies that grow your business.",
                          },
                        },
                        {
                          type: "Badge",
                          props: {
                            variant: "secondary",
                            className: "bg-pink-500/10 text-pink-400 border-pink-500/20",
                            children: "Learn More →",
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

    // Stats Section
    {
      type: "Box",
      props: {
        className: "py-24 bg-black relative overflow-hidden",
      },
      children: [
        // Background decoration
        {
          type: "Box",
          props: {
            className:
              "absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:32px_32px]",
          },
        },
        {
          type: "Container",
          props: {
            className: "relative z-10",
          },
          children: [
            {
              type: "Grid",
              props: {
                columns: { sm: 2, md: 4 },
                gap: 8,
              },
              children: [
                {
                  type: "Box",
                  props: {
                    className: "text-center",
                  },
                  children: [
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",
                        children: "150+",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Projects Completed",
                      },
                    },
                  ],
                },
                {
                  type: "Box",
                  props: {
                    className: "text-center",
                  },
                  children: [
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
                        children: "50+",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Happy Clients",
                      },
                    },
                  ],
                },
                {
                  type: "Box",
                  props: {
                    className: "text-center",
                  },
                  children: [
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent",
                        children: "12+",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Team Members",
                      },
                    },
                  ],
                },
                {
                  type: "Box",
                  props: {
                    className: "text-center",
                  },
                  children: [
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent",
                        children: "5+",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-400",
                        children: "Years Experience",
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

    // Testimonials Section
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
                      "mb-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-pink-500/20",
                    children: "Testimonials",
                  },
                },
                {
                  type: "Heading",
                  props: {
                    level: 2,
                    className: "text-4xl md:text-5xl font-bold mb-4",
                    children: "What Our Clients Say",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-xl text-zinc-300 max-w-3xl mx-auto",
                    children:
                      "Don't just take our word for it. Here's what our clients have to say about working with us.",
                  },
                },
              ],
            },

            {
              type: "Grid",
              props: {
                columns: { sm: 1, md: 2, lg: 3 },
                gap: 8,
              },
              children: [
                // Testimonial 1
                {
                  type: "Card",
                  props: {
                    className: "bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 p-8",
                  },
                  children: [
                    {
                      type: "Flex",
                      props: {
                        gap: 1,
                        className: "mb-4",
                      },
                      children: [
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                      ],
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-300 mb-6 italic",
                        children:
                          '"Working with this team has been transformative for our business. They delivered beyond our expectations and continue to support our growth."',
                      },
                    },
                    {
                      type: "Flex",
                      props: {
                        gap: 4,
                        className: "items-center",
                      },
                      children: [
                        {
                          type: "Avatar",
                          props: {
                            className: "bg-gradient-to-br from-blue-500 to-purple-600",
                            children: "JD",
                          },
                        },
                        {
                          type: "Box",
                          children: [
                            {
                              type: "Text",
                              props: {
                                className: "font-semibold",
                                children: "John Doe",
                              },
                            },
                            {
                              type: "Text",
                              props: {
                                className: "text-sm text-zinc-500",
                                children: "CEO, TechCorp",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                // Testimonial 2
                {
                  type: "Card",
                  props: {
                    className: "bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 p-8",
                  },
                  children: [
                    {
                      type: "Flex",
                      props: {
                        gap: 1,
                        className: "mb-4",
                      },
                      children: [
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                      ],
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-300 mb-6 italic",
                        children:
                          '"The level of creativity and technical expertise is unmatched. They turned our vision into reality with stunning results."',
                      },
                    },
                    {
                      type: "Flex",
                      props: {
                        gap: 4,
                        className: "items-center",
                      },
                      children: [
                        {
                          type: "Avatar",
                          props: {
                            className: "bg-gradient-to-br from-purple-500 to-pink-600",
                            children: "SJ",
                          },
                        },
                        {
                          type: "Box",
                          children: [
                            {
                              type: "Text",
                              props: {
                                className: "font-semibold",
                                children: "Sarah Johnson",
                              },
                            },
                            {
                              type: "Text",
                              props: {
                                className: "text-sm text-zinc-500",
                                children: "Marketing Director, Innovate Inc",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                // Testimonial 3
                {
                  type: "Card",
                  props: {
                    className: "bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 p-8",
                  },
                  children: [
                    {
                      type: "Flex",
                      props: {
                        gap: 1,
                        className: "mb-4",
                      },
                      children: [
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                        { type: "Text", props: { className: "text-yellow-500", children: "★" } },
                      ],
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-300 mb-6 italic",
                        children:
                          '"Professional, innovative, and results-driven. They\'ve been instrumental in our digital transformation journey."',
                      },
                    },
                    {
                      type: "Flex",
                      props: {
                        gap: 4,
                        className: "items-center",
                      },
                      children: [
                        {
                          type: "Avatar",
                          props: {
                            className: "bg-gradient-to-br from-pink-500 to-yellow-600",
                            children: "MC",
                          },
                        },
                        {
                          type: "Box",
                          children: [
                            {
                              type: "Text",
                              props: {
                                className: "font-semibold",
                                children: "Michael Chen",
                              },
                            },
                            {
                              type: "Text",
                              props: {
                                className: "text-sm text-zinc-500",
                                children: "Founder, StartupX",
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

    // CTA Section
    {
      type: "Box",
      props: {
        className: "py-24 bg-zinc-950",
      },
      children: [
        {
          type: "Container",
          children: [
            {
              type: "Box",
              props: {
                className:
                  "relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950 border border-purple-500/20 p-16 text-center",
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
                          "absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full filter blur-[150px]",
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
                        children: "Ready to Start Your Project?",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-xl text-zinc-300 mb-8 max-w-2xl mx-auto",
                        children:
                          "Let's create something amazing together. Get in touch with our team and let's discuss your next digital masterpiece.",
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
                              "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-purple-500/25",
                            children: "Get Started Now",
                          },
                        },
                        {
                          type: "Button",
                          props: {
                            variant: "outline",
                            size: "lg",
                            className: "backdrop-blur-sm bg-white/5",
                            children: "Schedule a Call",
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
