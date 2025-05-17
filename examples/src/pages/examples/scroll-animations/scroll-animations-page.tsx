import React from "react";
import {
  AnimationProvider,
  ScrollReveal,
  ScrollParallax,
  ScrollProgress,
  ScrollContainer,
  ScrollScale,
  ScrollTextReveal,
  scrollPresets,
} from "@banja/react-jedi";

export const ScrollAnimationsPage: React.FC = () => {
  const cards = [
    { id: 1, title: "Feature 1", description: "Amazing capability that enhances productivity" },
    { id: 2, title: "Feature 2", description: "Seamless integration with your workflow" },
    { id: 3, title: "Feature 3", description: "Advanced technology for better results" },
    { id: 4, title: "Feature 4", description: "Intuitive design that users love" },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "This product has transformed the way we work. Incredible!",
      author: "Sarah Johnson",
      role: "CEO at TechCorp",
    },
    {
      id: 2,
      quote: "The best investment we've made for our team's productivity.",
      author: "Michael Chen",
      role: "CTO at StartupXYZ",
    },
    {
      id: 3,
      quote: "Outstanding quality and exceptional customer support.",
      author: "Emily Davis",
      role: "Product Manager",
    },
  ];

  return (
    <AnimationProvider>
      <div className="min-h-screen bg-gray-50">
        <ScrollProgress color="#7c3aed" thickness={3} position="top" />
        
        {/* Hero Section with Parallax */}
        <section className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600">
          <ScrollParallax speed={0.5}>
            <div className="absolute inset-0 bg-black opacity-20" />
          </ScrollParallax>
          
          <div className="relative h-full flex items-center justify-center text-white text-center px-4">
            <div>
              <ScrollReveal animation="fadeIn">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  Scroll Animations
                </h1>
              </ScrollReveal>
              
              <ScrollReveal animation="slideUp" delay={0.2}>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
                  Experience the power of scroll-triggered animations
                </p>
              </ScrollReveal>
              
              <ScrollReveal animation="scaleIn" delay={0.4}>
                <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
                  Explore Below
                </button>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Animation Presets Showcase */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slideUp">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                Animation Presets
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.keys(scrollPresets).map((preset) => (
                <ScrollReveal
                  key={preset}
                  animation={preset as keyof typeof scrollPresets}
                  triggerOnce={false}
                >
                  <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                      {preset}
                    </h3>
                    <p className="text-gray-600">
                      Demonstrates the {preset} animation effect on scroll
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Parallax Section */}
        <section className="relative py-20 bg-gray-900 overflow-hidden">
          <ScrollParallax speed={0.3}>
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20" />
          </ScrollParallax>
          
          <ScrollParallax speed={-0.3}>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20" />
          </ScrollParallax>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
            <ScrollTextReveal
              text="Smooth parallax effects create depth and visual interest"
              className="text-3xl md:text-5xl font-bold"
            />
          </div>
        </section>

        {/* Staggered Cards */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slideUp">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                Staggered Animations
              </h2>
            </ScrollReveal>
            
            <ScrollContainer stagger={0.1} animation="slideUp">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                ))}
              </div>
            </ScrollContainer>
          </div>
        </section>

        {/* Scale on Scroll */}
        <section className="py-20 px-4 bg-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollScale startScale={0.7} endScale={1}>
              <div className="p-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Scale on Scroll
                </h2>
                <p className="text-xl">
                  This section scales up as you scroll through it
                </p>
              </div>
            </ScrollScale>
          </div>
        </section>

        {/* Text Reveal */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal animation="fadeIn">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                Word by Word Reveal
              </h2>
            </ScrollReveal>
            
            <div className="space-y-8">
              <ScrollTextReveal
                text="Transform your digital experience with cutting-edge animations"
                className="text-2xl md:text-4xl font-light text-gray-900 text-center"
                stagger={0.05}
              />
              
              <ScrollTextReveal
                text="Every scroll tells a story. Make yours unforgettable."
                className="text-xl md:text-3xl font-light text-gray-700 text-center"
                stagger={0.04}
              />
            </div>
          </div>
        </section>

        {/* Testimonials with Combined Effects */}
        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="fadeIn">
              <h2 className="text-4xl font-bold text-center text-white mb-16">
                What Our Users Say
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <ScrollParallax key={testimonial.id} speed={0.1 * (index + 1)}>
                  <ScrollReveal
                    animation="slideUp"
                    delay={index * 0.1}
                  >
                    <div className="p-6 bg-gray-800 rounded-lg">
                      <p className="text-gray-300 mb-4 italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div>
                        <p className="text-white font-semibold">
                          {testimonial.author}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </ScrollParallax>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="fadeIn">
              <p className="text-gray-600">
                Scroll animations powered by React Jedi
              </p>
            </ScrollReveal>
          </div>
        </footer>
      </div>
    </AnimationProvider>
  );
};