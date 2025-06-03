import { usePageMetadata } from '../../../lib/meta'
import { CodeBlock } from '../../../components/ui/code-block'
import { PrevNextNavigation } from '../../../components/documentation'
import { getDocumentationNavigation } from '../../../lib/documentation-navigation'
import { useLocation } from 'react-router-dom'

export function TemplatingPage() {
  usePageMetadata({
    title: 'Template Variables',
    description:
      'Learn how to use template variables for dynamic content in React Jedi JSON specifications.',
  })
  
  const location = useLocation()
  const { prev, next } = getDocumentationNavigation(location.pathname)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Template Variables</h1>
        <p className="text-muted-foreground mb-6">
          React Jedi includes a built-in templating engine that allows you to use dynamic variables 
          in your JSON specifications. This enables you to create flexible, data-driven UIs without 
          hardcoding values.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <p className="text-muted-foreground">
          Use double curly braces {`{{variableName}}`} syntax to reference variables in any string value:
        </p>
        <CodeBlock
          language="javascript"
          code={`const spec = {
  type: "text",
  text: "Hello {{name}}, welcome to {{appName}}!"
};

const rendered = render(spec, {
  variables: {
    name: "Alice",
    appName: "React Jedi"
  }
});
// Output: "Hello Alice, welcome to React Jedi!"`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Nested Properties</h2>
        <p className="text-muted-foreground">
          Access nested object properties using dot notation:
        </p>
        <CodeBlock
          language="javascript"
          code={`const spec = {
  type: "card",
  children: [
    {
      type: "heading",
      content: "{{user.profile.displayName}}"
    },
    {
      type: "text",
      text: "Email: {{user.contact.email}}"
    },
    {
      type: "text",
      text: "Location: {{user.address.city}}, {{user.address.country}}"
    }
  ]
};

const rendered = render(spec, {
  variables: {
    user: {
      profile: {
        displayName: "John Doe"
      },
      contact: {
        email: "john@example.com"
      },
      address: {
        city: "San Francisco",
        country: "USA"
      }
    }
  }
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Reserved Variables</h2>
        <p className="text-muted-foreground">
          React Jedi provides several reserved variables that are automatically available in all templates:
        </p>
        <div className="bg-muted p-4 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-2">Variable</th>
                <th className="text-left pb-2">Description</th>
                <th className="text-left pb-2">Example Output</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr>
                <td className="py-2"><code>{`{{currentYear}}`}</code></td>
                <td className="py-2">Current year</td>
                <td className="py-2">2024</td>
              </tr>
              <tr>
                <td className="py-2"><code>{`{{currentMonth}}`}</code></td>
                <td className="py-2">Current month (1-12)</td>
                <td className="py-2">3</td>
              </tr>
              <tr>
                <td className="py-2"><code>{`{{currentDay}}`}</code></td>
                <td className="py-2">Current day of month</td>
                <td className="py-2">15</td>
              </tr>
              <tr>
                <td className="py-2"><code>{`{{currentDate}}`}</code></td>
                <td className="py-2">ISO date</td>
                <td className="py-2">2024-03-15</td>
              </tr>
              <tr>
                <td className="py-2"><code>{`{{currentTime}}`}</code></td>
                <td className="py-2">Time (HH:MM:SS)</td>
                <td className="py-2">14:30:45</td>
              </tr>
              <tr>
                <td className="py-2"><code>{`{{currentDateTime}}`}</code></td>
                <td className="py-2">ISO datetime</td>
                <td className="py-2">2024-03-15T14:30:45.123Z</td>
              </tr>
              <tr>
                <td className="py-2"><code>{`{{timestamp}}`}</code></td>
                <td className="py-2">Unix timestamp</td>
                <td className="py-2">1710513045123</td>
              </tr>
              <tr>
                <td className="py-2"><code>{`{{weekday}}`}</code></td>
                <td className="py-2">Day name</td>
                <td className="py-2">Friday</td>
              </tr>
              <tr>
                <td className="py-2"><code>{`{{month}}`}</code></td>
                <td className="py-2">Month name</td>
                <td className="py-2">March</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Complex Example</h2>
        <p className="text-muted-foreground">
          Here&apos;s a more complex example showing how template variables can be used in a real-world scenario:
        </p>
        <CodeBlock
          language="javascript"
          code={`const dashboardSpec = {
  type: "container",
  children: [
    {
      type: "heading",
      level: "h1",
      content: "Welcome back, {{user.firstName}}!"
    },
    {
      type: "grid",
      columns: 3,
      children: [
        {
          type: "card",
          children: [
            {
              type: "cardHeader",
              children: [
                {
                  type: "cardTitle",
                  children: "Total Sales"
                }
              ]
            },
            {
              type: "cardContent",
              children: [
                {
                  type: "text",
                  text: "$" + "{{metrics.totalSales}}",
                  className: "text-3xl font-bold"
                },
                {
                  type: "text",
                  text: "{{metrics.salesChange}}% from last month",
                  className: "text-sm text-muted-foreground"
                }
              ]
            }
          ]
        },
        {
          type: "card",
          children: [
            {
              type: "cardHeader",
              children: [
                {
                  type: "cardTitle",
                  children: "Active Users"
                }
              ]
            },
            {
              type: "cardContent",
              children: [
                {
                  type: "text",
                  text: "{{metrics.activeUsers}}",
                  className: "text-3xl font-bold"
                },
                {
                  type: "text",
                  text: "As of {{currentTime}}",
                  className: "text-sm text-muted-foreground"
                }
              ]
            }
          ]
        },
        {
          type: "card",
          children: [
            {
              type: "cardHeader",
              children: [
                {
                  type: "cardTitle",
                  children: "Subscription"
                }
              ]
            },
            {
              type: "cardContent",
              children: [
                {
                  type: "text",
                  text: "{{subscription.plan}} Plan",
                  className: "font-semibold"
                },
                {
                  type: "text",
                  text: "Renews on {{subscription.renewalDate}}",
                  className: "text-sm text-muted-foreground"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "footer",
      className: "mt-8 text-center text-sm text-muted-foreground",
      children: "© {{currentYear}} {{company.name}} • Last updated: {{currentDateTime}}"
    }
  ]
};

// Render with real data
const dashboard = render(dashboardSpec, {
  variables: {
    user: {
      firstName: "Sarah",
      lastName: "Johnson"
    },
    metrics: {
      totalSales: "125,432",
      salesChange: "+12.5",
      activeUsers: "8,421"
    },
    subscription: {
      plan: "Professional",
      renewalDate: "April 15, 2024"
    },
    company: {
      name: "Acme Corporation"
    }
  }
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Security Considerations</h2>
        <p className="text-muted-foreground">
          React Jedi automatically escapes HTML in template variables to prevent XSS attacks:
        </p>
        <CodeBlock
          language="javascript"
          code={`// This is safe - HTML will be escaped
const spec = {
  type: "text",
  text: "Message: {{userInput}}"
};

render(spec, {
  variables: {
    userInput: '<script>alert("XSS")</script>'
  }
});
// Output: "Message: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;"`}
        />
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg">
          <p className="text-sm">
            <strong>Note:</strong> If you need to render raw HTML, you should use the appropriate 
            component properties (like <code>dangerouslySetInnerHTML</code>) rather than template variables.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Advanced Usage</h2>
        
        <h3 className="text-xl font-semibold">Conditional Display</h3>
        <p className="text-muted-foreground">
          Combine template variables with conditional rendering for dynamic UIs:
        </p>
        <CodeBlock
          language="javascript"
          code={`const spec = {
  type: "text",
  text: "Status: {{status}}",
  className: "font-semibold",
  conditional: {
    if: "{{status}} === 'active'",
    className: "text-green-600"
  }
};`}
        />

        <h3 className="text-xl font-semibold">Arrays and Lists</h3>
        <p className="text-muted-foreground">
          When working with arrays, combine template variables with data binding:
        </p>
        <CodeBlock
          language="javascript"
          code={`const spec = {
  type: "container",
  children: [
    {
      type: "heading",
      content: "{{teamName}} Members ({{teamSize}})"
    },
    {
      type: "list",
      dataSource: "team.members",
      renderItem: {
        type: "text",
        text: "{{item.name}} - {{item.role}}"
      }
    }
  ]
};`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Use descriptive variable names that clearly indicate their purpose</li>
          <li>Group related variables under nested objects (e.g., <code>user.profile.name</code>)</li>
          <li>Provide fallback values for optional variables</li>
          <li>Use reserved variables for timestamps to ensure consistency</li>
          <li>Document your variable schema for team collaboration</li>
          <li>Validate variables before passing them to the render function</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">TypeScript Support</h2>
        <p className="text-muted-foreground">
          Template variables are fully typed with TypeScript:
        </p>
        <CodeBlock
          language="typescript"
          code={`interface DashboardVariables {
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  stats: {
    revenue: number;
    growth: number;
    customers: number;
  };
}

const spec: UISpecification = {
  // ... your specification
};

const variables: DashboardVariables = {
  user: {
    name: "Alice",
    role: "Admin"
  },
  stats: {
    revenue: 50000,
    growth: 15.5,
    customers: 1250
  }
};

const rendered = render(spec, { variables });`}
        />
      </section>

      <PrevNextNavigation prev={prev} next={next} />
    </div>
  )
}