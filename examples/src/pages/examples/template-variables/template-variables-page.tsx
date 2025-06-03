import React, { useState } from 'react'
import { render } from 'react-jedi'
import type { UISpecification } from 'react-jedi'
import CodeBlock from '../../../components/ui/code-block'

function TemplateVariablesPage() {
  const [variables, setVariables] = useState({
    companyName: 'React Jedi Inc.',
    userEmail: 'user@example.com',
    productCount: 42,
    isActive: true,
    user: {
      name: 'John Doe',
      role: 'Developer',
    },
  })

  const specification: UISpecification = {
    version: '1.0',
    root: {
      type: 'Flex',
      direction: 'column',
      gap: 'lg',
      children: [
        {
          type: 'Heading',
          level: 1,
          children: 'Welcome to {{companyName}}',
        },
        {
          type: 'Card',
          children: [
            {
              type: 'CardHeader',
              children: [
                {
                  type: 'CardTitle',
                  children: 'User Information',
                },
              ],
            },
            {
              type: 'CardContent',
              children: [
                {
                  type: 'Flex',
                  direction: 'column',
                  gap: 'sm',
                  children: [
                    {
                      type: 'Text',
                      children: 'Name: {{user.name}}',
                    },
                    {
                      type: 'Text',
                      children: 'Role: {{user.role}}',
                    },
                    {
                      type: 'Text',
                      children: 'Email: {{userEmail}}',
                    },
                    {
                      type: 'Text',
                      children: 'Products: {{productCount}}',
                    },
                    {
                      type: 'Text',
                      children: 'Status: {{isActive}}',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Card',
          children: [
            {
              type: 'CardHeader',
              children: [
                {
                  type: 'CardTitle',
                  children: 'Reserved Variables',
                },
              ],
            },
            {
              type: 'CardContent',
              children: [
                {
                  type: 'Flex',
                  direction: 'column',
                  gap: 'sm',
                  children: [
                    {
                      type: 'Text',
                      children: 'Current Year: {{currentYear}}',
                    },
                    {
                      type: 'Text',
                      children: 'Current Date: {{currentDate}}',
                    },
                    {
                      type: 'Text',
                      children: 'Weekday: {{weekday}}',
                    },
                    {
                      type: 'Text',
                      children: 'Month: {{month}}',
                    },
                    {
                      type: 'Text',
                      children: 'Time: {{currentTime}}',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Card',
          children: [
            {
              type: 'CardHeader',
              children: [
                {
                  type: 'CardTitle',
                  children: 'Variable Editor',
                },
              ],
            },
            {
              type: 'CardContent',
              children: [
                {
                  type: 'Text',
                  children: 'Edit the variables below to see the changes:',
                  className: 'mb-4',
                },
              ],
            },
          ],
        },
      ],
    },
  }

  const specificationCode = `const specification: UISpecification = {
  version: '1.0',
  root: {
    type: 'Flex',
    direction: 'column',
    gap: 'lg',
    children: [
      {
        type: 'Heading',
        level: 1,
        children: 'Welcome to {{companyName}}',
      },
      {
        type: 'Text',
        children: 'User: {{user.name}} ({{user.role}})',
      },
      // ... more components using variables
    ],
  },
}

const variables = {
  companyName: 'React Jedi Inc.',
  user: {
    name: 'John Doe',
    role: 'Developer',
  },
  // ... more variables
}

// Render with variables
const rendered = render(specification, { variables })`

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Template Variables Example</h1>
      
      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          This example demonstrates how to use template variables in React Jedi. 
          Variables are substituted in string values using {`{{variableName}}`} syntax.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Live Demo</h2>
        {render(specification, { variables })}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Variable Editor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company-name" className="block text-sm font-medium mb-1">Company Name</label>
            <input
              id="company-name"
              type="text"
              value={variables.companyName}
              onChange={(e) => setVariables({ ...variables, companyName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="user-email" className="block text-sm font-medium mb-1">User Email</label>
            <input
              id="user-email"
              type="email"
              value={variables.userEmail}
              onChange={(e) => setVariables({ ...variables, userEmail: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="user-name" className="block text-sm font-medium mb-1">User Name</label>
            <input
              id="user-name"
              type="text"
              value={variables.user.name}
              onChange={(e) => setVariables({ ...variables, user: { ...variables.user, name: e.target.value } })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="user-role" className="block text-sm font-medium mb-1">User Role</label>
            <input
              id="user-role"
              type="text"
              value={variables.user.role}
              onChange={(e) => setVariables({ ...variables, user: { ...variables.user, role: e.target.value } })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="product-count" className="block text-sm font-medium mb-1">Product Count</label>
            <input
              id="product-count"
              type="number"
              value={variables.productCount}
              onChange={(e) => setVariables({ ...variables, productCount: Number.parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="is-active" className="block text-sm font-medium mb-1">Is Active</label>
            <select
              id="is-active"
              value={String(variables.isActive)}
              onChange={(e) => setVariables({ ...variables, isActive: e.target.value === 'true' })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Code Example</h2>
        <CodeBlock code={specificationCode} language="typescript" />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Simple {`{{variableName}}`} syntax for variable substitution</li>
          <li>Support for nested properties using dot notation ({`{{user.name}}`})</li>
          <li>Reserved variables automatically available ({`{{currentYear}}`}, {`{{currentDate}}`}, etc.)</li>
          <li>HTML escaping by default to prevent XSS attacks</li>
          <li>Works with any string value in the JSON specification</li>
          <li>Type-safe with TypeScript support</li>
        </ul>
      </div>
    </div>
  )
}

export default TemplateVariablesPage