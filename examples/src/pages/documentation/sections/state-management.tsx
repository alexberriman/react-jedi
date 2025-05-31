import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "@/components/ui/code-block";
import { PrevNextNavigation } from "../../../components/documentation";
import { getDocumentationNavigation } from "../../../lib/documentation-navigation";
import { useLocation } from "react-router-dom";

export function StateManagementPage() {
  usePageMetadata({
    title: "State Management",
    description:
      "React Jedi state management documentation - JSON-driven state with actions and handlers.",
  });
  
  const location = useLocation();
  const { prev, next } = getDocumentationNavigation(location.pathname);
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        State Management
      </h2>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          React Jedi provides a powerful, declarative state management system that works seamlessly
          with JSON specifications. Manage complex application state with ease.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-900/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                State Features
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Local component state</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Global application state</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Computed/derived values</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>State persistence</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-900/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Update Patterns
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Event-driven updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Batch operations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Conditional updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Array manipulations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Basic State Definition
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Define initial state directly in your JSON specification:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="json" className="relative">
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

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Computed Values
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Define derived state that automatically updates when dependencies change:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="json" className="relative">
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

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Complex State Updates
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Handle complex state operations with ease:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="json" className="relative">
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

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          State Persistence
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Automatically persist state to browser storage:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="json" className="relative">
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

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          State Patterns
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden p-6">
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Form State
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
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

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden p-6">
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              List State
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
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

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Best Practices
          </h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="text-gray-900 dark:text-gray-100 mr-2">1.</span>
              <span>Keep state structure flat when possible for better performance</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-900 dark:text-gray-100 mr-2">2.</span>
              <span>Use computed values instead of storing derived data</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-900 dark:text-gray-100 mr-2">3.</span>
              <span>Batch related state updates in a single action</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-900 dark:text-gray-100 mr-2">4.</span>
              <span>Use state validation for data integrity</span>
            </li>
          </ul>
        </div>
      </div>
      
      <PrevNextNavigation prev={prev} next={next} />
    </div>
  );
}
