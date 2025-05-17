export const header = {
  type: "Box",
  props: {
    className: "fixed top-0 w-full z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800",
  },
  children: [
    {
      type: "Container",
      children: [
        {
          type: "Flex",
          props: {
            className: "h-20 items-center justify-between",
          },
          children: [
            // Logo
            {
              type: "Heading",
              props: {
                level: 2,
                className:
                  "text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",
                children: "Nexus Digital",
              },
            },

            // Navigation
            {
              type: "Box",
              props: {
                className: "hidden lg:block",
              },
              children: [
                {
                  type: "Flex",
                  props: {
                    gap: 8,
                    className: "items-center",
                  },
                  children: [
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-zinc-300 hover:text-white transition-colors cursor-pointer",
                        children: "Home",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-zinc-300 hover:text-white transition-colors cursor-pointer",
                        children: "About",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-zinc-300 hover:text-white transition-colors cursor-pointer",
                        children: "Services",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-zinc-300 hover:text-white transition-colors cursor-pointer",
                        children: "Portfolio",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-zinc-300 hover:text-white transition-colors cursor-pointer",
                        children: "Pricing",
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        className:
                          "text-zinc-300 hover:text-white transition-colors cursor-pointer",
                        children: "Contact",
                      },
                    },
                  ],
                },
              ],
            },

            // CTA Button
            {
              type: "Button",
              props: {
                variant: "default",
                size: "sm",
                className:
                  "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0",
                children: "Get Started",
              },
            },
          ],
        },
      ],
    },
  ],
};
