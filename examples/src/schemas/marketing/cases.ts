import { header } from "./shared/header";
import { footer } from "./shared/footer";

export const marketingCasesSchema = {
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
          "relative py-24 px-6 overflow-hidden bg-gradient-to-br from-yellow-950 via-orange-950 to-red-950",
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
                  "absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/20 rounded-full filter blur-[150px]",
              },
            },
            {
              type: "Box",
              props: {
                className:
                  "absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/20 rounded-full filter blur-[150px]",
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
                    children: "Case Studies",
                  },
                },
                {
                  type: "Heading",
                  props: {
                    level: 1,
                    className:
                      "text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400",
                    children: "Success Stories That Inspire",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-xl md:text-2xl text-zinc-300 mb-8",
                    children:
                      "Explore how we've helped businesses transform their digital presence and achieve remarkable results.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // Case Studies Grid
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
                columns: { sm: 1, md: 2, lg: 3 },
                gap: 8,
              },
              children: [
                // Case Study 1
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 overflow-hidden group hover:border-yellow-500/50 transition-all duration-300",
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
                            src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000",
                            alt: "TechStart case study",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-500",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
                          },
                        },
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-sm border-yellow-500/50",
                            children: "E-commerce",
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
                            className: "text-2xl font-semibold mb-3",
                            children: "TechStart Marketplace",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 mb-4",
                            children:
                              "Revolutionizing online tech shopping with a modern, user-centric platform that increased conversions by 240%.",
                          },
                        },
                        {
                          type: "Flex",
                          props: {
                            gap: 4,
                            className: "mb-4",
                          },
                          children: [
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                                children: "UI/UX Design",
                              },
                            },
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                                children: "Development",
                              },
                            },
                          ],
                        },
                        {
                          type: "Box",
                          props: {
                            className: "grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800",
                          },
                          children: [
                            {
                              type: "Box",
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-2xl font-bold text-yellow-400",
                                    children: "240%",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Conversion Increase",
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
                                    className: "text-2xl font-bold text-orange-400",
                                    children: "3.2M",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Monthly Visitors",
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

                // Case Study 2
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 overflow-hidden group hover:border-orange-500/50 transition-all duration-300",
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
                            src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1000",
                            alt: "HealthFlow case study",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-500",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
                          },
                        },
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-sm border-orange-500/50",
                            children: "Healthcare",
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
                            className: "text-2xl font-semibold mb-3",
                            children: "HealthFlow App",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 mb-4",
                            children:
                              "Transforming patient care with an intuitive mobile app that streamlined healthcare management for millions.",
                          },
                        },
                        {
                          type: "Flex",
                          props: {
                            gap: 4,
                            className: "mb-4",
                          },
                          children: [
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                                children: "Mobile Dev",
                              },
                            },
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-green-500/10 text-green-400 border-green-500/20",
                                children: "UX Design",
                              },
                            },
                          ],
                        },
                        {
                          type: "Box",
                          props: {
                            className: "grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800",
                          },
                          children: [
                            {
                              type: "Box",
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-2xl font-bold text-blue-400",
                                    children: "2.5M",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Active Users",
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
                                    className: "text-2xl font-bold text-green-400",
                                    children: "4.8★",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "App Store Rating",
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

                // Case Study 3
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 overflow-hidden group hover:border-red-500/50 transition-all duration-300",
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
                            src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000",
                            alt: "FinanceHub case study",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-500",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
                          },
                        },
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-sm border-red-500/50",
                            children: "FinTech",
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
                            className: "text-2xl font-semibold mb-3",
                            children: "FinanceHub Platform",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 mb-4",
                            children:
                              "Redefining digital banking with a secure, innovative platform that simplified financial management for businesses.",
                          },
                        },
                        {
                          type: "Flex",
                          props: {
                            gap: 4,
                            className: "mb-4",
                          },
                          children: [
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                                children: "Web Platform",
                              },
                            },
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                                children: "Security",
                              },
                            },
                          ],
                        },
                        {
                          type: "Box",
                          props: {
                            className: "grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800",
                          },
                          children: [
                            {
                              type: "Box",
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-2xl font-bold text-purple-400",
                                    children: "500K",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Business Accounts",
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
                                    className: "text-2xl font-bold text-indigo-400",
                                    children: "$2.3B",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Processed Daily",
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

                // Case Study 4
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
                            src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000",
                            alt: "EduLearn case study",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-500",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
                          },
                        },
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-sm border-pink-500/50",
                            children: "EdTech",
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
                            className: "text-2xl font-semibold mb-3",
                            children: "EduLearn Academy",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 mb-4",
                            children:
                              "Empowering education with an interactive learning platform that connected millions of students worldwide.",
                          },
                        },
                        {
                          type: "Flex",
                          props: {
                            gap: 4,
                            className: "mb-4",
                          },
                          children: [
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-pink-500/10 text-pink-400 border-pink-500/20",
                                children: "E-Learning",
                              },
                            },
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                                children: "Platform",
                              },
                            },
                          ],
                        },
                        {
                          type: "Box",
                          props: {
                            className: "grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800",
                          },
                          children: [
                            {
                              type: "Box",
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-2xl font-bold text-pink-400",
                                    children: "5M+",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Students",
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
                                    className: "text-2xl font-bold text-purple-400",
                                    children: "95%",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Satisfaction Rate",
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

                // Case Study 5
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 overflow-hidden group hover:border-green-500/50 transition-all duration-300",
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
                            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000",
                            alt: "GreenTech case study",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-500",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
                          },
                        },
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-sm border-green-500/50",
                            children: "Sustainability",
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
                            className: "text-2xl font-semibold mb-3",
                            children: "GreenTech Solutions",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 mb-4",
                            children:
                              "Leading the green revolution with a platform that connected eco-conscious consumers with sustainable brands.",
                          },
                        },
                        {
                          type: "Flex",
                          props: {
                            gap: 4,
                            className: "mb-4",
                          },
                          children: [
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-green-500/10 text-green-400 border-green-500/20",
                                children: "Marketplace",
                              },
                            },
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                                children: "Mobile App",
                              },
                            },
                          ],
                        },
                        {
                          type: "Box",
                          props: {
                            className: "grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800",
                          },
                          children: [
                            {
                              type: "Box",
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-2xl font-bold text-green-400",
                                    children: "10K+",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Eco Brands",
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
                                    className: "text-2xl font-bold text-blue-400",
                                    children: "1M+",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Monthly Users",
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

                // Case Study 6
                {
                  type: "Card",
                  props: {
                    className:
                      "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 overflow-hidden group hover:border-yellow-500/50 transition-all duration-300",
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
                            src: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000",
                            alt: "MediaFlow case study",
                            className:
                              "object-cover w-full h-full group-hover:scale-110 transition-transform duration-500",
                          },
                        },
                        {
                          type: "Box",
                          props: {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
                          },
                        },
                        {
                          type: "Badge",
                          props: {
                            variant: "outline",
                            className:
                              "absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-sm border-yellow-500/50",
                            children: "Media",
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
                            className: "text-2xl font-semibold mb-3",
                            children: "MediaFlow Studio",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300 mb-4",
                            children:
                              "Revolutionizing content creation with AI-powered tools that streamlined video production for creators worldwide.",
                          },
                        },
                        {
                          type: "Flex",
                          props: {
                            gap: 4,
                            className: "mb-4",
                          },
                          children: [
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                                children: "AI Tools",
                              },
                            },
                            {
                              type: "Badge",
                              props: {
                                variant: "secondary",
                                className: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                                children: "Creator Platform",
                              },
                            },
                          ],
                        },
                        {
                          type: "Box",
                          props: {
                            className: "grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800",
                          },
                          children: [
                            {
                              type: "Box",
                              children: [
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-2xl font-bold text-yellow-400",
                                    children: "500K",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Creators",
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
                                    className: "text-2xl font-bold text-orange-400",
                                    children: "50M+",
                                  },
                                },
                                {
                                  type: "Text",
                                  props: {
                                    className: "text-sm text-zinc-400",
                                    children: "Videos Generated",
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

    // CTA Section
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
                className:
                  "relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-950 via-orange-950 to-red-950 border border-orange-500/20 p-16 text-center",
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
                          "absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500/20 rounded-full filter blur-[150px]",
                      },
                    },
                    {
                      type: "Box",
                      props: {
                        className:
                          "absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-500/20 rounded-full filter blur-[150px]",
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
                        children: "Your Success Story Awaits",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-xl text-zinc-300 mb-8 max-w-2xl mx-auto",
                        children:
                          "Join the ranks of businesses that have transformed their digital presence. Let's write your success story together.",
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
                              "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 border-0 shadow-lg shadow-orange-500/25",
                            children: "Start Your Journey",
                          },
                        },
                        {
                          type: "Button",
                          props: {
                            variant: "outline",
                            size: "lg",
                            className: "backdrop-blur-sm bg-white/5",
                            children: "Read More Stories",
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
