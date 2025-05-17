import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useSmoothScroll } from "../../../hooks/use-smooth-scroll";
import { PageTransition } from "../../../components/layout/page-transition";
import { motion } from "framer-motion";

export function TransitionsPage() {
  const { scrollToSection } = useSmoothScroll();

  const sections = [
    { id: "section-1", title: "Hero Section", color: "from-blue-500 to-purple-600" },
    { id: "section-2", title: "Features", color: "from-green-500 to-teal-600" },
    { id: "section-3", title: "Testimonials", color: "from-orange-500 to-red-600" },
    { id: "section-4", title: "Contact", color: "from-indigo-500 to-pink-600" },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <PageTransition variant="slideUp">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Page Transitions & Smooth Scroll</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                This page demonstrates smooth scrolling between sections and page transitions.
                Navigate to different pages to see the transition effects in action.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    variant="outline"
                  >
                    Scroll to {section.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </PageTransition>

        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`min-h-[70vh] rounded-lg p-8 mb-8 bg-gradient-to-br ${section.color} text-white flex items-center justify-center`}
          >
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4">{section.title}</h2>
              <p className="text-xl opacity-90">
                Section {index + 1} of {sections.length}
              </p>
            </div>
          </motion.section>
        ))}
      </div>
    </>
  );
}
