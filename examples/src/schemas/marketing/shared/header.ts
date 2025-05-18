export const header = {
  type: "Box",
  props: {
    as: "header",
    className:
      "fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800",
  },
  children: [
    {
      type: "Container",
      props: {
        className: "max-w-7xl mx-auto px-4",
      },
      children: [
        {
          type: "Box",
          props: {
            className: "relative h-16 flex items-center",
          },
          children: [
            // Logo (Left) - positioned absolutely
            {
              type: "Box",
              props: {
                as: "a",
                href: "/templates/marketing/home",
                className: "absolute left-0 no-underline",
              },
              children: [
                {
                  type: "Heading",
                  props: {
                    level: 2,
                    className:
                      "text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
                    children: "Nexus Digital",
                  },
                },
              ],
            },

            // Navigation (Center) - centered with margin auto
            {
              type: "Box",
              props: {
                className: "hidden lg:flex mx-auto",
              },
              children: [
                {
                  type: "Flex",
                  props: {
                    gap: 8, // Space between nav items
                    className: "items-center",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "/templates/marketing/home",
                        className:
                          "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors no-underline px-3 py-2",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            children: "Home",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "/templates/marketing/about",
                        className:
                          "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors no-underline px-3 py-2",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            children: "About",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "/templates/marketing/services",
                        className:
                          "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors no-underline px-3 py-2",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            children: "Services",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "/templates/marketing/cases",
                        className:
                          "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors no-underline px-3 py-2",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            children: "Portfolio",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "/templates/marketing/pricing",
                        className:
                          "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors no-underline px-3 py-2",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            children: "Pricing",
                          },
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        as: "a",
                        href: "/templates/marketing/contact",
                        className:
                          "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors no-underline px-3 py-2",
                      },
                      children: [
                        {
                          type: "Text",
                          props: {
                            children: "Contact",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // CTA Button (Right) - positioned absolutely
            {
              type: "Box",
              props: {
                className: "absolute right-0",
              },
              children: [
                {
                  type: "Button",
                  props: {
                    variant: "default",
                    size: "md",
                    className:
                      "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white",
                    children: "Get Started",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};