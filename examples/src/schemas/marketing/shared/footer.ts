export const footer = (() => {
  const currentYear = new Date().getFullYear();
  return {
  type: "Box",
  props: {
    className: "py-16 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800",
  },
  children: [
    {
      type: "Container",
      children: [
        {
          type: "Grid",
          props: {
            columns: { sm: 1, md: 2, lg: 4 },
            gap: 8,
            className: "mb-12",
          },
          children: [
            // Company Info
            {
              type: "Box",
              children: [
                {
                  type: "Heading",
                  props: {
                    level: 3,
                    className:
                      "text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
                    children: "Nexus Digital",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-zinc-600 dark:text-zinc-400 mb-4",
                    children:
                      "Transforming visions into digital realities. We create exceptional experiences that drive business growth.",
                  },
                },
                {
                  type: "Flex",
                  props: {
                    gap: 4,
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-500/20 transition-colors",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-blue-600 dark:text-blue-400",
                            children: "f",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-500/20 transition-colors",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-purple-600 dark:text-purple-400",
                            children: "t",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className:
                          "w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/20 flex items-center justify-center cursor-pointer hover:bg-pink-200 dark:hover:bg-pink-500/20 transition-colors",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            className: "text-pink-600 dark:text-pink-400",
                            children: "in",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Services
            {
              type: "Box",
              children: [
                {
                  type: "Heading",
                  props: {
                    level: 4,
                    className: "text-lg font-semibold mb-4 text-zinc-900 dark:text-white",
                    children: "Services",
                  },
                },
                {
                  type: "Stack",
                  props: {
                    gap: 2,
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "#",
                        className:
                          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors no-underline",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "Web Design",
                        },
                      }],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "#",
                        className:
                          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors no-underline",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "Development",
                        },
                      }],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "#",
                        className:
                          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors no-underline",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "Marketing",
                        },
                      }],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "#",
                        className:
                          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors no-underline",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "Consulting",
                        },
                      }],
                    },
                  ],
                },
              ],
            },

            // Company
            {
              type: "Box",
              children: [
                {
                  type: "Heading",
                  props: {
                    level: 4,
                    className: "text-lg font-semibold mb-4 text-zinc-900 dark:text-white",
                    children: "Company",
                  },
                },
                {
                  type: "Stack",
                  props: {
                    gap: 2,
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "/templates/marketing/about",
                        className:
                          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors no-underline",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "About Us",
                        },
                      }],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "#",
                        className:
                          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors no-underline",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "Careers",
                        },
                      }],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "#",
                        className:
                          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors no-underline",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "Blog",
                        },
                      }],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "#",
                        className:
                          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors no-underline",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "Press",
                        },
                      }],
                    },
                  ],
                },
              ],
            },

            // Contact
            {
              type: "Box",
              children: [
                {
                  type: "Heading",
                  props: {
                    level: 4,
                    className: "text-lg font-semibold mb-4 text-zinc-900 dark:text-white",
                    children: "Contact",
                  },
                },
                {
                  type: "Stack",
                  props: {
                    gap: 2,
                  },
                  children: [
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-600 dark:text-zinc-400",
                        children: "hello@nexusdigital.com",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-600 dark:text-zinc-400",
                        children: "+1 (555) 123-4567",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-600 dark:text-zinc-400",
                        children: "123 Innovation Ave",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className: "text-zinc-600 dark:text-zinc-400",
                        children: "San Francisco, CA 94110",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // Bottom Bar
        {
          type: "Box",
          props: {
            className: "pt-8 border-t border-zinc-200 dark:border-zinc-800",
          },
          children: [
            {
              type: "Flex",
              props: {
                className: "flex-col md:flex-row justify-between items-center gap-4",
              },
              children: [
                {
                  type: "Text",
                  props: {
                    className: "text-zinc-500 text-sm",
                    children: `© ${currentYear} Nexus Digital. All rights reserved.`,
                  },
                },
                {
                  type: "Flex",
                  props: {
                    gap: 6,
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "#",
                        className:
                          "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors no-underline text-sm",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "Privacy Policy",
                        },
                      }],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "#",
                        className:
                          "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors no-underline text-sm",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "Terms of Service",
                        },
                      }],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "#",
                        className:
                          "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors no-underline text-sm",
                      },
                      children: [{
                        type: "Text",
                        props: {
                          children: "Cookie Policy",
                        },
                      }],
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
};
})();