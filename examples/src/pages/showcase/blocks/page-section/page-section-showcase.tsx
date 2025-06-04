import React from 'react';
import { PageSection } from '@alexberriman/react-jedi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/ui/page-header';
import { ShowcaseWrapper } from '@/components/ui/showcase-wrapper';
import { Check, Star, ArrowRight, Shield, Rocket, Target, Globe } from 'lucide-react';

function PageSectionShowcase() {
  return (
    <div className="pb-12">
      <PageHeader
        title="Page Section"
        description="A versatile wrapper block for creating cohesive marketing page sections with backgrounds, dividers, and animations."
      />

      <ShowcaseWrapper title="Hero Section">
        <PageSection
          layout={{ type: 'hero' }}
          background={{
            type: 'gradient',
            value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
          heading={{
            title: "Build Something Amazing Today",
            subtitle: "The modern platform for creating exceptional digital experiences",
            alignment: "center"
          }}
          description="Join thousands of developers who are building the future with our powerful tools and intuitive APIs."
          ctas={[
            { text: 'Start Free Trial', size: 'lg' },
            { text: 'Watch Demo', variant: 'outline', size: 'lg' }
          ]}
          padding="2xl"
        >
          <div className="flex gap-8 justify-center text-white mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm opacity-80">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm opacity-80">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Feature Section with Image">
        <PageSection
          layout={{
            type: 'image-left',
            imageUrl: 'https://picsum.photos/600/400',
            imageAlt: 'Feature demonstration',
            imageZoomOnHover: true,
            imageShadow: true,
            contentSpacing: 'relaxed'
          }}
          heading={{
            title: 'Powerful Analytics Dashboard',
            subtitle: 'Real-time insights at your fingertips',
          }}
          description='Track performance, monitor user behavior, and make data-driven decisions with our comprehensive analytics suite.'
          ctas={[
            { text: 'Learn More', href: '#' },
            { text: 'See Demo', variant: 'outline', href: '#' }
          ]}
          padding='xl'
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Real-time data visualization</div>
                <div className="text-sm text-muted-foreground">See your metrics update in real-time with beautiful charts</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Custom dashboards</div>
                <div className="text-sm text-muted-foreground">Create personalized views for different team members</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Export reports</div>
                <div className="text-sm text-muted-foreground">Generate PDF and Excel reports with one click</div>
              </div>
            </div>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Gradient Background">
        <PageSection
          variant="full-width"
          background={{
            type: "gradient",
            value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          }}
          heading={{
            title: "Stand Out with Gradients",
            subtitle: "Create beautiful sections with gradient backgrounds",
            alignment: "center"
          }}
          padding="xl"
        >
          <div className="text-white text-center">
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Gradients add visual interest and help create distinct sections that guide users through your content.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/20">
                Get Started
              </Button>
            </div>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Wave Dividers">
        <PageSection
          variant="full-width"
          background={{
            type: "color",
            value: "#0ea5e9"
          }}
          dividerTop="wave"
          dividerBottom="wave"
          dividerColor="#ffffff"
          heading={{
            title: "Smooth Transitions",
            subtitle: "Use wave dividers for elegant section transitions",
            alignment: "center"
          }}
          padding="xl"
        >
          <div className="text-white">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">100+</div>
                <p>Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">50K</div>
                <p>Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">99%</div>
                <p>Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Split Background">
        <PageSection
          variant="split"
          background={{
            type: "gradient",
            value: "linear-gradient(to right, #4f46e5 0%, #4f46e5 50%, #f3f4f6 50%, #f3f4f6 100%)"
          }}
          padding="xl"
        >
          <div className="text-white">
            <Badge className="mb-4" variant="secondary">New Feature</Badge>
            <h3 className="text-3xl font-bold mb-4">Split Layout Design</h3>
            <p className="text-lg mb-6">
              Create visually distinct content areas with split backgrounds that naturally guide the eye.
            </p>
            <Button variant="secondary">Explore Features</Button>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">Perfect Balance</h3>
            <p className="text-lg text-muted-foreground mb-6">
              The split design creates a natural visual hierarchy, making it easy to present contrasting or complementary content side by side.
            </p>
            <Button>View Examples</Button>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Angled Dividers">
        <PageSection
          variant="contained"
          background={{
            type: "gradient",
            value: "linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)"
          }}
          dividerTop="angle"
          dividerBottom="angle"
          dividerColor="#ffffff"
          heading={{
            title: "Modern Angular Design",
            subtitle: "Sharp angles create a dynamic, contemporary look",
            alignment: "center"
          }}
          padding="lg"
        >
          <div className="text-white text-center">
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Angled dividers add energy and movement to your design, perfect for modern brands that want to convey innovation and forward-thinking.
            </p>
            <Button variant="secondary" size="lg">
              Discover More
            </Button>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Background Pattern">
        <PageSection
          variant="contained"
          background={{
            type: "pattern",
            value: "dots"
          }}
          heading={{
            title: "Subtle Patterns",
            subtitle: "Add texture without overwhelming your content",
            alignment: "center"
          }}
          padding="lg"
        >
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg mb-8">
              Background patterns provide subtle visual interest that enhances your content without distracting from it. Perfect for adding depth to minimalist designs.
            </p>
            <div className="flex gap-4 justify-center">
              <Button>Primary Action</Button>
              <Button variant="outline">Secondary Action</Button>
            </div>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Animated Section">
        <PageSection
          variant="full-width"
          background={{
            type: "gradient",
            value: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)"
          }}
          animate={true}
          animationType="slide"
          heading={{
            title: "Scroll-Triggered Animations",
            subtitle: "Content that comes alive as users scroll",
            alignment: "center"
          }}
          padding="xl"
        >
          <div className="text-white">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 bg-white/10 backdrop-blur border-white/20">
                <h3 className="text-2xl font-bold mb-4">Engage Users</h3>
                <p className="text-white/90">
                  Animations draw attention to important content and create a more dynamic user experience.
                </p>
              </Card>
              <Card className="p-8 bg-white/10 backdrop-blur border-white/20">
                <h3 className="text-2xl font-bold mb-4">Guide the Journey</h3>
                <p className="text-white/90">
                  Use animations to reveal content progressively and guide users through your story.
                </p>
              </Card>
            </div>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Curved Dividers">
        <PageSection
          variant="full-width"
          background={{
            type: "color",
            value: "#10b981"
          }}
          dividerTop="curve"
          dividerBottom="curve"
          dividerColor="#ffffff"
          heading={{
            title: "Elegant Curves",
            subtitle: "Soft curves create a friendly, approachable design",
            alignment: "center"
          }}
          padding="xl"
        >
          <div className="text-white text-center">
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Curved dividers soften the transitions between sections, creating a more organic flow that feels natural and inviting.
            </p>
            <div className="inline-flex gap-4">
              <Button variant="secondary" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/20">
                Schedule Demo
              </Button>
            </div>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Minimal Padding">
        <PageSection
          variant="contained"
          padding="sm"
          background={{
            type: "color",
            value: "#fef3c7"
          }}
          contentAlignment="center"
        >
          <p className="text-lg">
            Sometimes less is more. Minimal padding creates a compact, efficient layout.
          </p>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Extra Large Padding">
        <PageSection
          variant="contained"
          padding="2xl"
          background={{
            type: "gradient",
            value: "linear-gradient(to bottom, #e0e7ff, #c7d2fe)"
          }}
          heading={{
            title: "Room to Breathe",
            subtitle: "Extra padding creates visual hierarchy and emphasis",
            alignment: "center"
          }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl mb-8">
              When you have something important to say, give it the space it deserves. Extra padding helps your message stand out.
            </p>
            <Button size="lg">Take Action Now</Button>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Services Grid">
        <PageSection
          variant="contained"
          layout={{ type: 'default', contentWidth: 'wide' }}
          heading={{
            title: 'Everything You Need to Succeed',
            subtitle: 'Comprehensive solutions for modern businesses',
            alignment: 'center',
          }}
          padding="xl"
          background={{
            type: 'gradient',
            value: 'linear-gradient(to bottom, #f9fafb, #ffffff)',
          }}
        >
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Deployment</h3>
              <p className="text-muted-foreground mb-4">
                Get up and running in minutes with our streamlined setup process and comprehensive documentation.
              </p>
              <Button variant="ghost" className="p-0 h-auto font-medium">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Precision Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Make informed decisions with detailed insights and real-time data visualization tools.
              </p>
              <Button variant="ghost" className="p-0 h-auto font-medium">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Scale</h3>
              <p className="text-muted-foreground mb-4">
                Reach users worldwide with our distributed infrastructure and multi-region support.
              </p>
              <Button variant="ghost" className="p-0 h-auto font-medium">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Card>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Alternating Features">
        <PageSection
          layout={{
            type: 'feature-alternating',
            imageUrl: 'https://picsum.photos/600/400?random=5',
            imageAlt: 'Feature 1',
            imageZoomOnHover: true,
            imageShadow: true,
          }}
          heading={{
            title: 'Lightning Fast Performance',
            subtitle: 'Built for speed from the ground up',
          }}
          description='Experience blazing fast load times and smooth interactions that keep your users engaged.'
          padding="xl"
          alternateBackground
          sectionIndex={0}
        >
          <div className="space-y-6">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50ms</div>
              <div className="text-sm text-muted-foreground">Average response time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.99%</div>
              <div className="text-sm text-muted-foreground">Uptime guarantee</div>
            </div>
          </div>
        </PageSection>
        
        <PageSection
          layout={{
            type: 'feature-alternating',
            imageUrl: 'https://picsum.photos/600/400?random=6',
            imageAlt: 'Feature 2',
            imageZoomOnHover: true,
            imageShadow: true,
          }}
          heading={{
            title: 'Enterprise-Grade Security',
            subtitle: 'Your data is safe with us',
          }}
          description='Bank-level encryption and security measures to protect your most sensitive information.'
          padding="xl"
          alternateBackground
          sectionIndex={1}
        >
          <div className="space-y-4">
            <Badge className="mb-4">SOC 2 Certified</Badge>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>256-bit SSL encryption</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>GDPR compliant</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Regular security audits</span>
              </li>
            </ul>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Call to Action">
        <PageSection
          variant="full-width"
          layout={{ type: 'centered' }}
          background={{
            type: 'gradient',
            value: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          }}
          padding='2xl'
          dividerTop="wave"
          dividerBottom="wave"
          dividerColor="#ffffff"
          animate={true}
          animationType="zoom"
          heading={{
            title: 'Ready to Get Started?',
            subtitle: 'Join thousands of satisfied customers today',
            alignment: 'center',
          }}
          description='Start your free trial today and see the difference. No credit card required.'
          ctas={[
            { text: 'Start Free Trial', variant: 'secondary', size: 'lg' },
            { text: 'Schedule Demo', variant: 'outline', size: 'lg' }
          ]}
        >
          <div className="text-white text-center mt-8">
            <p className="text-sm opacity-80">
              ✓ 14-day free trial ✓ No credit card required ✓ Cancel anytime
            </p>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Stats Section">
        <PageSection
          variant="contained"
          layout={{ type: 'centered' }}
          heading={{
            title: 'Trusted by Industry Leaders',
            subtitle: 'Our numbers speak for themselves',
            alignment: 'center',
          }}
          padding="xl"
          background={{
            type: 'color',
            value: '#f9fafb',
          }}
        >
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-lg font-medium mb-1">Active Users</div>
              <div className="text-sm text-muted-foreground">Growing every day</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-lg font-medium mb-1">Uptime SLA</div>
              <div className="text-sm text-muted-foreground">Industry leading reliability</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-lg font-medium mb-1">Customer Rating</div>
              <div className="text-sm text-muted-foreground">Based on 1000+ reviews</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-lg font-medium mb-1">Support Team</div>
              <div className="text-sm text-muted-foreground">Always here to help</div>
            </div>
          </div>
        </PageSection>
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Testimonials">
        <PageSection
          variant="full-width"
          layout={{ type: 'default' }}
          heading={{
            title: 'What Our Customers Say',
            subtitle: 'Don\'t just take our word for it',
            alignment: 'center',
          }}
          padding="xl"
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({length: 5}).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &ldquo;This platform has transformed how we work. The intuitive interface and powerful features have boosted our productivity significantly.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://picsum.photos/40/40?random=10" 
                    alt="Customer" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">CEO, TechCorp</div>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({length: 5}).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &ldquo;The customer support is exceptional. They&apos;re always available and go above and beyond to ensure we&apos;re successful.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://picsum.photos/40/40?random=11" 
                    alt="Customer" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">CTO, StartupXYZ</div>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({length: 5}).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &ldquo;Best investment we&apos;ve made this year. The ROI has been incredible, and our team loves using it every day.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://picsum.photos/40/40?random=12" 
                    alt="Customer" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">Emily Davis</div>
                    <div className="text-sm text-muted-foreground">Product Manager, InnovateCo</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </PageSection>
      </ShowcaseWrapper>
    </div>
  );
}

export default PageSectionShowcase;