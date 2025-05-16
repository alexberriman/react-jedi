import type { SpecificationRoot } from "@banja/react-jedi";
import ReactJedi from "@banja/react-jedi";
import { useState } from "react";

export const AdvancedConditionalPage = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [premiumTier, setPremiumTier] = useState("free");

  const specification: SpecificationRoot = {
    type: "container",
    children: [
      // Main Header
      {
        type: "heading",
        props: {
          level: 1,
          className: "mb-8 text-4xl font-bold",
        },
        children: "Advanced Conditional Rendering Demo",
      },

      // Control Panel
      {
        type: "box",
        props: {
          className: "mb-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-4",
        },
        children: [
          {
            type: "heading",
            props: {
              level: 2,
              className: "mb-4 text-2xl font-semibold",
            },
            children: "State Controls",
          },
          {
            type: "grid",
            props: {
              cols: { base: 1, md: 2, lg: 3 },
              gap: 4,
            },
            children: [
              // Login Toggle
              {
                type: "box",
                props: {
                  className: "flex items-center space-x-2",
                },
                children: [
                  {
                    type: "label",
                    props: {
                      htmlFor: "login-switch",
                      className: "flex-1",
                    },
                    children: "User Logged In",
                  },
                  {
                    type: "switch",
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
                type: "box",
                props: {
                  className: "space-y-2",
                },
                children: [
                  {
                    type: "label",
                    props: {
                      htmlFor: "role-select",
                    },
                    children: "User Role",
                  },
                  {
                    type: "select",
                    props: {
                      value: userRole,
                      onValueChange: setUserRole,
                    },
                    children: [
                      {
                        type: "selectTrigger",
                        props: {
                          id: "role-select",
                        },
                        children: [
                          {
                            type: "selectValue",
                            props: {
                              placeholder: "Select role",
                            },
                          },
                        ],
                      },
                      {
                        type: "selectContent",
                        children: [
                          {
                            type: "selectItem",
                            props: { value: "guest" },
                            children: "Guest",
                          },
                          {
                            type: "selectItem",
                            props: { value: "user" },
                            children: "User",
                          },
                          {
                            type: "selectItem",
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
                type: "box",
                props: {
                  className: "space-y-2",
                },
                children: [
                  {
                    type: "label",
                    props: {
                      htmlFor: "premium-select",
                    },
                    children: "Premium Tier",
                  },
                  {
                    type: "select",
                    props: {
                      value: premiumTier,
                      onValueChange: setPremiumTier,
                    },
                    children: [
                      {
                        type: "selectTrigger",
                        props: {
                          id: "premium-select",
                        },
                        children: [
                          {
                            type: "selectValue",
                            props: {
                              placeholder: "Select tier",
                            },
                          },
                        ],
                      },
                      {
                        type: "selectContent",
                        children: [
                          {
                            type: "selectItem",
                            props: { value: "free" },
                            children: "Free",
                          },
                          {
                            type: "selectItem",
                            props: { value: "basic" },
                            children: "Basic",
                          },
                          {
                            type: "selectItem",
                            props: { value: "premium" },
                            children: "Premium",
                          },
                          {
                            type: "selectItem",
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
                type: "box",
                props: {
                  className: "flex items-center space-x-2",
                },
                children: [
                  {
                    type: "label",
                    props: {
                      htmlFor: "notifications-switch",
                      className: "flex-1",
                    },
                    children: "Notifications Enabled",
                  },
                  {
                    type: "switch",
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
                type: "box",
                props: {
                  className: "space-y-2",
                },
                children: [
                  {
                    type: "label",
                    props: {
                      htmlFor: "cart-items",
                    },
                    children: "Cart Items",
                  },
                  {
                    type: "box",
                    props: {
                      className: "flex items-center space-x-2",
                    },
                    children: [
                      {
                        type: "button",
                        props: {
                          onClick: () => setCartItemCount(Math.max(0, cartItemCount - 1)),
                          variant: "outline",
                          size: "sm",
                        },
                        children: "-",
                      },
                      {
                        type: "text",
                        props: {
                          className: "px-4",
                        },
                        children: cartItemCount.toString(),
                      },
                      {
                        type: "button",
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
                type: "box",
                props: {
                  className: "flex items-center space-x-2",
                },
                children: [
                  {
                    type: "label",
                    props: {
                      htmlFor: "dark-mode-switch",
                      className: "flex-1",
                    },
                    children: "Dark Mode",
                  },
                  {
                    type: "switch",
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
        type: "box",
        props: {
          className: "space-y-8",
        },
        children: [
          // Welcome Message - different for each user type
          {
            type: "card",
            props: {
              className: "p-6",
            },
            children: [
              {
                type: "heading",
                props: {
                  level: 3,
                  className: "mb-2 text-xl font-semibold",
                },
                children: "Welcome Section",
              },
              {
                type: "box",
                if: "!userLoggedIn",
                children: [
                  {
                    type: "text",
                    props: {
                      className: "text-gray-600",
                    },
                    children: "Welcome, Guest! Please log in to access all features.",
                  },
                ],
              },
              {
                type: "box",
                if: "userLoggedIn && userRole === 'user'",
                children: [
                  {
                    type: "text",
                    props: {
                      className: "text-blue-600",
                    },
                    children: "Welcome back, User! Enjoy your personalized experience.",
                  },
                ],
              },
              {
                type: "box",
                if: "userLoggedIn && userRole === 'admin'",
                children: [
                  {
                    type: "text",
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
            type: "card",
            if: "premiumTier !== 'free'",
            props: {
              className: "p-6 border-2",
              style: {
                borderColor: (() => {
                  if (premiumTier === "enterprise") return "#10b981";
                  if (premiumTier === "premium") return "#3b82f6";
                  return "#6b7280";
                })(),
              },
            },
            children: [
              {
                type: "heading",
                props: {
                  level: 3,
                  className: "mb-2 text-xl font-semibold",
                },
                children: `${premiumTier.charAt(0).toUpperCase() + premiumTier.slice(1)} Features`,
              },
              {
                type: "grid",
                props: {
                  cols: { base: 1, md: 2 },
                  gap: 4,
                },
                children: [
                  // Basic tier features
                  {
                    type: "box",
                    if: "premiumTier === 'basic' || premiumTier === 'premium' || premiumTier === 'enterprise'",
                    children: [
                      {
                        type: "badge",
                        props: {
                          variant: "secondary",
                        },
                        children: "Advanced Analytics",
                      },
                    ],
                  },
                  // Premium tier features
                  {
                    type: "box",
                    if: "premiumTier === 'premium' || premiumTier === 'enterprise'",
                    children: [
                      {
                        type: "badge",
                        props: {
                          variant: "default",
                        },
                        children: "Priority Support",
                      },
                    ],
                  },
                  // Enterprise features
                  {
                    type: "box",
                    if: "premiumTier === 'enterprise'",
                    children: [
                      {
                        type: "badge",
                        props: {
                          variant: "default",
                          className: "bg-green-600",
                        },
                        children: "Custom Integrations",
                      },
                    ],
                  },
                  {
                    type: "box",
                    if: "premiumTier === 'enterprise'",
                    children: [
                      {
                        type: "badge",
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
            type: "card",
            if: "userLoggedIn",
            props: {
              className: "p-6",
            },
            children: [
              {
                type: "heading",
                props: {
                  level: 3,
                  className: "mb-4 text-xl font-semibold",
                },
                children: "Notification Preferences",
              },
              {
                type: "box",
                if: "notificationsEnabled",
                children: [
                  {
                    type: "text",
                    props: {
                      className: "text-green-600",
                    },
                    children: "🔔 Notifications are enabled",
                  },
                  {
                    type: "box",
                    props: {
                      className: "mt-2 space-y-2",
                    },
                    children: [
                      {
                        type: "text",
                        props: {
                          className: "text-sm text-gray-600",
                        },
                        children: "• Email notifications",
                      },
                      {
                        type: "text",
                        if: "premiumTier !== 'free'",
                        props: {
                          className: "text-sm text-gray-600",
                        },
                        children: "• SMS notifications (Premium feature)",
                      },
                      {
                        type: "text",
                        if: "userRole === 'admin'",
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
                type: "box",
                if: "!notificationsEnabled",
                children: [
                  {
                    type: "text",
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
            type: "card",
            props: {
              className: "p-6",
              style: {
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                color: darkMode ? "#ffffff" : "#000000",
              },
            },
            children: [
              {
                type: "heading",
                props: {
                  level: 3,
                  className: "mb-4 text-xl font-semibold",
                },
                children: "Shopping Cart",
              },
              {
                type: "box",
                if: "cartItemCount === 0",
                children: [
                  {
                    type: "text",
                    props: {
                      className: "text-gray-500",
                    },
                    children: "Your cart is empty",
                  },
                ],
              },
              {
                type: "box",
                if: "cartItemCount > 0",
                children: [
                  {
                    type: "text",
                    props: {
                      className: "mb-2",
                    },
                    children: `You have ${cartItemCount} item${cartItemCount > 1 ? "s" : ""} in your cart`,
                  },
                  {
                    type: "box",
                    if: "cartItemCount >= 5",
                    children: [
                      {
                        type: "badge",
                        props: {
                          variant: "default",
                          className: "bg-green-500",
                        },
                        children: "Eligible for free shipping!",
                      },
                    ],
                  },
                  {
                    type: "button",
                    if: "userLoggedIn",
                    props: {
                      className: "mt-4",
                      variant: "default",
                    },
                    children: "Proceed to Checkout",
                  },
                  {
                    type: "button",
                    if: "!userLoggedIn",
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
            type: "card",
            if: "userLoggedIn && userRole === 'admin'",
            props: {
              className: "p-6 border-2 border-purple-500",
            },
            children: [
              {
                type: "heading",
                props: {
                  level: 3,
                  className: "mb-4 text-xl font-semibold text-purple-600",
                },
                children: "Admin Control Panel",
              },
              {
                type: "grid",
                props: {
                  cols: { base: 1, md: 3 },
                  gap: 4,
                },
                children: [
                  {
                    type: "button",
                    props: {
                      variant: "outline",
                      className: "w-full",
                    },
                    children: "Manage Users",
                  },
                  {
                    type: "button",
                    props: {
                      variant: "outline",
                      className: "w-full",
                    },
                    children: "View Analytics",
                  },
                  {
                    type: "button",
                    props: {
                      variant: "outline",
                      className: "w-full",
                    },
                    children: "System Settings",
                  },
                ],
              },
              {
                type: "box",
                if: "premiumTier === 'enterprise'",
                props: {
                  className: "mt-4 p-4 bg-green-50 rounded",
                },
                children: [
                  {
                    type: "text",
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
            type: "card",
            props: {
              className: "p-6",
            },
            children: [
              {
                type: "heading",
                props: {
                  level: 3,
                  className: "mb-4 text-xl font-semibold",
                },
                children: "Personalized Recommendations",
              },
              {
                type: "box",
                if: "userLoggedIn && cartItemCount > 0 && premiumTier !== 'free'",
                children: [
                  {
                    type: "text",
                    props: {
                      className: "text-blue-600 mb-2",
                    },
                    children: "Based on your cart and premium status:",
                  },
                  {
                    type: "grid",
                    props: {
                      cols: { base: 1, md: 2 },
                      gap: 4,
                    },
                    children: [
                      {
                        type: "badge",
                        props: {
                          variant: "secondary",
                        },
                        children: "Similar Products",
                      },
                      {
                        type: "badge",
                        if: "cartItemCount >= 3",
                        props: {
                          variant: "secondary",
                        },
                        children: "Bundle Discount Available",
                      },
                      {
                        type: "badge",
                        if: "premiumTier === 'enterprise'",
                        props: {
                          variant: "secondary",
                        },
                        children: "Enterprise Pricing",
                      },
                      {
                        type: "badge",
                        if: "notificationsEnabled",
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
                type: "text",
                if: "!userLoggedIn || (cartItemCount === 0 && premiumTier === 'free')",
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

  return (
    <ReactJedi
      specification={specification}
      theme={{
        colors: {
          primary: "#3b82f6",
          secondary: "#10b981",
        },
      }}
      state={{
        userLoggedIn,
        userRole,
        notificationsEnabled,
        darkMode,
        cartItemCount,
        premiumTier,
      }}
    />
  );
};

export default AdvancedConditionalPage;
