import { describe, expect, it } from 'vitest'
import {
  extractTemplateVariables,
  hasTemplateVariables,
  processJsonTemplate,
  processTemplate,
} from './template-engine'

describe('template-engine', () => {
  describe('processTemplate', () => {
    it('should replace simple variables', () => {
      const template = 'Hello {{name}}!'
      const variables = { name: 'World' }
      const result = processTemplate(template, variables)
      
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.val).toBe('Hello World!')
      }
    })

    it('should handle multiple variables', () => {
      const template = '{{greeting}} {{name}}, welcome to {{place}}!'
      const variables = {
        greeting: 'Hello',
        name: 'Alice',
        place: 'React Jedi',
      }
      const result = processTemplate(template, variables)
      
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.val).toBe('Hello Alice, welcome to React Jedi!')
      }
    })

    it('should handle nested properties', () => {
      const template = 'User: {{user.name}} ({{user.email}})'
      const variables = {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      }
      const result = processTemplate(template, variables)
      
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.val).toBe('User: John Doe (john@example.com)')
      }
    })

    it('should handle deeply nested properties', () => {
      const template = 'Location: {{company.address.city}}, {{company.address.country}}'
      const variables = {
        company: {
          address: {
            city: 'San Francisco',
            country: 'USA',
          },
        },
      }
      const result = processTemplate(template, variables)
      
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.val).toBe('Location: San Francisco, USA')
      }
    })

    it('should handle spaces around variable names', () => {
      const template = 'Hello {{ name }} and {{  friend  }}!'
      const variables = { name: 'Alice', friend: 'Bob' }
      const result = processTemplate(template, variables)
      
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.val).toBe('Hello Alice and Bob!')
      }
    })

    it('should include reserved variables', () => {
      const template = 'Copyright {{currentYear}} - {{currentMonth}}/{{currentDay}}'
      const result = processTemplate(template)
      
      expect(result.ok).toBe(true)
      const processed = result.ok ? result.val : ''
      expect(processed).toMatch(/Copyright \d{4} - \d{1,2}\/\d{1,2}/)
    })

    it('should allow overriding reserved variables', () => {
      const template = 'Year: {{currentYear}}'
      const variables = { currentYear: 2050 }
      const result = processTemplate(template, variables)
      
      expect(result.ok).toBe(true)
      expect(result.ok ? result.val : '').toBe('Year: 2050')
    })

    it('should escape HTML by default', () => {
      const template = 'Message: {{message}}'
      const variables = { message: '<script>alert("XSS")</script>' }
      const result = processTemplate(template, variables)
      
      expect(result.ok).toBe(true)
      expect(result.ok ? result.val : '').toBe('Message: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;')
    })

    it('should allow disabling HTML escaping', () => {
      const template = 'HTML: {{content}}'
      const variables = { content: '<strong>Bold</strong>' }
      const result = processTemplate(template, variables, { escapeHtml: false })
      
      expect(result.ok).toBe(true)
      expect(result.ok ? result.val : '').toBe('HTML: <strong>Bold</strong>')
    })

    it('should keep placeholders for missing variables by default', () => {
      const template = 'Hello {{name}}, your email is {{email}}'
      const variables = { name: 'Alice' }
      const result = processTemplate(template, variables)
      
      expect(result.ok).toBe(true)
      expect(result.ok ? result.val : '').toBe('Hello Alice, your email is {{email}}')
    })

    it('should use empty string for missing variables with fallbackOnMissing', () => {
      const template = 'Hello {{name}}, your email is {{email}}'
      const variables = { name: 'Alice' }
      const result = processTemplate(template, variables, { fallbackOnMissing: true })
      
      expect(result.ok).toBe(true)
      expect(result.ok ? result.val : '').toBe('Hello Alice, your email is ')
    })

    it('should handle boolean and number values', () => {
      const template = 'Active: {{active}}, Count: {{count}}'
      const variables = { active: true, count: 42 }
      const result = processTemplate(template, variables)
      
      expect(result.ok).toBe(true)
      expect(result.ok ? result.val : '').toBe('Active: true, Count: 42')
    })

    it('should handle empty template', () => {
      const result = processTemplate('', {})
      
      expect(result.ok).toBe(true)
      expect(result.ok ? result.val : '').toBe('')
    })

    it('should handle template without variables', () => {
      const template = 'Just plain text'
      const result = processTemplate(template)
      
      expect(result.ok).toBe(true)
      expect(result.ok ? result.val : '').toBe('Just plain text')
    })

    it('should handle invalid nested paths gracefully', () => {
      const template = '{{user.address.street.number}}'
      const variables = { user: { name: 'John' } }
      const result = processTemplate(template, variables)
      
      expect(result.ok).toBe(true)
      expect(result.ok ? result.val : '').toBe('{{user.address.street.number}}')
    })
  })

  describe('processJsonTemplate', () => {
    it('should process strings in objects', () => {
      const json = {
        title: 'Welcome {{name}}',
        description: 'You joined on {{currentDate}}',
      }
      const variables = { name: 'Alice' }
      const result = processJsonTemplate(json, variables)
      
      expect(result.ok).toBe(true)
      if (!result.ok) throw new Error('Failed to process')
      const processed = result.val
      expect(processed.title).toBe('Welcome Alice')
      expect(processed.description).toMatch(/You joined on \d{4}-\d{2}-\d{2}/)
    })

    it('should process nested objects', () => {
      const json = {
        user: {
          greeting: 'Hello {{name}}',
          profile: {
            bio: 'I am {{age}} years old',
          },
        },
      }
      const variables = { name: 'Bob', age: 25 }
      const result = processJsonTemplate(json, variables)
      
      expect(result.ok).toBe(true)
      if (!result.ok) throw new Error('Failed to process')
      const processed = result.val
      expect(processed.user.greeting).toBe('Hello Bob')
      expect(processed.user.profile.bio).toBe('I am 25 years old')
    })

    it('should process arrays', () => {
      const json = {
        items: [
          'First: {{first}}',
          'Second: {{second}}',
          { text: 'Third: {{third}}' },
        ],
      }
      const variables = { first: 'A', second: 'B', third: 'C' }
      const result = processJsonTemplate(json, variables)
      
      expect(result.ok).toBe(true)
      if (!result.ok) throw new Error('Failed to process')
      const processed = result.val
      expect(processed.items[0]).toBe('First: A')
      expect(processed.items[1]).toBe('Second: B')
      expect((processed.items[2] as { text: string }).text).toBe('Third: C')
    })

    it('should preserve non-string values', () => {
      const json = {
        text: 'Count: {{count}}',
        number: 42,
        boolean: true,
        null: null,
        array: [1, 2, 3],
      }
      const variables = { count: 10 }
      const result = processJsonTemplate(json, variables)
      
      expect(result.ok).toBe(true)
      if (!result.ok) throw new Error('Failed to process')
      const processed = result.val
      expect(processed.text).toBe('Count: 10')
      expect(processed.number).toBe(42)
      expect(processed.boolean).toBe(true)
      expect(processed.null).toBe(null)
      expect(processed.array).toEqual([1, 2, 3])
    })

    it('should handle complex nested structures', () => {
      const json = {
        components: [
          {
            type: 'heading',
            props: {
              text: '{{company}} - {{year}}',
              level: 1,
            },
          },
          {
            type: 'text',
            props: {
              content: 'Welcome to {{company}}',
              styles: {
                color: 'primary',
              },
            },
          },
        ],
      }
      const variables = { company: 'React Jedi', year: 2024 }
      const result = processJsonTemplate(json, variables)
      
      expect(result.ok).toBe(true)
      if (!result.ok) throw new Error('Failed to process')
      const processed = result.val
      expect(processed.components[0].props.text).toBe('React Jedi - 2024')
      expect(processed.components[1].props.content).toBe('Welcome to React Jedi')
    })
  })

  describe('hasTemplateVariables', () => {
    it('should detect template variables', () => {
      expect(hasTemplateVariables('Hello {{name}}')).toBe(true)
      expect(hasTemplateVariables('{{var1}} and {{var2}}')).toBe(true)
      expect(hasTemplateVariables('Text with {{ spaces }}')).toBe(true)
    })

    it('should return false for no variables', () => {
      expect(hasTemplateVariables('Plain text')).toBe(false)
      expect(hasTemplateVariables('')).toBe(false)
      expect(hasTemplateVariables('{ not a variable }')).toBe(false)
    })
  })

  describe('extractTemplateVariables', () => {
    it('should extract all variable names', () => {
      const template = 'Hello {{name}}, you are {{age}} years old'
      const variables = extractTemplateVariables(template)
      
      expect(variables).toEqual(['name', 'age'])
    })

    it('should handle duplicates', () => {
      const template = '{{name}} is {{name}} and {{age}}'
      const variables = extractTemplateVariables(template)
      
      expect(variables).toEqual(['name', 'age'])
    })

    it('should extract nested variable paths', () => {
      const template = '{{user.name}} - {{user.email}} - {{company.address.city}}'
      const variables = extractTemplateVariables(template)
      
      expect(variables).toEqual(['user.name', 'user.email', 'company.address.city'])
    })

    it('should handle spaces in variable names', () => {
      const template = '{{ name }} and {{  email  }}'
      const variables = extractTemplateVariables(template)
      
      expect(variables).toEqual(['name', 'email'])
    })

    it('should return empty array for no variables', () => {
      expect(extractTemplateVariables('No variables here')).toEqual([])
      expect(extractTemplateVariables('')).toEqual([])
    })
  })

  describe('reserved variables', () => {
    it('should provide all reserved variables', () => {
      const template = '{{currentYear}}-{{currentMonth}}-{{currentDay}} {{weekday}}'
      const result = processTemplate(template)
      
      expect(result.ok).toBe(true)
      const processed = result.ok ? result.val : ''
      
      // Verify format matches expected pattern
      expect(processed).toMatch(/\d{4}-\d{1,2}-\d{1,2} \w+/)
    })

    it('should provide timestamp', () => {
      const template = '{{timestamp}}'
      const result = processTemplate(template)
      
      expect(result.ok).toBe(true)
      const processed = result.ok ? result.val : ''
      const timestamp = Number.parseInt(processed)
      
      expect(timestamp).toBeGreaterThan(1_600_000_000_000) // After Sept 2020
      expect(timestamp).toBeLessThan(2_000_000_000_000) // Before 2033
    })
  })
})