import type { ComponentSpec } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { useState } from "react";
import { usePageMetadata } from "../../../lib/meta";

export const AdvancedConditionalPage = () => {
  usePageMetadata({
    title: "Advanced Conditional Rendering",
    description:
      "Advanced React Jedi conditional rendering examples with complex logic and multiple states.",
  });
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [premiumTier, setPremiumTier] = useState("free");

  const specification: ComponentSpec = {
    type: "Container",
    className: "container mx-auto px-4 py-8",
    children: [
      // Main Header
      {
        type: "Heading",
        level: "h1",
        className: "mb-8 text-4xl font-bold",
        children: "Advanced Conditional Rendering Demo",
      },

      // Control Panel
      {
        type: "Box",
        props: {
          className: "mb-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-4",
        },
        children: [
          {
            type: "Heading",
            props: {
              level: 2,
              className: "mb-4 text-2xl font-semibold",
            },
            children: "State Controls",
          },
          {
            type: "Grid",
            props: {
              cols: { base: 1, md: 2, lg: 3 },
              gap: 4,
            },
            children: [
              // Login Toggle
              {
                type: "Box",
                props: {
                  className: "flex items-center space-x-2",
                },
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "login-switch",
                      className: "flex-1",
                    },
                    children: "User Logged In",
                  },
                  {
                    type: "Switch",
                    props: {
                      id: "login-switch",
                      checked: userLoggedIn,
                      onCheckedChange: setUserLoggedIn,
                    },
                  },
                ],
              },

              // Role Select
              {
                type: "Box",
                props: {
                  className: "space-y-2",
                },
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "role-select",
                    },
                    children: "User Role",
                  },
                  {
                    type: "Select",
                    props: {
                      value: userRole,
                      onValueChange: setUserRole,
                    },
                    children: [
                      {
                        type: "SelectTrigger",
                        props: {
                          id: "role-select",
                        },
                        children: [
                          {
                            type: "SelectValue",
                            props: {
                              placeholder: "Select role",
                            },
                          },
                        ],
                      },
                      {
                        type: "SelectContent",
                        children: [
                          {
                            type: "SelectItem",
                            props: { value: "guest" },
                            children: "Guest",
                          },
                          {
                            type: "SelectItem",
                            props: { value: "user" },
                            children: "User",
                          },
                          {
                            type: "SelectItem",
                            props: { value: "admin" },
                            children: "Admin",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Premium Tier
              {
                type: "Box",
                props: {
                  className: "space-y-2",
                },
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "premium-select",
                    },
                    children: "Premium Tier",
                  },
                  {
                    type: "Select",
                    props: {
                      value: premiumTier,
                      onValueChange: setPremiumTier,
                    },
                    children: [
                      {
                        type: "SelectTrigger",
                        props: {
                          id: "premium-select",
                        },
                        children: [
                          {
                            type: "SelectValue",
                            props: {
                              placeholder: "Select tier",
                            },
                          },
                        ],
                      },
                      {
                        type: "SelectContent",
                        children: [
                          {
                            type: "SelectItem",
                            props: { value: "free" },
                            children: "Free",
                          },
                          {
                            type: "SelectItem",
                            props: { value: "basic" },
                            children: "Basic",
                          },
                          {
                            type: "SelectItem",
                            props: { value: "premium" },
                            children: "Premium",
                          },
                          {
                            type: "SelectItem",
                            props: { value: "enterprise" },
                            children: "Enterprise",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Notifications Toggle
              {
                type: "Box",
                props: {
                  className: "flex items-center space-x-2",
                },
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "notifications-switch",
                      className: "flex-1",
                    },
                    children: "Notifications Enabled",
                  },
                  {
                    type: "Switch",
                    props: {
                      id: "notifications-switch",
                      checked: notificationsEnabled,
                      onCheckedChange: setNotificationsEnabled,
                    },
                  },
                ],
              },

              // Cart Items
              {
                type: "Box",
                props: {
                  className: "space-y-2",
                },
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "cart-items",
                    },
                    children: "Cart Items",
                  },
                  {
                    type: "Box",
                    props: {
                      className: "flex items-center space-x-2",
                    },
                    children: [
                      {
                        type: "Button",
                        props: {
                          onClick: () => setCartItemCount(Math.max(0, cartItemCount - 1)),
                          variant: "outline",
                          size: "sm",
                        },
                        children: "-",
                      },
                      {
                        type: "Text",
                        props: {
                          className: "px-4",
                        },
                        children: cartItemCount.toString(),
                      },
                      {
                        type: "Button",
                        props: {
                          onClick: () => setCartItemCount(cartItemCount + 1),
                          variant: "outline",
                          size: "sm",
                        },
                        children: "+",
                      },
                    ],
                  },
                ],
              },

              // Dark Mode Toggle
              {
                type: "Box",
                props: {
                  className: "flex items-center space-x-2",
                },
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "dark-mode-switch",
                      className: "flex-1",
                    },
                    children: "Dark Mode",
                  },
                  {
                    type: "Switch",
                    props: {
                      id: "dark-mode-switch",
                      checked: darkMode,
                      onCheckedChange: setDarkMode,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },

      // Conditional Content
      {
        type: "Box",
        props: {
          className: "space-y-8",
        },
        children: [
          // Welcome Message - different for each user type
          {
            type: "Card",
            props: {
              className: "p-6",
            },
            children: [
              {
                type: "Heading",
                props: {
                  level: 3,
                  className: "mb-2 text-xl font-semibold",
                },
                children: "Welcome Section",
              },
              {
                type: "Box",
                when: "!userLoggedIn",
                children: [
                  {
                    type: "Text",
                    props: {
                      className: "text-gray-600",
                    },
                    children: "Welcome, Guest! Please log in to access all features.",
                  },
                ],
              },
              {
                type: "Box",
                when: "userLoggedIn && userRole === 'user'",
                children: [
                  {
                    type: "Text",
                    props: {
                      className: "text-blue-600",
                    },
                    children: "Welcome back, User! Enjoy your personalized experience.",
                  },
                ],
              },
              {
                type: "Box",
                when: "userLoggedIn && userRole === 'admin'",
                children: [
                  {
                    type: "Text",
                    props: {
                      className: "text-purple-600 font-semibold",
                    },
                    children: "Admin Dashboard Access Granted",
                  },
                ],
              },
            ],
          },

          // Premium Features - only show for premium users
          {
            type: "Card",
            when: "premiumTier !== 'free'",
            className: "p-6 border-2",
            style: {
              borderColor: (() => {
                if (premiumTier === "enterprise") return "#10b981";
                if (premiumTier === "premium") return "#3b82f6";
                return "#6b7280";
              })(),
            },
            children: [
              {
                type: "Heading",
                props: {
                  level: 3,
                  className: "mb-2 text-xl font-semibold",
                },
                children: `${premiumTier.charAt(0).toUpperCase() + premiumTier.slice(1)} Features`,
              },
              {
                type: "Grid",
                props: {
                  cols: { base: 1, md: 2 },
                  gap: 4,
                },
                children: [
                  // Basic tier features
                  {
                    type: "Box",
                    when: "premiumTier === 'basic' || premiumTier === 'premium' || premiumTier === 'enterprise'",
                    children: [
                      {
                        type: "Badge",
                        props: {
                          variant: "secondary",
                        },
                        children: "Advanced Analytics",
                      },
                    ],
                  },
                  // Premium tier features
                  {
                    type: "Box",
                    when: "premiumTier === 'premium' || premiumTier === 'enterprise'",
                    children: [
                      {
                        type: "Badge",
                        props: {
                          variant: "default",
                        },
                        children: "Priority Support",
                      },
                    ],
                  },
                  // Enterprise features
                  {
                    type: "Box",
                    when: "premiumTier === 'enterprise'",
                    children: [
                      {
                        type: "Badge",
                        props: {
                          variant: "default",
                          className: "bg-green-600",
                        },
                        children: "Custom Integrations",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    when: "premiumTier === 'enterprise'",
                    children: [
                      {
                        type: "Badge",
                        props: {
                          variant: "default",
                          className: "bg-green-600",
                        },
                        children: "Dedicated Account Manager",
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // Notification Settings - only show if logged in
          {
            type: "Card",
            when: "userLoggedIn",
            props: {
              className: "p-6",
            },
            children: [
              {
                type: "Heading",
                props: {
                  level: 3,
                  className: "mb-4 text-xl font-semibold",
                },
                children: "Notification Preferences",
              },
              {
                type: "Box",
                when: "notificationsEnabled",
                children: [
                  {
                    type: "Text",
                    props: {
                      className: "text-green-600",
                    },
                    children: "🔔 Notifications are enabled",
                  },
                  {
                    type: "Box",
                    props: {
                      className: "mt-2 space-y-2",
                    },
                    children: [
                      {
                        type: "Text",
                        props: {
                          className: "text-sm text-gray-600",
                        },
                        children: "• Email notifications",
                      },
                      {
                        type: "Text",
                        when: "premiumTier !== 'free'",
                        props: {
                          className: "text-sm text-gray-600",
                        },
                        children: "• SMS notifications (Premium feature)",
                      },
                      {
                        type: "Text",
                        when: "userRole === 'admin'",
                        props: {
                          className: "text-sm text-gray-600",
                        },
                        children: "• Admin alerts",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Box",
                when: "!notificationsEnabled",
                children: [
                  {
                    type: "Text",
                    props: {
                      className: "text-red-600",
                    },
                    children: "🔕 Notifications are disabled",
                  },
                ],
              },
            ],
          },

          // Shopping Cart - show different states
          {
            type: "Card",
            props: {
              className: "p-6",
              style: {
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                color: darkMode ? "#ffffff" : "#000000",
              },
            },
            children: [
              {
                type: "Heading",
                props: {
                  level: 3,
                  className: "mb-4 text-xl font-semibold",
                },
                children: "Shopping Cart",
              },
              {
                type: "Box",
                when: "cartItemCount === 0",
                children: [
                  {
                    type: "Text",
                    props: {
                      className: "text-gray-500",
                    },
                    children: "Your cart is empty",
                  },
                ],
              },
              {
                type: "Box",
                when: "cartItemCount > 0",
                children: [
                  {
                    type: "Text",
                    props: {
                      className: "mb-2",
                    },
                    children: `You have ${cartItemCount} item${cartItemCount > 1 ? "s" : ""} in your cart`,
                  },
                  {
                    type: "Box",
                    when: "cartItemCount >= 5",
                    children: [
                      {
                        type: "Badge",
                        props: {
                          variant: "default",
                          className: "bg-green-500",
                        },
                        children: "Eligible for free shipping!",
                      },
                    ],
                  },
                  {
                    type: "Button",
                    when: "userLoggedIn",
                    props: {
                      className: "mt-4",
                      variant: "default",
                    },
                    children: "Proceed to Checkout",
                  },
                  {
                    type: "Button",
                    when: "!userLoggedIn",
                    props: {
                      className: "mt-4",
                      variant: "outline",
                    },
                    children: "Log in to Checkout",
                  },
                ],
              },
            ],
          },

          // Admin Panel - only for admins
          {
            type: "Card",
            when: "userLoggedIn && userRole === 'admin'",
            props: {
              className: "p-6 border-2 border-purple-500",
            },
            children: [
              {
                type: "Heading",
                props: {
                  level: 3,
                  className: "mb-4 text-xl font-semibold text-purple-600",
                },
                children: "Admin Control Panel",
              },
              {
                type: "Grid",
                props: {
                  cols: { base: 1, md: 3 },
                  gap: 4,
                },
                children: [
                  {
                    type: "Button",
                    props: {
                      variant: "outline",
                      className: "w-full",
                    },
                    children: "Manage Users",
                  },
                  {
                    type: "Button",
                    props: {
                      variant: "outline",
                      className: "w-full",
                    },
                    children: "View Analytics",
                  },
                  {
                    type: "Button",
                    props: {
                      variant: "outline",
                      className: "w-full",
                    },
                    children: "System Settings",
                  },
                ],
              },
              {
                type: "Box",
                when: "premiumTier === 'enterprise'",
                props: {
                  className: "mt-4 p-4 bg-green-50 rounded",
                },
                children: [
                  {
                    type: "Text",
                    props: {
                      className: "text-green-800 font-semibold",
                    },
                    children: "Enterprise Admin Features Unlocked",
                  },
                ],
              },
            ],
          },

          // Complex Nested Conditions
          {
            type: "Card",
            props: {
              className: "p-6",
            },
            children: [
              {
                type: "Heading",
                props: {
                  level: 3,
                  className: "mb-4 text-xl font-semibold",
                },
                children: "Personalized Recommendations",
              },
              {
                type: "Box",
                when: "userLoggedIn && cartItemCount > 0 && premiumTier !== 'free'",
                children: [
                  {
                    type: "Text",
                    props: {
                      className: "text-blue-600 mb-2",
                    },
                    children: "Based on your cart and premium status:",
                  },
                  {
                    type: "Grid",
                    props: {
                      cols: { base: 1, md: 2 },
                      gap: 4,
                    },
                    children: [
                      {
                        type: "Badge",
                        props: {
                          variant: "secondary",
                        },
                        children: "Similar Products",
                      },
                      {
                        type: "Badge",
                        when: "cartItemCount >= 3",
                        props: {
                          variant: "secondary",
                        },
                        children: "Bundle Discount Available",
                      },
                      {
                        type: "Badge",
                        when: "premiumTier === 'enterprise'",
                        props: {
                          variant: "secondary",
                        },
                        children: "Enterprise Pricing",
                      },
                      {
                        type: "Badge",
                        when: "notificationsEnabled",
                        props: {
                          variant: "secondary",
                        },
                        children: "Price Drop Alerts",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Text",
                when: "!userLoggedIn || (cartItemCount === 0 && premiumTier === 'free')",
                props: {
                  className: "text-gray-500",
                },
                children:
                  "Log in, add items to cart, or upgrade to see personalized recommendations",
              },
            ],
          },
        ],
      },
    ],
  };

  return render(specification, {
    theme: {
      colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
      },
    },
    state: {
      userLoggedIn,
      userRole,
      notificationsEnabled,
      darkMode,
      cartItemCount,
      premiumTier,
    },
  });
};

export default AdvancedConditionalPage;
