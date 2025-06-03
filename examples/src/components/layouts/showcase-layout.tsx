import { ReactNode } from "react";
import { Badge } from "../ui/badge";

interface ShowcaseLayoutProps {
  readonly title: string;
  readonly description: string;
  readonly badge?: string;
  readonly features?: string[];
  readonly children: ReactNode;
}

export function ShowcaseLayout({ 
  title, 
  description, 
  badge, 
  features, 
  children 
}: ShowcaseLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold">{title}</h1>
            {badge && <Badge variant="outline">{badge}</Badge>}
          </div>
          <p className="text-xl text-muted-foreground">{description}</p>
          
          {features && features.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <Badge key={index} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-12">
          {children}
        </div>
      </div>
    </div>
  );
}