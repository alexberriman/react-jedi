import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "@/components/ui/code-block";

export function StateManagementPage() {
  usePageMetadata({
    title: "State Management",
    description:
      "React Jedi state management documentation - JSON-driven state with actions and handlers.",
  });
  return (
    <div>
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-200 dark:border-zinc-800 inline-block pr-8 transition-colors">
          State Management
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-purple-500/50 transition-colors" />
        </h2>
      </div>

      <div className="prose prose-purple dark:prose-invert max-w-none">
        <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-6 transition-colors">
          React Jedi provides a powerful, declarative state management system that works seamlessly
          with JSON specifications. Manage complex application state with ease.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 transition-colors">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400 transition-colors">
                State Features
              </h3>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 transition-colors">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">•</span>
                  <span>Local component state</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">•</span>
                  <span>Global application state</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">•</span>
                  <span>Computed/derived values</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">•</span>
                  <span>State persistence</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 transition-colors">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400 transition-colors">
                Update Patterns
              </h3>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 transition-colors">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">•</span>
                  <span>Event-driven updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">•</span>
                  <span>Batch operations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">•</span>
                  <span>Conditional updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">•</span>
                  <span>Array manipulations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400 transition-colors">
          Basic State Definition
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          Define initial state directly in your JSON specification:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <CodeBlock language="json" className="relative transition-colors">
{`{
  "type": "Container",
  "state": {
    "count": 0,
    "user": {
      "name": "Guest",
      "isLoggedIn": false
    },
    "items": []
  },
  "children": [
    {
      "type": "Text",
      "children": "Count: {{ state.count }}"
    },
    {
      "type": "Button",
      "children": "Increment",
      "onClick": {
        "type": "setState",
        "updates": {
          "count": "{{ state.count + 1 }}"
        }
      }
    }
  ]
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400 transition-colors">
          Computed Values
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          Define derived state that automatically updates when dependencies change:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <CodeBlock language="json" className="relative transition-colors">
{`{
  "type": "Container",
  "state": {
    "items": [
      { "name": "Apple", "price": 1.50, "quantity": 2 },
      { "name": "Banana", "price": 0.75, "quantity": 3 }
    ]
  },
  "computed": {
    "total": "{{ state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) }}",
    "itemCount": "{{ state.items.reduce((sum, item) => sum + item.quantity, 0) }}"
  },
  "children": [
    {
      "type": "Text",
      "children": "Total: \${{ computed.total.toFixed(2) }}"
    }
  ]
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400 transition-colors">
          Complex State Updates
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          Handle complex state operations with ease:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <CodeBlock language="json" className="relative transition-colors">
{`{
  "type": "Container",
  "state": {
    "todos": [],
    "filter": "all"
  },
  "children": [
    {
      "type": "Input",
      "placeholder": "Add a todo...",
      "onKeyPress": {
        "type": "setState",
        "condition": "{{ event.key === 'Enter' && event.target.value }}",
        "updates": {
          "todos": "{{ [...state.todos, { id: Date.now(), text: event.target.value, done: false }] }}"
        }
      }
    },
    {
      "type": "List",
      "children": "{{ state.todos.filter(todo => state.filter === 'all' || (state.filter === 'active' ? !todo.done : todo.done)) }}"
    }
  ]
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400 transition-colors">
          State Persistence
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          Automatically persist state to browser storage:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <CodeBlock language="json" className="relative transition-colors">
{`{
  "type": "Container",
  "state": {
    "preferences": {
      "theme": "light",
      "language": "en"
    }
  },
  "statePersistence": {
    "enabled": true,
    "storage": "localStorage",
    "key": "app-preferences",
    "include": ["preferences"]
  }
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400 transition-colors">
          State Patterns
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden p-6 transition-colors">
            <h4 className="text-lg font-semibold mb-3 text-purple-400 transition-colors">
              Form State
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4 transition-colors">
              Manage form inputs with validation:
            </p>
            <CodeBlock language="json" className="relative text-xs">
{`{
  "state": {
    "form": {
      "email": "",
      "password": ""
    },
    "errors": {}
  },
  "computed": {
    "isValid": "{{ state.form.email && state.form.password }}"
  }
}`}
            </CodeBlock>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden p-6 transition-colors">
            <h4 className="text-lg font-semibold mb-3 text-purple-400 transition-colors">
              List State
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4 transition-colors">
              Manage dynamic lists with CRUD operations:
            </p>
            <CodeBlock language="json" className="relative text-xs">
{`{
  "state": {
    "items": [],
    "selectedId": null
  },
  "computed": {
    "selectedItem": "{{ state.items.find(i => i.id === state.selectedId) }}"
  }
}`}
            </CodeBlock>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-lg p-6 transition-colors">
          <h4 className="text-lg font-semibold mb-3 text-purple-300 transition-colors">
            Best Practices
          </h4>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 transition-colors">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2 transition-colors">1.</span>
              <span>Keep state structure flat when possible for better performance</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2 transition-colors">2.</span>
              <span>Use computed values instead of storing derived data</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2 transition-colors">3.</span>
              <span>Batch related state updates in a single action</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2 transition-colors">4.</span>
              <span>Use state validation for data integrity</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
