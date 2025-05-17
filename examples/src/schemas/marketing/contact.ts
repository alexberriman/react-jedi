import { header } from "./shared/header";
import { footer } from "./shared/footer";

export const marketingContactSchema = {
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
          "relative py-24 px-6 overflow-hidden bg-gradient-to-br from-pink-950 via-purple-950 to-blue-950",
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
                  "absolute top-0 left-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full filter blur-[150px]",
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
                    children: "Get In Touch",
                  },
                },
                {
                  type: "Heading",
                  props: {
                    level: 1,
                    className:
                      "text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400",
                    children: "Let's Create Together",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-xl md:text-2xl text-zinc-300 mb-8",
                    children:
                      "Have a project in mind? We'd love to hear about it. Reach out and let's build something extraordinary.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // Contact Form Section
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
                columns: { sm: 1, lg: 2 },
                gap: 16,
              },
              children: [
                // Contact Form
                {
                  type: "Box",
                  children: [
                    {
                      type: "Card",
                      props: {
                        className: "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 p-8",
                      },
                      children: [
                        {
                          type: "Heading",
                          props: {
                            level: 2,
                            className: "text-3xl font-bold mb-6",
                            children: "Send Us a Message",
                          },
                        },
                        {
                          type: "Form",
                          children: [
                            {
                              type: "Stack",
                              props: {
                                gap: 6,
                              },
                              children: [
                                {
                                  type: "Box",
                                  props: {
                                    className: "grid md:grid-cols-2 gap-6",
                                  },
                                  children: [
                                    {
                                      type: "Box",
                                      children: [
                                        {
                                          type: "Label",
                                          props: {
                                            htmlFor: "firstName",
                                            className: "text-sm font-medium mb-2 block",
                                            children: "First Name",
                                          },
                                        },
                                        {
                                          type: "Input",
                                          props: {
                                            id: "firstName",
                                            placeholder: "John",
                                            className: "bg-zinc-900/50 border-zinc-800",
                                          },
                                        },
                                      ],
                                    },
                                    {
                                      type: "Box",
                                      children: [
                                        {
                                          type: "Label",
                                          props: {
                                            htmlFor: "lastName",
                                            className: "text-sm font-medium mb-2 block",
                                            children: "Last Name",
                                          },
                                        },
                                        {
                                          type: "Input",
                                          props: {
                                            id: "lastName",
                                            placeholder: "Doe",
                                            className: "bg-zinc-900/50 border-zinc-800",
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  children: [
                                    {
                                      type: "Label",
                                      props: {
                                        htmlFor: "email",
                                        className: "text-sm font-medium mb-2 block",
                                        children: "Email",
                                      },
                                    },
                                    {
                                      type: "Input",
                                      props: {
                                        id: "email",
                                        type: "email",
                                        placeholder: "john@example.com",
                                        className: "bg-zinc-900/50 border-zinc-800",
                                      },
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  children: [
                                    {
                                      type: "Label",
                                      props: {
                                        htmlFor: "company",
                                        className: "text-sm font-medium mb-2 block",
                                        children: "Company",
                                      },
                                    },
                                    {
                                      type: "Input",
                                      props: {
                                        id: "company",
                                        placeholder: "Your Company",
                                        className: "bg-zinc-900/50 border-zinc-800",
                                      },
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  children: [
                                    {
                                      type: "Label",
                                      props: {
                                        htmlFor: "service",
                                        className: "text-sm font-medium mb-2 block",
                                        children: "Service Interested In",
                                      },
                                    },
                                    {
                                      type: "Select",
                                      props: {
                                        id: "service",
                                        className: "bg-zinc-900/50 border-zinc-800",
                                      },
                                      children: [
                                        {
                                          type: "option",
                                          props: {
                                            value: "",
                                            children: "Select a service",
                                          },
                                        },
                                        {
                                          type: "option",
                                          props: {
                                            value: "design",
                                            children: "UI/UX Design",
                                          },
                                        },
                                        {
                                          type: "option",
                                          props: {
                                            value: "development",
                                            children: "Web Development",
                                          },
                                        },
                                        {
                                          type: "option",
                                          props: {
                                            value: "marketing",
                                            children: "Digital Marketing",
                                          },
                                        },
                                        {
                                          type: "option",
                                          props: {
                                            value: "consulting",
                                            children: "Consulting",
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  children: [
                                    {
                                      type: "Label",
                                      props: {
                                        htmlFor: "message",
                                        className: "text-sm font-medium mb-2 block",
                                        children: "Message",
                                      },
                                    },
                                    {
                                      type: "Textarea",
                                      props: {
                                        id: "message",
                                        placeholder: "Tell us about your project...",
                                        rows: 6,
                                        className: "bg-zinc-900/50 border-zinc-800",
                                      },
                                    },
                                  ],
                                },
                                {
                                  type: "Button",
                                  props: {
                                    variant: "default",
                                    size: "lg",
                                    className:
                                      "w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-0",
                                    children: "Send Message",
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

                // Contact Information
                {
                  type: "Box",
                  children: [
                    {
                      type: "Stack",
                      props: {
                        gap: 8,
                      },
                      children: [
                        {
                          type: "Box",
                          children: [
                            {
                              type: "Heading",
                              props: {
                                level: 3,
                                className: "text-2xl font-semibold mb-4",
                                children: "Get in Touch",
                              },
                            },
                            {
                              type: "Text",
                              props: {
                                className: "text-zinc-300 mb-6",
                                children:
                                  "We're here to help bring your ideas to life. Reach out to us through any of the channels below.",
                              },
                            },
                          ],
                        },

                        // Contact Methods
                        {
                          type: "Stack",
                          props: {
                            gap: 6,
                          },
                          children: [
                            {
                              type: "Card",
                              props: {
                                className: "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 p-6",
                              },
                              children: [
                                {
                                  type: "Flex",
                                  props: {
                                    gap: 4,
                                    className: "items-start",
                                  },
                                  children: [
                                    {
                                      type: "Box",
                                      props: {
                                        className:
                                          "w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0",
                                      },
                                      children: [
                                        {
                                          type: "Text",
                                          props: {
                                            className: "text-purple-400",
                                            children: "📧",
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
                                            className: "font-semibold mb-1",
                                            children: "Email",
                                          },
                                        },
                                        {
                                          type: "Text",
                                          props: {
                                            className: "text-zinc-400",
                                            children: "hello@nexusdigital.com",
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },

                            {
                              type: "Card",
                              props: {
                                className: "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 p-6",
                              },
                              children: [
                                {
                                  type: "Flex",
                                  props: {
                                    gap: 4,
                                    className: "items-start",
                                  },
                                  children: [
                                    {
                                      type: "Box",
                                      props: {
                                        className:
                                          "w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0",
                                      },
                                      children: [
                                        {
                                          type: "Text",
                                          props: {
                                            className: "text-blue-400",
                                            children: "📱",
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
                                            className: "font-semibold mb-1",
                                            children: "Phone",
                                          },
                                        },
                                        {
                                          type: "Text",
                                          props: {
                                            className: "text-zinc-400",
                                            children: "+1 (555) 123-4567",
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },

                            {
                              type: "Card",
                              props: {
                                className: "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 p-6",
                              },
                              children: [
                                {
                                  type: "Flex",
                                  props: {
                                    gap: 4,
                                    className: "items-start",
                                  },
                                  children: [
                                    {
                                      type: "Box",
                                      props: {
                                        className:
                                          "w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0",
                                      },
                                      children: [
                                        {
                                          type: "Text",
                                          props: {
                                            className: "text-pink-400",
                                            children: "📍",
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
                                            className: "font-semibold mb-1",
                                            children: "Office",
                                          },
                                        },
                                        {
                                          type: "Text",
                                          props: {
                                            className: "text-zinc-400",
                                            children: "123 Innovation Avenue",
                                          },
                                        },
                                        {
                                          type: "Text",
                                          props: {
                                            className: "text-zinc-400",
                                            children: "San Francisco, CA 94110",
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

                        // Social Links
                        {
                          type: "Box",
                          children: [
                            {
                              type: "Text",
                              props: {
                                className: "font-semibold mb-4",
                                children: "Follow Us",
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
                                      "w-12 h-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition-colors",
                                  },
                                  children: [
                                    {
                                      type: "Text",
                                      props: {
                                        className: "text-zinc-400 hover:text-purple-400",
                                        children: "f",
                                      },
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  props: {
                                    className:
                                      "w-12 h-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors",
                                  },
                                  children: [
                                    {
                                      type: "Text",
                                      props: {
                                        className: "text-zinc-400 hover:text-blue-400",
                                        children: "t",
                                      },
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  props: {
                                    className:
                                      "w-12 h-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center cursor-pointer hover:border-pink-500/50 transition-colors",
                                  },
                                  children: [
                                    {
                                      type: "Text",
                                      props: {
                                        className: "text-zinc-400 hover:text-pink-400",
                                        children: "in",
                                      },
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  props: {
                                    className:
                                      "w-12 h-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition-colors",
                                  },
                                  children: [
                                    {
                                      type: "Text",
                                      props: {
                                        className: "text-zinc-400 hover:text-purple-400",
                                        children: "d",
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
      ],
    },

    // Map Section
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
                className: "text-center mb-12",
              },
              children: [
                {
                  type: "Heading",
                  props: {
                    level: 2,
                    className: "text-3xl font-bold mb-4",
                    children: "Visit Our Office",
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-zinc-300",
                    children: "We're located in the heart of San Francisco's innovation district",
                  },
                },
              ],
            },
            {
              type: "Box",
              props: {
                className: "relative h-[400px] rounded-3xl overflow-hidden",
              },
              children: [
                {
                  type: "Image",
                  props: {
                    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2000",
                    alt: "San Francisco skyline",
                    className: "object-cover w-full h-full",
                  },
                },
                {
                  type: "Box",
                  props: {
                    className:
                      "absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent",
                  },
                },
                {
                  type: "Box",
                  props: {
                    className: "absolute bottom-0 left-0 p-8",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "bg-zinc-900/90 backdrop-blur-sm rounded-2xl p-6 max-w-md",
                      },
                      children: [
                        {
                          type: "Heading",
                          props: {
                            level: 3,
                            className: "text-xl font-semibold mb-2",
                            children: "Nexus Digital Headquarters",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-300",
                            children: "123 Innovation Avenue, San Francisco, CA 94110",
                          },
                        },
                        {
                          type: "Text",
                          props: {
                            className: "text-zinc-400 text-sm mt-2",
                            children: "Monday - Friday: 9:00 AM - 6:00 PM PST",
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
