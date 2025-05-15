export const landingPageSchema = {
  type: "box",
  props: {
    className: "w-full min-h-screen"
  },
  children: [
    // Hero Section
    {
      type: "box",
      props: {
        className: "relative py-24 px-6 overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/40"
      },
      children: [
        // Background elements
        {
          type: "box",
          props: {
            className: "absolute inset-0 z-0"
          },
          children: [
            {
              type: "box",
              props: {
                className: "absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"
              }
            },
            {
              type: "box",
              props: {
                className: "absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl"
              }
            },
            {
              type: "box",
              props: {
                className: "absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-pink-500/10 rounded-full filter blur-3xl"
              }
            }
          ]
        },
        // Content
        {
          type: "container",
          props: {
            className: "relative z-10 text-center"
          },
          children: [
            {
              type: "heading",
              props: {
                level: 1,
                className: "text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400",
                children: "SkyScape Studios"
              }
            },
            {
              type: "text",
              props: {
                className: "text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto",
                children: "Creating immersive digital experiences that captivate and inspire."
              }
            },
            {
              type: "box",
              props: {
                className: "flex flex-wrap justify-center gap-4"
              },
              children: [
                {
                  type: "button",
                  props: {
                    variant: "default",
                    size: "lg",
                    className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0",
                    children: "Our Portfolio"
                  }
                },
                {
                  type: "button",
                  props: {
                    variant: "outline",
                    size: "lg",
                    className: "backdrop-blur-sm",
                    children: "Contact Us"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    
    // About Section
    {
      type: "box",
      props: {
        className: "py-24 bg-zinc-900"
      },
      children: [
        {
          type: "container",
          children: [
            {
              type: "grid",
              props: {
                columns: { sm: 1, md: 2 },
                gap: 16,
                className: "items-center"
              },
              children: [
                {
                  type: "box",
                  children: [
                    {
                      type: "heading",
                      props: {
                        level: 2,
                        className: "text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400",
                        children: "Crafting Digital Dreams Since 2020"
                      }
                    },
                    {
                      type: "text",
                      props: {
                        className: "text-zinc-300 mb-6",
                        children: "SkyScape Studios is a creative digital agency specializing in web design, 3D animation, and immersive experiences. We blend cutting-edge technology with artistic vision to create unforgettable digital journeys."
                      }
                    },
                    {
                      type: "text",
                      props: {
                        className: "text-zinc-300 mb-8",
                        children: "Our team of designers, developers, and creative thinkers work together to push the boundaries of what's possible in the digital realm."
                      }
                    },
                    {
                      type: "button",
                      props: {
                        variant: "outline",
                        children: "Learn More About Us"
                      }
                    }
                  ]
                },
                {
                  type: "box",
                  props: {
                    className: "relative h-[400px] rounded-2xl overflow-hidden"
                  },
                  children: [
                    {
                      type: "image",
                      props: {
                        src: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1000",
                        alt: "Creative studio space",
                        className: "object-cover rounded-2xl",
                        width: 600,
                        height: 400
                      }
                    },
                    {
                      type: "box",
                      props: {
                        className: "absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    
    // Features Section
    {
      type: "box",
      props: {
        className: "py-24 bg-gradient-to-b from-zinc-900 to-zinc-950"
      },
      children: [
        {
          type: "container",
          children: [
            {
              type: "box",
              props: {
                className: "text-center mb-16"
              },
              children: [
                {
                  type: "heading",
                  props: {
                    level: 2,
                    className: "text-4xl font-bold mb-4",
                    children: "Our Services"
                  }
                },
                {
                  type: "text",
                  props: {
                    className: "text-xl text-zinc-300 max-w-3xl mx-auto",
                    children: "From concept to completion, we provide end-to-end creative solutions."
                  }
                }
              ]
            },
            {
              type: "grid",
              props: {
                columns: { sm: 1, md: 2, lg: 3 },
                gap: 8
              },
              children: [
                // Feature 1
                {
                  type: "card",
                  props: {
                    className: "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-indigo-500/50 transition-colors group overflow-hidden"
                  },
                  children: [
                    {
                      type: "box",
                      props: {
                        className: "p-6"
                      },
                      children: [
                        {
                          type: "box",
                          props: {
                            className: "w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:bg-indigo-500/30 transition-colors"
                          },
                          children: [
                            {
                              type: "text",
                              props: {
                                className: "text-2xl text-indigo-400",
                                children: "✨"
                              }
                            }
                          ]
                        },
                        {
                          type: "heading",
                          props: {
                            level: 3,
                            className: "text-xl font-semibold mb-3",
                            children: "Web Design & Development"
                          }
                        },
                        {
                          type: "text",
                          props: {
                            className: "text-zinc-400",
                            children: "Beautiful, responsive websites that engage users and drive conversions. We use cutting-edge technologies to create seamless experiences."
                          }
                        }
                      ]
                    }
                  ]
                },
                // Feature 2
                {
                  type: "card",
                  props: {
                    className: "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-purple-500/50 transition-colors group overflow-hidden"
                  },
                  children: [
                    {
                      type: "box",
                      props: {
                        className: "p-6"
                      },
                      children: [
                        {
                          type: "box",
                          props: {
                            className: "w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors"
                          },
                          children: [
                            {
                              type: "text",
                              props: {
                                className: "text-2xl text-purple-400",
                                children: "🎨"
                              }
                            }
                          ]
                        },
                        {
                          type: "heading",
                          props: {
                            level: 3,
                            className: "text-xl font-semibold mb-3",
                            children: "3D Visualization"
                          }
                        },
                        {
                          type: "text",
                          props: {
                            className: "text-zinc-400",
                            children: "Stunning 3D models and animations that bring your ideas to life. Perfect for product showcases, architectural visualization, and more."
                          }
                        }
                      ]
                    }
                  ]
                },
                // Feature 3
                {
                  type: "card",
                  props: {
                    className: "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-pink-500/50 transition-colors group overflow-hidden"
                  },
                  children: [
                    {
                      type: "box",
                      props: {
                        className: "p-6"
                      },
                      children: [
                        {
                          type: "box",
                          props: {
                            className: "w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-colors"
                          },
                          children: [
                            {
                              type: "text",
                              props: {
                                className: "text-2xl text-pink-400",
                                children: "🚀"
                              }
                            }
                          ]
                        },
                        {
                          type: "heading",
                          props: {
                            level: 3,
                            className: "text-xl font-semibold mb-3",
                            children: "Digital Marketing"
                          }
                        },
                        {
                          type: "text",
                          props: {
                            className: "text-zinc-400",
                            children: "Strategic digital marketing campaigns that connect with your audience and drive results. SEO, social media, content marketing, and more."
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    
    // CTA Section
    {
      type: "box",
      props: {
        className: "py-24 bg-zinc-950"
      },
      children: [
        {
          type: "container",
          children: [
            {
              type: "box",
              props: {
                className: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-600/30 p-12 text-center"
              },
              children: [
                // Background elements
                {
                  type: "box",
                  props: {
                    className: "absolute inset-0 z-0"
                  },
                  children: [
                    {
                      type: "box",
                      props: {
                        className: "absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl"
                      }
                    },
                    {
                      type: "box",
                      props: {
                        className: "absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"
                      }
                    }
                  ]
                },
                // Content
                {
                  type: "box",
                  props: {
                    className: "relative z-10"
                  },
                  children: [
                    {
                      type: "heading",
                      props: {
                        level: 2,
                        className: "text-3xl md:text-4xl font-bold mb-4",
                        children: "Ready to Transform Your Digital Presence?"
                      }
                    },
                    {
                      type: "text",
                      props: {
                        className: "text-xl text-zinc-300 mb-8 max-w-2xl mx-auto",
                        children: "Let's create something extraordinary together. Contact us today to start your journey."
                      }
                    },
                    {
                      type: "button",
                      props: {
                        variant: "default",
                        size: "lg",
                        className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0",
                        children: "Start Your Project"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    
    // Footer
    {
      type: "box",
      props: {
        className: "py-12 bg-zinc-950"
      },
      children: [
        {
          type: "container",
          children: [
            {
              type: "box",
              props: {
                className: "flex flex-col md:flex-row justify-between items-center"
              },
              children: [
                {
                  type: "text",
                  props: {
                    className: "text-zinc-400 mb-4 md:mb-0",
                    children: "© 2025 SkyScape Studios. All rights reserved."
                  }
                },
                {
                  type: "flex",
                  props: {
                    gap: 6
                  },
                  children: [
                    {
                      type: "text",
                      props: {
                        className: "text-zinc-400 hover:text-white transition-colors cursor-pointer",
                        children: "Twitter"
                      }
                    },
                    {
                      type: "text",
                      props: {
                        className: "text-zinc-400 hover:text-white transition-colors cursor-pointer",
                        children: "Instagram"
                      }
                    },
                    {
                      type: "text",
                      props: {
                        className: "text-zinc-400 hover:text-white transition-colors cursor-pointer",
                        children: "LinkedIn"
                      }
                    },
                    {
                      type: "text",
                      props: {
                        className: "text-zinc-400 hover:text-white transition-colors cursor-pointer",
                        children: "Dribbble"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};