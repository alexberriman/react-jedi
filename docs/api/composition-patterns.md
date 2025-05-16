# Component Composition Patterns

This guide demonstrates best practices for composing complex UIs by combining React Jedi components effectively. Learn how to create sophisticated, maintainable UI patterns through composition.

## Table of Contents

- [Core Composition Principles](#core-composition-principles)
- [Common Patterns](#common-patterns)
- [Layout Composition](#layout-composition)
- [Form Composition](#form-composition)
- [State Composition](#state-composition)
- [Theme Composition](#theme-composition)
- [Advanced Patterns](#advanced-patterns)
- [Performance Considerations](#performance-considerations)

## Core Composition Principles

### 1. Container-First Architecture

Always wrap your layouts in a container to ensure consistent spacing and responsive behavior:

```json
{
  "id": "root",
  "type": "Container",
  "props": {
    "maxWidth": "7xl",
    "padding": "md"
  },
  "children": [
    {
      "id": "content-box",
      "type": "Box",
      "children": [
        // Your content here
      ]
    }
  ]
}
```

### 2. Semantic Component Nesting

Components should be nested in a semantically meaningful way:

```json
{
  "id": "article",
  "type": "Box",
  "props": {
    "as": "article"
  },
  "children": [
    {
      "id": "header",
      "type": "Box",
      "props": { "as": "header" },
      "children": [
        {
          "id": "title",
          "type": "Heading",
          "props": { "level": 1 },
          "children": "Article Title"
        }
      ]
    },
    {
      "id": "content",
      "type": "Box",
      "props": { "as": "main" },
      "children": [
        {
          "id": "paragraph",
          "type": "Text",
          "children": "Article content..."
        }
      ]
    }
  ]
}
```

### 3. Component Composition Order

Follow a consistent order when composing components:

1. Layout container (Container, Box)
2. Layout structure (Grid, Flex)
3. Content wrappers (Card, Section)
4. Interactive elements (Button, Input)
5. Content elements (Text, Image)

## Common Patterns

### Card Grid Pattern

A common pattern for displaying items in a grid:

```json
{
  "id": "product-grid",
  "type": "Grid",
  "props": {
    "columns": { "default": 1, "md": 2, "lg": 3 },
    "gap": 6
  },
  "children": [
    {
      "id": "product-1",
      "type": "Card",
      "children": [
        {
          "id": "product-image",
          "type": "AspectRatio",
          "props": { "ratio": "16/9" },
          "children": {
            "type": "Image",
            "props": {
              "src": "/product-1.jpg",
              "alt": "Product 1"
            }
          }
        },
        {
          "id": "product-info",
          "type": "CardContent",
          "children": [
            {
              "type": "Heading",
              "props": { "level": 3 },
              "children": "Product Name"
            },
            {
              "type": "Text",
              "props": { "variant": "muted" },
              "children": "$99.99"
            }
          ]
        }
      ]
    }
    // More products...
  ]
}
```

### Hero Section Pattern

A marketing hero section with call-to-action:

```json
{
  "id": "hero",
  "type": "Hero",
  "props": {
    "variant": "centered",
    "background": "gradient"
  },
  "children": [
    {
      "id": "hero-content",
      "type": "Flex",
      "props": {
        "direction": "column",
        "gap": 6,
        "align": "center"
      },
      "children": [
        {
          "type": "Heading",
          "props": { "level": 1, "size": "4xl" },
          "children": "Welcome to React Jedi"
        },
        {
          "type": "Text",
          "props": { "size": "lg", "align": "center" },
          "children": "Build stunning UIs with the power of JSON"
        },
        {
          "type": "Flex",
          "props": { "gap": 4 },
          "children": [
            {
              "type": "Button",
              "props": { "variant": "primary", "size": "lg" },
              "children": "Get Started"
            },
            {
              "type": "Button",
              "props": { "variant": "outline", "size": "lg" },
              "children": "Learn More"
            }
          ]
        }
      ]
    }
  ]
}
```

### Navigation Pattern

A responsive navigation bar:

```json
{
  "id": "navbar",
  "type": "Box",
  "props": {
    "as": "nav",
    "styles": { "base": "border-b" }
  },
  "children": {
    "type": "Container",
    "children": {
      "type": "Flex",
      "props": {
        "justify": "between",
        "align": "center",
        "padding": "y-4"
      },
      "children": [
        {
          "id": "logo",
          "type": "Text",
          "props": { "size": "xl", "weight": "bold" },
          "children": "Brand"
        },
        {
          "id": "nav-menu",
          "type": "NavigationMenu",
          "props": {
            "items": [
              { "label": "Products", "href": "/products" },
              { "label": "About", "href": "/about" },
              { "label": "Contact", "href": "/contact" }
            ]
          }
        }
      ]
    }
  }
}
```

### Dashboard Pattern with Sidebar

A complete dashboard layout with collapsible sidebar:

```json
{
  "id": "dashboard-layout",
  "type": "Box",
  "props": {
    "minHeight": "screen"
  },
  "children": [
    {
      "id": "sidebar-wrapper",
      "type": "Sidebar",
      "props": {
        "variant": "default",
        "collapsible": true
      },
      "children": [
        {
          "type": "SidebarHeader",
          "children": {
            "type": "Text",
            "props": { "size": "lg", "weight": "bold" },
            "children": "Dashboard"
          }
        },
        {
          "type": "SidebarContent",
          "children": [
            {
              "type": "SidebarMenuButton",
              "props": { 
                "href": "/dashboard",
                "active": true
              },
              "children": "Overview"
            },
            {
              "type": "SidebarMenuButton",
              "props": { "href": "/analytics" },
              "children": "Analytics"
            },
            {
              "type": "SidebarMenuButton",
              "props": { "href": "/settings" },
              "children": "Settings"
            }
          ]
        }
      ]
    },
    {
      "id": "main-content",
      "type": "Box",
      "props": { "flex": 1 },
      "children": [
        {
          "type": "Container",
          "props": { "padding": "6" },
          "children": [
            // Main dashboard content
          ]
        }
      ]
    }
  ]
}
```

### Command Palette Pattern

A searchable command palette for app navigation:

```json
{
  "id": "command-wrapper",
  "type": "Box",
  "children": [
    {
      "type": "Command",
      "props": {
        "placeholder": "Type a command or search..."
      },
      "children": [
        {
          "type": "CommandInput",
          "props": {
            "placeholder": "Search commands..."
          }
        },
        {
          "type": "CommandList",
          "children": [
            {
              "type": "CommandGroup",
              "props": { "heading": "Pages" },
              "children": [
                {
                  "type": "CommandItem",
                  "props": { "onSelect": "navigateToDashboard" },
                  "children": "Dashboard"
                },
                {
                  "type": "CommandItem",
                  "props": { "onSelect": "navigateToSettings" },
                  "children": "Settings"
                }
              ]
            },
            {
              "type": "CommandGroup",
              "props": { "heading": "Actions" },
              "children": [
                {
                  "type": "CommandItem",
                  "props": { "onSelect": "createNewProject" },
                  "children": "Create New Project"
                },
                {
                  "type": "CommandItem",
                  "props": { "onSelect": "openSearch" },
                  "children": "Search"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Layout Composition

### Sidebar Layout

A common dashboard layout with sidebar:

```json
{
  "id": "dashboard",
  "type": "Flex",
  "props": { "minHeight": "screen" },
  "children": [
    {
      "id": "sidebar",
      "type": "Sidebar",
      "props": {
        "width": "64",
        "variant": "default"
      },
      "children": [
        // Sidebar content
      ]
    },
    {
      "id": "main-content",
      "type": "Box",
      "props": { "flex": 1 },
      "children": [
        {
          "type": "Container",
          "props": { "padding": "6" },
          "children": [
            // Main content
          ]
        }
      ]
    }
  ]
}
```

### Split Layout

A two-column split layout:

```json
{
  "id": "split-layout",
  "type": "Grid",
  "props": {
    "columns": { "default": 1, "lg": 2 },
    "minHeight": "screen"
  },
  "children": [
    {
      "id": "left-panel",
      "type": "Box",
      "props": {
        "background": "muted",
        "padding": "8"
      },
      "children": [
        // Left content
      ]
    },
    {
      "id": "right-panel",
      "type": "Box",
      "props": { "padding": "8" },
      "children": [
        // Right content
      ]
    }
  ]
}
```

### Centered Content

Center content with max width:

```json
{
  "id": "centered-content",
  "type": "Center",
  "props": { "minHeight": "screen" },
  "children": {
    "type": "Box",
    "props": {
      "maxWidth": "2xl",
      "width": "full",
      "padding": "6"
    },
    "children": [
      // Your centered content
    ]
  }
}
```

## Form Composition

### Complex Form Pattern

A multi-section form with validation:

```json
{
  "id": "user-form",
  "type": "Form",
  "props": {
    "onSubmit": "handleSubmit"
  },
  "children": [
    {
      "id": "personal-section",
      "type": "Box",
      "props": { "marginBottom": "6" },
      "children": [
        {
          "type": "Heading",
          "props": { "level": 3 },
          "children": "Personal Information"
        },
        {
          "type": "Grid",
          "props": {
            "columns": { "default": 1, "md": 2 },
            "gap": 4
          },
          "children": [
            {
              "type": "FormField",
              "props": { "name": "firstName" },
              "children": [
                {
                  "type": "Label",
                  "children": "First Name"
                },
                {
                  "type": "Input",
                  "props": {
                    "placeholder": "John",
                    "required": true
                  }
                }
              ]
            },
            {
              "type": "FormField",
              "props": { "name": "lastName" },
              "children": [
                {
                  "type": "Label",
                  "children": "Last Name"
                },
                {
                  "type": "Input",
                  "props": {
                    "placeholder": "Doe",
                    "required": true
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "submit-section",
      "type": "Flex",
      "props": { "justify": "end", "gap": 4 },
      "children": [
        {
          "type": "Button",
          "props": { "variant": "outline" },
          "children": "Cancel"
        },
        {
          "type": "Button",
          "props": { "type": "submit" },
          "children": "Save"
        }
      ]
    }
  ]
}
```

### Inline Form Pattern

A compact inline form:

```json
{
  "id": "newsletter-form",
  "type": "Form",
  "props": { "onSubmit": "handleSubscribe" },
  "children": {
    "type": "Flex",
    "props": { "gap": 2 },
    "children": [
      {
        "type": "Input",
        "props": {
          "type": "email",
          "placeholder": "Enter your email",
          "flex": 1
        }
      },
      {
        "type": "Button",
        "props": { "type": "submit" },
        "children": "Subscribe"
      }
    ]
  }
}
```

### Multi-Step Form with Progress

A complex form with multiple steps and progress tracking:

```json
{
  "id": "onboarding-form",
  "type": "Box",
  "children": [
    {
      "type": "Progress",
      "props": {
        "value": "{{ (currentStep / totalSteps) * 100 }}",
        "className": "mb-6"
      }
    },
    {
      "type": "Heading",
      "props": { "level": 2 },
      "children": "{{ steps[currentStep].title }}"
    },
    {
      "type": "Form",
      "props": { "onSubmit": "handleStepSubmit" },
      "children": [
        {
          "id": "step-1",
          "type": "Box",
          "show": { "when": "currentStep === 0" },
          "children": [
            {
              "type": "FormField",
              "props": { "name": "companyName" },
              "children": [
                {
                  "type": "Label",
                  "children": "Company Name"
                },
                {
                  "type": "Input",
                  "props": { "required": true }
                }
              ]
            }
          ]
        },
        {
          "id": "step-2",
          "type": "Box",
          "show": { "when": "currentStep === 1" },
          "children": [
            {
              "type": "FormField",
              "props": { "name": "teamSize" },
              "children": [
                {
                  "type": "Label",
                  "children": "Team Size"
                },
                {
                  "type": "Select",
                  "props": {
                    "options": [
                      { "value": "1-10", "label": "1-10 employees" },
                      { "value": "11-50", "label": "11-50 employees" },
                      { "value": "51+", "label": "51+ employees" }
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "Flex",
          "props": { "justify": "between", "marginTop": "6" },
          "children": [
            {
              "type": "Button",
              "props": { 
                "variant": "outline",
                "onClick": "previousStep",
                "disabled": "{{ currentStep === 0 }}"
              },
              "children": "Previous"
            },
            {
              "type": "Button",
              "props": { "type": "submit" },
              "children": "{{ currentStep === totalSteps - 1 ? 'Complete' : 'Next' }}"
            }
          ]
        }
      ]
    }
  ]
}
```

### Date Range Picker Pattern

A date selection form with range picker:

```json
{
  "id": "date-filter",
  "type": "Box",
  "children": [
    {
      "type": "Label",
      "children": "Select Date Range"
    },
    {
      "type": "Flex",
      "props": { "gap": 2, "align": "center" },
      "children": [
        {
          "type": "DatePicker",
          "props": {
            "value": "{{ startDate }}",
            "onChange": "setStartDate",
            "placeholder": "Start date"
          }
        },
        {
          "type": "Text",
          "children": "to"
        },
        {
          "type": "DatePicker",
          "props": {
            "value": "{{ endDate }}",
            "onChange": "setEndDate",
            "placeholder": "End date",
            "minDate": "{{ startDate }}"
          }
        },
        {
          "type": "Button",
          "props": { 
            "variant": "default",
            "onClick": "applyDateFilter"
          },
          "children": "Apply"
        }
      ]
    }
  ]
}
```

## State Composition

### Tabs with State

Tabs that manage their own state:

```json
{
  "id": "user-tabs",
  "type": "Tabs",
  "props": {
    "defaultValue": "profile"
  },
  "children": [
    {
      "type": "TabsList",
      "children": [
        {
          "type": "TabsTrigger",
          "props": { "value": "profile" },
          "children": "Profile"
        },
        {
          "type": "TabsTrigger",
          "props": { "value": "settings" },
          "children": "Settings"
        }
      ]
    },
    {
      "type": "TabsContent",
      "props": { "value": "profile" },
      "children": [
        // Profile content
      ]
    },
    {
      "type": "TabsContent",
      "props": { "value": "settings" },
      "children": [
        // Settings content
      ]
    }
  ]
}
```

### Modal with Form

A dialog containing a form:

```json
{
  "id": "edit-dialog",
  "type": "Dialog",
  "props": {
    "open": false
  },
  "children": [
    {
      "type": "DialogTrigger",
      "children": {
        "type": "Button",
        "children": "Edit Profile"
      }
    },
    {
      "type": "DialogContent",
      "children": [
        {
          "type": "DialogHeader",
          "children": [
            {
              "type": "DialogTitle",
              "children": "Edit Profile"
            }
          ]
        },
        {
          "type": "Form",
          "props": { "onSubmit": "handleProfileUpdate" },
          "children": [
            // Form fields
          ]
        }
      ]
    }
  ]
}
```

## Theme Composition

### Dark Mode Section

A section with custom dark mode styling:

```json
{
  "id": "dark-section",
  "type": "Box",
  "props": {
    "theme": {
      "mode": "dark",
      "primary": "blue",
      "background": "slate"
    },
    "background": "background",
    "padding": "8"
  },
  "children": [
    {
      "type": "Heading",
      "props": { "color": "foreground" },
      "children": "Dark Mode Content"
    }
  ]
}
```

### Custom Theme Card

A card with custom theme tokens:

```json
{
  "id": "premium-card",
  "type": "Card",
  "props": {
    "theme": {
      "radius": "xl",
      "spacing": {
        "card": "8"
      }
    },
    "styles": {
      "base": "bg-gradient-to-r from-purple-500 to-pink-500"
    }
  },
  "children": [
    // Card content
  ]
}
```

## Advanced Patterns

### Conditional Rendering

Show content based on conditions:

```json
{
  "id": "user-dashboard",
  "type": "Box",
  "children": [
    {
      "id": "admin-panel",
      "type": "Box",
      "show": {
        "when": "user.role === 'admin'"
      },
      "children": [
        // Admin-only content
      ]
    },
    {
      "id": "user-content",
      "type": "Box",
      "show": {
        "when": "user.role === 'user'"
      },
      "children": [
        // Regular user content
      ]
    }
  ]
}
```

### Responsive Composition

Different layouts for different screen sizes:

```json
{
  "id": "responsive-layout",
  "type": "Box",
  "children": [
    {
      "id": "mobile-view",
      "type": "Stack",
      "props": {
        "display": { "base": "flex", "lg": "none" }
      },
      "children": [
        // Mobile layout
      ]
    },
    {
      "id": "desktop-view",
      "type": "Grid",
      "props": {
        "columns": 3,
        "display": { "base": "none", "lg": "grid" }
      },
      "children": [
        // Desktop layout
      ]
    }
  ]
}
```

### Recursive Composition

Components that render themselves:

```json
{
  "id": "tree-view",
  "type": "Box",
  "children": [
    {
      "id": "node-1",
      "type": "TreeNode",
      "props": {
        "label": "Parent",
        "children": [
          {
            "type": "TreeNode",
            "props": {
              "label": "Child 1"
            }
          },
          {
            "type": "TreeNode",
            "props": {
              "label": "Child 2",
              "children": [
                {
                  "type": "TreeNode",
                  "props": {
                    "label": "Grandchild"
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
```

### Marketing Landing Page

A complete marketing page with hero, features, testimonials, and CTA:

```json
{
  "id": "landing-page",
  "type": "Box",
  "children": [
    {
      "id": "hero-section",
      "type": "Hero",
      "props": {
        "variant": "gradient",
        "height": "lg"
      },
      "children": [
        {
          "type": "Container",
          "children": {
            "type": "Flex",
            "props": {
              "direction": "column",
              "align": "center",
              "gap": 8
            },
            "children": [
              {
                "type": "Badge",
                "props": { "variant": "secondary" },
                "children": "New Release"
              },
              {
                "type": "Heading",
                "props": { 
                  "level": 1,
                  "size": "5xl",
                  "align": "center"
                },
                "children": "Build Better Products Faster"
              },
              {
                "type": "Text",
                "props": { 
                  "size": "xl",
                  "align": "center",
                  "variant": "muted",
                  "maxWidth": "3xl"
                },
                "children": "Streamline your development process with our cutting-edge tools and frameworks"
              },
              {
                "type": "Flex",
                "props": { "gap": 4 },
                "children": [
                  {
                    "type": "Button",
                    "props": { 
                      "size": "lg",
                      "variant": "primary"
                    },
                    "children": "Get Started Free"
                  },
                  {
                    "type": "Button",
                    "props": { 
                      "size": "lg",
                      "variant": "outline"
                    },
                    "children": "Watch Demo"
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "id": "features-section",
      "type": "Box",
      "props": { "padding": "y-16" },
      "children": {
        "type": "Container",
        "children": [
          {
            "type": "Heading",
            "props": { 
              "level": 2,
              "size": "3xl",
              "align": "center",
              "marginBottom": "12"
            },
            "children": "Why Choose Us"
          },
          {
            "type": "Grid",
            "props": {
              "columns": { "default": 1, "md": 2, "lg": 3 },
              "gap": 8
            },
            "children": [
              {
                "type": "FeatureCard",
                "props": {
                  "icon": "rocket",
                  "title": "Lightning Fast",
                  "description": "Built for speed with optimized performance"
                }
              },
              {
                "type": "FeatureCard",
                "props": {
                  "icon": "shield",
                  "title": "Enterprise Security",
                  "description": "Bank-level security for your data"
                }
              },
              {
                "type": "FeatureCard",
                "props": {
                  "icon": "users",
                  "title": "Team Collaboration",
                  "description": "Work together seamlessly in real-time"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "id": "testimonials-section",
      "type": "Box",
      "props": { 
        "background": "muted",
        "padding": "y-16"
      },
      "children": {
        "type": "Container",
        "children": [
          {
            "type": "Heading",
            "props": { 
              "level": 2,
              "size": "3xl",
              "align": "center",
              "marginBottom": "12"
            },
            "children": "What Our Customers Say"
          },
          {
            "type": "Grid",
            "props": {
              "columns": { "default": 1, "lg": 3 },
              "gap": 6
            },
            "children": [
              {
                "type": "Testimonial",
                "props": {
                  "quote": "This tool has transformed how we work. Incredible!",
                  "author": "Sarah Johnson",
                  "role": "CEO at TechCorp",
                  "rating": 5
                }
              },
              {
                "type": "Testimonial",
                "props": {
                  "quote": "The best investment we've made for our team.",
                  "author": "Mike Chen",
                  "role": "CTO at StartupXYZ",
                  "rating": 5
                }
              },
              {
                "type": "Testimonial",
                "props": {
                  "quote": "Outstanding support and amazing features.",
                  "author": "Lisa Brown",
                  "role": "Product Manager",
                  "rating": 5
                }
              }
            ]
          }
        ]
      }
    },
    {
      "id": "pricing-section",
      "type": "Box",
      "props": { "padding": "y-16" },
      "children": {
        "type": "Container",
        "children": [
          {
            "type": "Heading",
            "props": { 
              "level": 2,
              "size": "3xl",
              "align": "center",
              "marginBottom": "4"
            },
            "children": "Simple, Transparent Pricing"
          },
          {
            "type": "Text",
            "props": { 
              "align": "center",
              "variant": "muted",
              "marginBottom": "12"
            },
            "children": "Choose the plan that works for you"
          },
          {
            "type": "PricingTable",
            "props": {
              "plans": [
                {
                  "name": "Starter",
                  "price": "$29",
                  "period": "month",
                  "features": [
                    "Up to 5 users",
                    "Basic features",
                    "Email support"
                  ],
                  "highlighted": false
                },
                {
                  "name": "Professional",
                  "price": "$99",
                  "period": "month",
                  "features": [
                    "Unlimited users",
                    "Advanced features",
                    "Priority support",
                    "Custom integrations"
                  ],
                  "highlighted": true
                },
                {
                  "name": "Enterprise",
                  "price": "Custom",
                  "period": "",
                  "features": [
                    "Custom deployment",
                    "Dedicated support",
                    "SLA guarantee",
                    "Advanced security"
                  ],
                  "highlighted": false
                }
              ]
            }
          }
        ]
      }
    },
    {
      "id": "cta-section",
      "type": "CallToAction",
      "props": {
        "variant": "primary",
        "title": "Ready to Get Started?",
        "description": "Join thousands of teams already using our platform",
        "primaryAction": {
          "label": "Start Free Trial",
          "onClick": "handleSignup"
        },
        "secondaryAction": {
          "label": "Contact Sales",
          "onClick": "handleContactSales"
        }
      }
    },
    {
      "id": "footer",
      "type": "Footer",
      "props": {
        "variant": "default",
        "columns": [
          {
            "title": "Product",
            "links": [
              { "label": "Features", "href": "/features" },
              { "label": "Pricing", "href": "/pricing" },
              { "label": "Docs", "href": "/docs" }
            ]
          },
          {
            "title": "Company",
            "links": [
              { "label": "About", "href": "/about" },
              { "label": "Blog", "href": "/blog" },
              { "label": "Careers", "href": "/careers" }
            ]
          },
          {
            "title": "Legal",
            "links": [
              { "label": "Privacy", "href": "/privacy" },
              { "label": "Terms", "href": "/terms" }
            ]
          }
        ],
        "copyright": "© 2024 Your Company. All rights reserved."
      }
    }
  ]
}
```

### Data Table with Filters

A complex data table with filtering and sorting:

```json
{
  "id": "user-management",
  "type": "Box",
  "children": [
    {
      "type": "Flex",
      "props": { 
        "justify": "between",
        "align": "center",
        "marginBottom": "6"
      },
      "children": [
        {
          "type": "Heading",
          "props": { "level": 2 },
          "children": "User Management"
        },
        {
          "type": "Button",
          "props": { 
            "variant": "primary",
            "onClick": "handleAddUser"
          },
          "children": "Add User"
        }
      ]
    },
    {
      "type": "Card",
      "children": [
        {
          "type": "Flex",
          "props": { 
            "gap": 4,
            "marginBottom": "4"
          },
          "children": [
            {
              "type": "Input",
              "props": {
                "placeholder": "Search users...",
                "value": "{{ searchQuery }}",
                "onChange": "setSearchQuery",
                "flex": 1
              }
            },
            {
              "type": "Select",
              "props": {
                "placeholder": "Filter by role",
                "value": "{{ filterRole }}",
                "onChange": "setFilterRole",
                "options": [
                  { "value": "all", "label": "All Roles" },
                  { "value": "admin", "label": "Admin" },
                  { "value": "user", "label": "User" }
                ]
              }
            },
            {
              "type": "DatePicker",
              "props": {
                "placeholder": "Filter by date",
                "value": "{{ filterDate }}",
                "onChange": "setFilterDate"
              }
            }
          ]
        },
        {
          "type": "DataTable",
          "props": {
            "data": "{{ filteredUsers }}",
            "columns": [
              {
                "key": "name",
                "header": "Name",
                "sortable": true
              },
              {
                "key": "email",
                "header": "Email",
                "sortable": true
              },
              {
                "key": "role",
                "header": "Role",
                "sortable": true,
                "render": {
                  "type": "Badge",
                  "props": { 
                    "variant": "{{ item.role === 'admin' ? 'destructive' : 'default' }}"
                  },
                  "children": "{{ item.role }}"
                }
              },
              {
                "key": "lastLogin",
                "header": "Last Login",
                "sortable": true,
                "render": {
                  "type": "Text",
                  "props": { "variant": "muted" },
                  "children": "{{ formatDate(item.lastLogin) }}"
                }
              },
              {
                "key": "actions",
                "header": "",
                "render": {
                  "type": "DropdownMenu",
                  "children": [
                    {
                      "type": "DropdownMenuTrigger",
                      "children": {
                        "type": "Button",
                        "props": { "variant": "ghost", "size": "sm" },
                        "children": "•••"
                      }
                    },
                    {
                      "type": "DropdownMenuContent",
                      "children": [
                        {
                          "type": "DropdownMenuItem",
                          "props": { "onClick": "handleEditUser(item.id)" },
                          "children": "Edit"
                        },
                        {
                          "type": "DropdownMenuItem",
                          "props": { 
                            "onClick": "handleDeleteUser(item.id)",
                            "variant": "destructive"
                          },
                          "children": "Delete"
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            "onSort": "handleSort",
            "pagination": {
              "pageSize": 10,
              "currentPage": "{{ currentPage }}",
              "totalItems": "{{ totalUsers }}",
              "onPageChange": "setCurrentPage"
            }
          }
        }
      ]
    }
  ]
}
```

### Toast Notification Pattern

Dynamic toast notifications with different states:

```json
{
  "id": "notification-demo",
  "type": "Box",
  "children": [
    {
      "type": "Heading",
      "props": { "level": 3 },
      "children": "Notification Examples"
    },
    {
      "type": "Flex",
      "props": { "gap": 4, "marginTop": "4" },
      "children": [
        {
          "type": "Button",
          "props": {
            "variant": "default",
            "onClick": "showSuccessToast"
          },
          "children": "Success Toast"
        },
        {
          "type": "Button",
          "props": {
            "variant": "destructive",
            "onClick": "showErrorToast"
          },
          "children": "Error Toast"
        },
        {
          "type": "Button",
          "props": {
            "variant": "outline",
            "onClick": "showInfoToast"
          },
          "children": "Info Toast"
        }
      ]
    },
    {
      "type": "Toast",
      "props": {
        "id": "success-toast",
        "title": "Success!",
        "description": "Your changes have been saved.",
        "variant": "success",
        "show": "{{ showSuccess }}",
        "onClose": "hideSuccessToast"
      }
    },
    {
      "type": "Toast",
      "props": {
        "id": "error-toast",
        "title": "Error",
        "description": "Something went wrong. Please try again.",
        "variant": "destructive",
        "show": "{{ showError }}",
        "onClose": "hideErrorToast"
      }
    },
    {
      "type": "Toast",
      "props": {
        "id": "info-toast",
        "title": "Information",
        "description": "New updates are available.",
        "variant": "default",
        "show": "{{ showInfo }}",
        "onClose": "hideInfoToast",
        "action": {
          "label": "View Updates",
          "onClick": "viewUpdates"
        }
      }
    }
  ]
}
```

## Performance Considerations

### Lazy Loading Pattern

Load components only when needed:

```json
{
  "id": "lazy-section",
  "type": "Box",
  "children": [
    {
      "id": "heavy-component",
      "type": "LazyComponent",
      "props": {
        "component": "DataTable",
        "loading": {
          "type": "Skeleton",
          "props": { "height": "400px" }
        }
      }
    }
  ]
}
```

### Memoized Lists

Optimize list rendering:

```json
{
  "id": "product-list",
  "type": "MemoizedList",
  "props": {
    "items": "products",
    "keyExtractor": "item => item.id",
    "renderItem": {
      "type": "Card",
      "props": {
        "key": "{{item.id}}"
      },
      "children": [
        {
          "type": "Text",
          "children": "{{item.name}}"
        }
      ]
    }
  }
}
```

### Virtualized Grid

Handle large data sets efficiently:

```json
{
  "id": "virtual-grid",
  "type": "VirtualizedGrid",
  "props": {
    "items": "largeDataSet",
    "columns": 4,
    "rowHeight": 200,
    "overscan": 2
  },
  "children": {
    "type": "Card",
    "children": [
      // Item template
    ]
  }
}
```

### Alert System Pattern

A comprehensive alert system with different severity levels:

```json
{
  "id": "alert-system",
  "type": "Stack",
  "props": { "gap": 4 },
  "children": [
    {
      "type": "Alert",
      "props": { "variant": "default" },
      "children": [
        {
          "type": "AlertTitle",
          "children": "Information"
        },
        {
          "type": "AlertDescription",
          "children": "This is a default informational alert."
        }
      ]
    },
    {
      "type": "Alert",
      "props": { "variant": "success" },
      "children": [
        {
          "type": "AlertTitle",
          "children": "Success!"
        },
        {
          "type": "AlertDescription",
          "children": "Your operation completed successfully."
        }
      ]
    },
    {
      "type": "Alert",
      "props": { "variant": "warning" },
      "children": [
        {
          "type": "AlertTitle",
          "children": "Warning"
        },
        {
          "type": "AlertDescription",
          "children": "Please review your input before proceeding."
        }
      ]
    },
    {
      "type": "Alert",
      "props": { 
        "variant": "destructive",
        "dismissible": true,
        "onDismiss": "handleDismissError"
      },
      "children": [
        {
          "type": "AlertTitle",
          "children": "Error"
        },
        {
          "type": "AlertDescription",
          "children": "There was a problem processing your request."
        }
      ]
    }
  ]
}
```

### Image Carousel Pattern

A responsive image carousel with navigation:

```json
{
  "id": "product-gallery",
  "type": "Box",
  "children": [
    {
      "type": "Carousel",
      "props": {
        "className": "w-full max-w-4xl",
        "autoPlay": true,
        "interval": 5000
      },
      "children": [
        {
          "type": "CarouselContent",
          "children": [
            {
              "type": "CarouselItem",
              "children": {
                "type": "AspectRatio",
                "props": { "ratio": "16/9" },
                "children": {
                  "type": "Image",
                  "props": {
                    "src": "/product-1.jpg",
                    "alt": "Product 1",
                    "fill": true
                  }
                }
              }
            },
            {
              "type": "CarouselItem",
              "children": {
                "type": "AspectRatio",
                "props": { "ratio": "16/9" },
                "children": {
                  "type": "Image",
                  "props": {
                    "src": "/product-2.jpg",
                    "alt": "Product 2",
                    "fill": true
                  }
                }
              }
            },
            {
              "type": "CarouselItem",
              "children": {
                "type": "AspectRatio",
                "props": { "ratio": "16/9" },
                "children": {
                  "type": "Image",
                  "props": {
                    "src": "/product-3.jpg",
                    "alt": "Product 3",
                    "fill": true
                  }
                }
              }
            }
          ]
        },
        {
          "type": "CarouselPrevious"
        },
        {
          "type": "CarouselNext"
        }
      ]
    },
    {
      "type": "CarouselDots",
      "props": { "className": "mt-4" }
    }
  ]
}
```

### Calendar Event Scheduler

An interactive calendar with event management:

```json
{
  "id": "event-scheduler",
  "type": "Card",
  "children": [
    {
      "type": "CardHeader",
      "children": [
        {
          "type": "Heading",
          "props": { "level": 3 },
          "children": "Event Calendar"
        }
      ]
    },
    {
      "type": "CardContent",
      "children": [
        {
          "type": "Calendar",
          "props": {
            "mode": "multiple",
            "selected": "{{ selectedDates }}",
            "onSelect": "setSelectedDates",
            "disabled": [
              {
                "dayOfWeek": [0, 6]
              }
            ],
            "modifiers": {
              "booked": "{{ bookedDates }}"
            },
            "modifiersClassNames": {
              "booked": "text-red-500 font-bold"
            }
          }
        },
        {
          "type": "Box",
          "props": { "marginTop": "4" },
          "children": [
            {
              "type": "Text",
              "props": { "weight": "semibold" },
              "children": "Selected Dates:"
            },
            {
              "type": "Flex",
              "props": { "gap": 2, "wrap": true, "marginTop": "2" },
              "children": {
                "type": "Badge",
                "props": { 
                  "key": "{{ date }}",
                  "variant": "secondary"
                },
                "children": "{{ formatDate(date) }}"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Breadcrumb Navigation Pattern

A dynamic breadcrumb navigation:

```json
{
  "id": "breadcrumb-nav",
  "type": "Breadcrumb",
  "children": [
    {
      "type": "BreadcrumbList",
      "children": [
        {
          "type": "BreadcrumbItem",
          "children": [
            {
              "type": "BreadcrumbLink",
              "props": { "href": "/" },
              "children": "Home"
            }
          ]
        },
        {
          "type": "BreadcrumbSeparator"
        },
        {
          "type": "BreadcrumbItem",
          "children": [
            {
              "type": "BreadcrumbLink",
              "props": { "href": "/products" },
              "children": "Products"
            }
          ]
        },
        {
          "type": "BreadcrumbSeparator"
        },
        {
          "type": "BreadcrumbItem",
          "children": [
            {
              "type": "BreadcrumbPage",
              "children": "{{ currentProduct.name }}"
            }
          ]
        }
      ]
    }
  ]
}
```

### OTP Input Pattern

A one-time password input for verification:

```json
{
  "id": "otp-verification",
  "type": "Card",
  "props": { "maxWidth": "sm" },
  "children": [
    {
      "type": "CardHeader",
      "children": [
        {
          "type": "Heading",
          "props": { "level": 3 },
          "children": "Enter Verification Code"
        },
        {
          "type": "Text",
          "props": { "variant": "muted" },
          "children": "We've sent a code to your email"
        }
      ]
    },
    {
      "type": "CardContent",
      "children": [
        {
          "type": "Form",
          "props": { "onSubmit": "handleVerification" },
          "children": [
            {
              "type": "InputOTP",
              "props": {
                "maxLength": 6,
                "value": "{{ otpValue }}",
                "onChange": "setOtpValue"
              },
              "children": [
                {
                  "type": "InputOTPGroup",
                  "children": [
                    { "type": "InputOTPSlot", "props": { "index": 0 } },
                    { "type": "InputOTPSlot", "props": { "index": 1 } },
                    { "type": "InputOTPSlot", "props": { "index": 2 } }
                  ]
                },
                {
                  "type": "InputOTPSeparator"
                },
                {
                  "type": "InputOTPGroup",
                  "children": [
                    { "type": "InputOTPSlot", "props": { "index": 3 } },
                    { "type": "InputOTPSlot", "props": { "index": 4 } },
                    { "type": "InputOTPSlot", "props": { "index": 5 } }
                  ]
                }
              ]
            },
            {
              "type": "Button",
              "props": { 
                "type": "submit",
                "className": "w-full mt-4",
                "disabled": "{{ otpValue.length !== 6 }}"
              },
              "children": "Verify"
            }
          ]
        }
      ]
    }
  ]
}
```

### Combobox Search Pattern

An advanced search with autocomplete:

```json
{
  "id": "user-search",
  "type": "Box",
  "children": [
    {
      "type": "Label",
      "children": "Search Users"
    },
    {
      "type": "Combobox",
      "props": {
        "value": "{{ selectedUser }}",
        "onChange": "setSelectedUser",
        "placeholder": "Search by name or email...",
        "emptyMessage": "No users found",
        "searchPlaceholder": "Type to search..."
      },
      "children": [
        {
          "type": "ComboboxInput",
          "props": {
            "onValueChange": "handleSearch"
          }
        },
        {
          "type": "ComboboxContent",
          "children": [
            {
              "type": "ComboboxItem",
              "props": {
                "key": "{{ user.id }}",
                "value": "{{ user.id }}"
              },
              "children": [
                {
                  "type": "Flex",
                  "props": { "align": "center", "gap": 3 },
                  "children": [
                    {
                      "type": "Avatar",
                      "props": {
                        "src": "{{ user.avatar }}",
                        "alt": "{{ user.name }}"
                      }
                    },
                    {
                      "type": "Box",
                      "children": [
                        {
                          "type": "Text",
                          "props": { "weight": "medium" },
                          "children": "{{ user.name }}"
                        },
                        {
                          "type": "Text",
                          "props": { 
                            "size": "sm",
                            "variant": "muted"
                          },
                          "children": "{{ user.email }}"
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
    }
  ]
}
```

## Best Practices

1. **Start with Layout**: Always begin with container and layout components
2. **Use Semantic HTML**: Choose appropriate `as` props for accessibility
3. **Consistent Spacing**: Use theme spacing values for consistency
4. **Mobile-First**: Design for mobile, then enhance for larger screens
5. **Component Reuse**: Extract common patterns into reusable specifications
6. **State Management**: Keep state at the appropriate level in the hierarchy
7. **Performance**: Use lazy loading and memoization for complex UIs
8. **Accessibility**: Include proper ARIA attributes and keyboard navigation
9. **Theme Inheritance**: Leverage theme cascading for consistent styling
10. **Error Boundaries**: Wrap complex sections in error boundaries

## Common Mistakes to Avoid

1. **Over-nesting**: Avoid unnecessary wrapper components
2. **Inline Styles**: Use theme tokens instead of hardcoded values
3. **Missing Keys**: Always provide unique keys for list items
4. **State Duplication**: Don't duplicate state across components
5. **Ignored Accessibility**: Always include alt text and ARIA labels
6. **Fixed Dimensions**: Use responsive units instead of pixels
7. **Theme Conflicts**: Be careful when mixing custom themes
8. **Performance Neglect**: Consider render performance early
9. **Prop Drilling**: Use context or state management for deep props
10. **Inconsistent Patterns**: Maintain consistent composition patterns

## Conclusion

Effective component composition is key to building maintainable, scalable UIs with React Jedi. By following these patterns and best practices, you can create complex interfaces that are both powerful and easy to maintain.

Remember:
- Think in components and composition
- Use the right component for the job
- Keep accessibility in mind
- Optimize for performance when needed
- Maintain consistency across your application

For more specific component documentation, refer to the individual component API references.