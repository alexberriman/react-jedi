import { render, useTheme, type UISpecification } from "@alexberriman/react-jedi";

export const CenterShowcase = () => {
  const { theme } = useTheme();

  const showcaseSpec: UISpecification = {
    type: "Container",
    maxWidth: "xl",
    children: [
      {
        type: "Heading",
        level: 1,
        className: "text-4xl font-bold mb-8",
        children: [{ type: "Text", children: "Center Component Showcase" }],
      },

      // Basic centering
      {
        type: "Box",
        className: "mb-12",
        children: [
          {
            type: "Heading",
            level: 2,
            className: "text-2xl font-semibold mb-4",
            children: [{ type: "Text", children: "Basic Centering" }],
          },
          {
            type: "Center",
            className: "h-64 bg-gray-100 rounded-lg mb-4",
            children: [
              {
                type: "Box",
                className: "p-6 bg-white rounded-lg shadow-lg",
                children: [
                  {
                    type: "Text",
                    className: "text-lg font-medium",
                    children: "Perfectly centered content",
                  },
                ],
              },
            ],
          },
        ],
      },

      // Horizontal only
      {
        type: "Box",
        className: "mb-12",
        children: [
          {
            type: "Heading",
            level: 2,
            className: "text-2xl font-semibold mb-4",
            children: [{ type: "Text", children: "Horizontal Only" }],
          },
          {
            type: "Center",
            direction: "horizontal",
            className: "h-32 bg-blue-50 rounded-lg mb-4",
            children: [
              {
                type: "Badge",
                variant: "default",
                children: "Horizontally Centered",
              },
            ],
          },
        ],
      },

      // Vertical only
      {
        type: "Box",
        className: "mb-12",
        children: [
          {
            type: "Heading",
            level: 2,
            className: "text-2xl font-semibold mb-4",
            children: [{ type: "Text", children: "Vertical Only" }],
          },
          {
            type: "Center",
            direction: "vertical",
            className: "h-32 bg-green-50 rounded-lg mb-4",
            children: [
              {
                type: "Text",
                className: "text-green-700 font-medium",
                children: "Vertically Centered",
              },
            ],
          },
        ],
      },

      // Multiple elements
      {
        type: "Box",
        className: "mb-12",
        children: [
          {
            type: "Heading",
            level: 2,
            className: "text-2xl font-semibold mb-4",
            children: [{ type: "Text", children: "Multiple Elements" }],
          },
          {
            type: "Center",
            className: "h-96 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg",
            children: [
              {
                type: "Box",
                className: "text-center",
                children: [
                  {
                    type: "Box",
                    className:
                      "w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6",
                  },
                  {
                    type: "Heading",
                    level: 3,
                    className: "text-2xl font-bold mb-3",
                    children: [{ type: "Text", children: "Welcome!" }],
                  },
                  {
                    type: "Text",
                    className: "text-gray-600 mb-6 max-w-sm",
                    children:
                      "Center multiple elements with perfect alignment for stunning visual hierarchy",
                  },
                  {
                    type: "Button",
                    size: "lg",
                    className:
                      "bg-gradient-to-r from-purple-600 to-pink-600 text-zinc-900 dark:text-white hover:shadow-lg transition-shadow",
                    children: "Get Started",
                  },
                ],
              },
            ],
          },
        ],
      },

      // Nested Centers
      {
        type: "Box",
        className: "mb-12",
        children: [
          {
            type: "Heading",
            level: 2,
            className: "text-2xl font-semibold mb-4",
            children: [{ type: "Text", children: "Nested Centers" }],
          },
          {
            type: "Grid",
            cols: 2,
            gap: 4,
            children: [
              {
                type: "Center",
                className: "h-48 bg-blue-100 rounded-lg",
                children: [
                  {
                    type: "Center",
                    className: "w-32 h-32 bg-blue-500 rounded-lg",
                    children: [
                      {
                        type: "Text",
                        className: "text-zinc-900 dark:text-white font-medium",
                        children: "Nested",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Center",
                className: "h-48 bg-green-100 rounded-lg",
                children: [
                  {
                    type: "Center",
                    className: "w-32 h-32 bg-green-500 rounded-lg",
                    children: [
                      {
                        type: "Text",
                        className: "text-zinc-900 dark:text-white font-medium",
                        children: "Center",
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

  return (
    <div className="min-h-screen bg-white transition-colors">{render(showcaseSpec, { theme })}</div>
  );
};
