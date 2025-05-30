import React, { useEffect, useState } from 'react'
import { usePageMetadata } from '../../lib/meta'
import { Link, useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Code } from '../../components/ui/code'
import { render } from '@banja/react-jedi'

export default function TextShowcase() {
  usePageMetadata({
    title: 'Text Component - React Jedi Showcase',
    description: 'Comprehensive showcase of the Text component with variations and props'
  })

  const location = useLocation()
  const [activeSection, setActiveSection] = useState('basic-usage')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      const scrollPosition = window.scrollY + 100

      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const bottom = top + rect.height

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(section.getAttribute('data-section') || '')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const tableOfContents = [
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'weights', label: 'Font Weights' },
    { id: 'alignment', label: 'Text Alignment' },
    { id: 'transformations', label: 'Text Transformations' },
    { id: 'decorations', label: 'Text Decorations' },
    { id: 'gradients', label: 'Gradient Effects' },
    { id: 'shadows', label: 'Shadow Effects' },
    { id: 'animations', label: 'Animations' },
    { id: 'truncation', label: 'Text Truncation' },
    { id: 'line-height', label: 'Line Height' },
    { id: 'letter-spacing', label: 'Letter Spacing' },
    { id: 'props', label: 'Component Props' },
    { id: 'examples', label: 'Real-World Examples' }
  ]

  const basicUsageSpec = {
    component: 'Text',
    properties: {
      children: 'Hello, this is a basic text component rendered from JSON!'
    }
  }

  const variantsSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 4,
      children: [
        { component: 'Text', properties: { variant: 'default', children: 'Default variant' } },
        { component: 'Text', properties: { variant: 'primary', children: 'Primary variant' } },
        { component: 'Text', properties: { variant: 'secondary', children: 'Secondary variant' } },
        { component: 'Text', properties: { variant: 'accent', children: 'Accent variant' } },
        { component: 'Text', properties: { variant: 'muted', children: 'Muted variant' } },
        { component: 'Text', properties: { variant: 'destructive', children: 'Destructive variant' } }
      ]
    }
  }

  const sizesSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 4,
      children: [
        { component: 'Text', properties: { size: 'xs', children: 'Extra small text (xs)' } },
        { component: 'Text', properties: { size: 'sm', children: 'Small text (sm)' } },
        { component: 'Text', properties: { size: 'base', children: 'Base text (base)' } },
        { component: 'Text', properties: { size: 'lg', children: 'Large text (lg)' } },
        { component: 'Text', properties: { size: 'xl', children: 'Extra large text (xl)' } },
        { component: 'Text', properties: { size: '2xl', children: '2X large text (2xl)' } },
        { component: 'Text', properties: { size: '3xl', children: '3X large text (3xl)' } }
      ]
    }
  }

  const weightsSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 4,
      children: [
        { component: 'Text', properties: { weight: 'thin', children: 'Thin weight' } },
        { component: 'Text', properties: { weight: 'extralight', children: 'Extra light weight' } },
        { component: 'Text', properties: { weight: 'light', children: 'Light weight' } },
        { component: 'Text', properties: { weight: 'normal', children: 'Normal weight' } },
        { component: 'Text', properties: { weight: 'medium', children: 'Medium weight' } },
        { component: 'Text', properties: { weight: 'semibold', children: 'Semibold weight' } },
        { component: 'Text', properties: { weight: 'bold', children: 'Bold weight' } },
        { component: 'Text', properties: { weight: 'extrabold', children: 'Extra bold weight' } },
        { component: 'Text', properties: { weight: 'black', children: 'Black weight' } }
      ]
    }
  }

  const alignmentSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 4,
      children: [
        { component: 'Text', properties: { align: 'left', children: 'Left aligned text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.' } },
        { component: 'Text', properties: { align: 'center', children: 'Center aligned text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.' } },
        { component: 'Text', properties: { align: 'right', children: 'Right aligned text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.' } },
        { component: 'Text', properties: { align: 'justify', children: 'Justified text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' } }
      ]
    }
  }

  const transformationsSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 4,
      children: [
        { component: 'Text', properties: { transform: 'uppercase', children: 'uppercase transformation' } },
        { component: 'Text', properties: { transform: 'lowercase', children: 'LOWERCASE TRANSFORMATION' } },
        { component: 'Text', properties: { transform: 'capitalize', children: 'capitalize each word' } },
        { component: 'Text', properties: { transform: 'normal', children: 'Normal Transformation' } }
      ]
    }
  }

  const decorationsSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 4,
      children: [
        { component: 'Text', properties: { decoration: 'underline', children: 'Underlined text' } },
        { component: 'Text', properties: { decoration: 'line-through', children: 'Line-through text' } },
        { component: 'Text', properties: { italic: true, children: 'Italic text' } },
        { component: 'Text', properties: { decoration: 'underline', italic: true, weight: 'bold', children: 'Combined decorations' } }
      ]
    }
  }

  const gradientsSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 6,
      children: [
        { component: 'Text', properties: { gradient: 'primary', size: 'xl', weight: 'bold', children: 'Primary gradient' } },
        { component: 'Text', properties: { gradient: 'rainbow', size: 'xl', weight: 'bold', children: 'Rainbow gradient' } },
        { component: 'Text', properties: { gradient: 'sunset', size: 'xl', weight: 'bold', children: 'Sunset gradient' } },
        { component: 'Text', properties: { gradient: 'ocean', size: 'xl', weight: 'bold', children: 'Ocean gradient' } },
        { component: 'Text', properties: { gradient: 'neon', size: 'xl', weight: 'bold', children: 'Neon gradient' } },
        { component: 'Text', properties: { gradient: 'golden', size: 'xl', weight: 'bold', children: 'Golden gradient' } }
      ]
    }
  }

  const shadowsSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 6,
      children: [
        { component: 'Text', properties: { shadow: 'sm', size: 'lg', children: 'Small shadow' } },
        { component: 'Text', properties: { shadow: 'md', size: 'lg', children: 'Medium shadow' } },
        { component: 'Text', properties: { shadow: 'lg', size: 'lg', children: 'Large shadow' } },
        { component: 'Text', properties: { shadow: 'xl', size: 'lg', children: 'Extra large shadow' } },
        { component: 'Text', properties: { shadow: '2xl', size: 'lg', children: '2X large shadow' } }
      ]
    }
  }

  const animationsSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 6,
      children: [
        { component: 'Text', properties: { animation: 'glow', size: 'lg', weight: 'bold', children: 'Glowing text' } },
        { component: 'Text', properties: { animation: 'pulse', size: 'lg', weight: 'bold', children: 'Pulsing text' } },
        { component: 'Text', properties: { animation: 'bounce', size: 'lg', weight: 'bold', children: 'Bouncing text' } },
        { component: 'Text', properties: { animation: 'shimmer', size: 'lg', weight: 'bold', children: 'Shimmering text' } }
      ]
    }
  }

  const truncationSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 6,
      className: 'max-w-md',
      children: [
        { 
          component: 'Text', 
          properties: { 
            truncate: 'ellipsis', 
            children: 'This is a very long text that will be truncated with ellipsis when it exceeds the container width. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' 
          } 
        },
        { 
          component: 'Text', 
          properties: { 
            truncate: 'multiline', 
            children: 'This is a multiline text that will be truncated after 2 lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' 
          } 
        },
        { 
          component: 'Text', 
          properties: { 
            truncate: 'multiline-3', 
            children: 'This text truncates after 3 lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.' 
          } 
        }
      ]
    }
  }

  const lineHeightSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 6,
      children: [
        { 
          component: 'Text', 
          properties: { 
            lineHeight: 'tight',
            children: 'Tight line height - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
          } 
        },
        { 
          component: 'Text', 
          properties: { 
            lineHeight: 'normal',
            children: 'Normal line height - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
          } 
        },
        { 
          component: 'Text', 
          properties: { 
            lineHeight: 'loose',
            children: 'Loose line height - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
          } 
        }
      ]
    }
  }

  const letterSpacingSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 6,
      children: [
        { component: 'Text', properties: { tracking: 'tighter', size: 'lg', children: 'Tighter letter spacing' } },
        { component: 'Text', properties: { tracking: 'tight', size: 'lg', children: 'Tight letter spacing' } },
        { component: 'Text', properties: { tracking: 'normal', size: 'lg', children: 'Normal letter spacing' } },
        { component: 'Text', properties: { tracking: 'wide', size: 'lg', children: 'Wide letter spacing' } },
        { component: 'Text', properties: { tracking: 'wider', size: 'lg', children: 'Wider letter spacing' } },
        { component: 'Text', properties: { tracking: 'widest', size: 'lg', children: 'Widest letter spacing' } }
      ]
    }
  }

  const realWorldExamplesSpec = {
    component: 'Flex',
    properties: {
      direction: 'column',
      gap: 8,
      children: [
        {
          component: 'Box',
          properties: {
            className: 'p-6 bg-white rounded-lg shadow-sm border',
            children: [
              { 
                component: 'Text', 
                properties: { 
                  element: 'h2',
                  size: '2xl', 
                  weight: 'bold',
                  gradient: 'primary',
                  className: 'mb-4',
                  children: 'Welcome to Our Platform' 
                } 
              },
              { 
                component: 'Text', 
                properties: { 
                  size: 'lg',
                  variant: 'muted',
                  lineHeight: 'relaxed',
                  className: 'mb-4',
                  children: 'Experience the power of modern web development with our cutting-edge tools and features.' 
                } 
              },
              {
                component: 'Flex',
                properties: {
                  gap: 4,
                  children: [
                    { 
                      component: 'Text', 
                      properties: { 
                        variant: 'primary',
                        weight: 'semibold',
                        decoration: 'underline',
                        children: 'Learn More' 
                      } 
                    },
                    { 
                      component: 'Text', 
                      properties: { 
                        variant: 'muted',
                        children: '•' 
                      } 
                    },
                    { 
                      component: 'Text', 
                      properties: { 
                        variant: 'primary',
                        weight: 'semibold',
                        decoration: 'underline',
                        children: 'Get Started' 
                      } 
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          component: 'Box',
          properties: {
            className: 'p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg',
            children: {
              component: 'Text',
              properties: {
                size: 'xl',
                weight: 'bold',
                shadow: '2xl',
                animation: 'shimmer',
                className: 'text-white text-center',
                children: '✨ Special Announcement ✨'
              }
            }
          }
        }
      ]
    }
  }

  const propsData = [
    { prop: 'element', type: 'string', default: '"p"', description: 'HTML element to render (p, span, div, blockquote, code, strong, em, small)' },
    { prop: 'variant', type: 'string', default: '"default"', description: 'Color variant (default, primary, secondary, accent, muted, destructive)' },
    { prop: 'size', type: 'string', default: '"base"', description: 'Text size (xs, sm, base, lg, xl, 2xl, 3xl)' },
    { prop: 'weight', type: 'string', default: '"normal"', description: 'Font weight (thin to black)' },
    { prop: 'align', type: 'string', default: '"left"', description: 'Text alignment (left, center, right, justify)' },
    { prop: 'transform', type: 'string', default: '"normal"', description: 'Text transformation (uppercase, lowercase, capitalize, normal)' },
    { prop: 'decoration', type: 'string', default: '"none"', description: 'Text decoration (none, underline, line-through)' },
    { prop: 'italic', type: 'boolean', default: 'false', description: 'Apply italic styling' },
    { prop: 'gradient', type: 'string', default: '"none"', description: 'Text gradient effect' },
    { prop: 'shadow', type: 'string', default: '"none"', description: 'Drop shadow effect' },
    { prop: 'animation', type: 'string', default: '"none"', description: 'Animation effect (glow, pulse, bounce, shimmer)' },
    { prop: 'truncate', type: 'string|boolean', default: 'false', description: 'Text truncation behavior' },
    { prop: 'wrap', type: 'string', default: '"normal"', description: 'Text wrapping behavior' },
    { prop: 'lineHeight', type: 'string', default: '"normal"', description: 'Line height (tight, snug, normal, relaxed, loose)' },
    { prop: 'tracking', type: 'string', default: '"normal"', description: 'Letter spacing (tighter to widest)' },
    { prop: 'children', type: 'ReactNode', default: '-', description: 'Text content to display' },
    { prop: 'className', type: 'string', default: '-', description: 'Additional CSS classes' }
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
        <div className="p-6">
          <Link to="/showcase" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ChevronLeft className="h-4 w-4" />
            Back to Showcase
          </Link>
          <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
          <nav className="space-y-2">
            {tableOfContents.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Text Component</h1>
          <p className="text-lg text-gray-600 mb-12">
            The Text component is a versatile typography element that supports various styling options,
            animations, and effects. It can render different HTML elements and provides extensive
            customization through props.
          </p>

          {/* Basic Usage */}
          <section data-section="basic-usage" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Basic Usage</h2>
            <p className="text-gray-600 mb-6">
              The Text component can be used to render any text content with just a simple JSON specification.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(basicUsageSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(basicUsageSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Variants */}
          <section data-section="variants" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Variants</h2>
            <p className="text-gray-600 mb-6">
              The Text component supports multiple color variants for different use cases.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(variantsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(variantsSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Sizes */}
          <section data-section="sizes" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sizes</h2>
            <p className="text-gray-600 mb-6">
              Choose from multiple size options to create visual hierarchy.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(sizesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(sizesSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Font Weights */}
          <section data-section="weights" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Font Weights</h2>
            <p className="text-gray-600 mb-6">
              Adjust font weight to emphasize or de-emphasize text.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(weightsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(weightsSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Text Alignment */}
          <section data-section="alignment" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Text Alignment</h2>
            <p className="text-gray-600 mb-6">
              Control text alignment within its container.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(alignmentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(alignmentSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Text Transformations */}
          <section data-section="transformations" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Text Transformations</h2>
            <p className="text-gray-600 mb-6">
              Apply text transformations without changing the source content.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(transformationsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(transformationsSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Text Decorations */}
          <section data-section="decorations" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Text Decorations</h2>
            <p className="text-gray-600 mb-6">
              Add decorative styles like underline, line-through, and italic.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(decorationsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(decorationsSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Gradient Effects */}
          <section data-section="gradients" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gradient Effects</h2>
            <p className="text-gray-600 mb-6">
              Apply beautiful gradient effects to make text stand out.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(gradientsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(gradientsSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Shadow Effects */}
          <section data-section="shadows" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shadow Effects</h2>
            <p className="text-gray-600 mb-6">
              Add depth to text with various shadow options.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(shadowsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(shadowsSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Animations */}
          <section data-section="animations" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Animations</h2>
            <p className="text-gray-600 mb-6">
              Bring text to life with subtle animation effects.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(animationsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(animationsSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Text Truncation */}
          <section data-section="truncation" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Text Truncation</h2>
            <p className="text-gray-600 mb-6">
              Handle long text gracefully with truncation options.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(truncationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(truncationSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Line Height */}
          <section data-section="line-height" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Line Height</h2>
            <p className="text-gray-600 mb-6">
              Control the vertical spacing between lines of text.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(lineHeightSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(lineHeightSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Letter Spacing */}
          <section data-section="letter-spacing" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Letter Spacing</h2>
            <p className="text-gray-600 mb-6">
              Adjust the spacing between individual letters.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(letterSpacingSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(letterSpacingSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Component Props */}
          <section data-section="props" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Component Props</h2>
            <p className="text-gray-600 mb-6">
              Complete reference of all available props for the Text component.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Prop</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Type</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Default</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {propsData.map((prop, index) => (
                    <tr key={prop.prop} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm font-mono text-gray-900">{prop.prop}</td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">{prop.type}</td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">{prop.default}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Real-World Examples */}
          <section data-section="examples" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Real-World Examples</h2>
            <p className="text-gray-600 mb-6">
              See how the Text component can be used in practical scenarios.
            </p>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              {render(realWorldExamplesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View JSON Specification
              </summary>
              <div className="mt-2">
                <Code language="json" code={JSON.stringify(realWorldExamplesSpec, null, 2)} />
              </div>
            </details>
          </section>

          {/* Navigation Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link 
                to="/showcase/switch" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Switch Component
              </Link>
              <Link 
                to="/showcase/toast" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Toast Component
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}