import React from 'react';
import { PageSection } from '@alexberriman/react-jedi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/ui/page-header';
import { ShowcaseWrapper } from '@/components/ui/showcase-wrapper';

function PageSectionShowcase() {
  return (
    <div className="pb-12">
      <PageHeader
        title="Page Section"
        description="A versatile wrapper block for creating cohesive marketing page sections with backgrounds, dividers, and animations."
      />

      <ShowcaseWrapper title="Basic Section">
        <PageSection
          heading={{
            title: "Welcome to Our Platform",
            subtitle: "Build amazing experiences with our powerful tools",
            alignment: "center"
          }}
          padding="lg"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
              <p className="text-muted-foreground">
                Get started in minutes with our intuitive interface and comprehensive documentation.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Powerful Features</h3>
              <p className="text-muted-foreground">
                Everything you need to build modern applications, from simple to complex.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Great Support</h3>
              <p className="text-muted-foreground">
                Our team is here to help you succeed with 24/7 support and resources.
              </p>
            </Card>
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
    </div>
  );
}

export default PageSectionShowcase;