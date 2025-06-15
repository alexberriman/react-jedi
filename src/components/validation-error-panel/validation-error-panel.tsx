import type { ValidationStageError } from "@/lib/parser/validation-pipeline";
import { ValidationSeverity } from "@/lib/validation/validator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ChevronDown, ChevronUp, Copy, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ValidationErrorPanelProperties {
  readonly errors: ValidationStageError[];
  readonly className?: string;
  readonly animated?: boolean;
  readonly onDismiss?: () => void;
}

const STORAGE_KEY = "react-jedi-validation-panel-collapsed";

function ValidationErrorPanel({
  errors,
  className,
  animated = true,
  onDismiss,
}: ValidationErrorPanelProperties) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (globalThis.window !== undefined) {
      return localStorage.getItem(STORAGE_KEY) === "true";
    }
    return false;
  });
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (globalThis.window !== undefined) {
      localStorage.setItem(STORAGE_KEY, String(isCollapsed));
    }
  }, [isCollapsed]);

  if (isDismissed || errors.length === 0) {
    return null;
  }

  const errorCount = errors.filter((error_) => error_.severity === ValidationSeverity.ERROR).length;
  const warningCount = errors.filter((error_) => error_.severity === ValidationSeverity.WARNING).length;
  const infoCount = errors.filter((error_) => error_.severity === ValidationSeverity.INFO).length;

  function copyErrorReport() {
    const report = errors
      .map((error_) => {
        const parts = [`[${error_.severity}] ${error_.message}`];
        if (error_.path) parts.push(`  Path: ${error_.path.join(".")}`);
        if (error_.invalidValue !== undefined) parts.push(`  Value: ${JSON.stringify(error_.invalidValue)}`);
        if (error_.suggestions?.length) {
          parts.push(`  Suggestions:`);
          for (const suggestion of error_.suggestions) {
            parts.push(`    - ${suggestion}`);
          }
        }
        return parts.join("\n");
      })
      .join("\n\n");

    navigator.clipboard.writeText(report);
  }

  function handleDismiss() {
    setIsDismissed(true);
    onDismiss?.();
  }

  const MotionComponent = animated ? motion.div : "div";
  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
        transition: { duration: 0.2, ease: "easeOut" },
      }
    : {};

  return (
    <AnimatePresence>
      <MotionComponent
        className={cn("fixed bottom-4 right-4 z-50 max-w-md", className)}
        {...animationProps}
      >
        <Card className="border-destructive/20 shadow-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Validation Issues
              </CardTitle>
              <div className="flex items-center gap-2">
                {errorCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {errorCount} {errorCount === 1 ? "error" : "errors"}
                  </Badge>
                )}
                {warningCount > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {warningCount} {warningCount === 1 ? "warning" : "warnings"}
                  </Badge>
                )}
                {infoCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {infoCount} info
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={handleDismiss}
                  aria-label="Dismiss validation panel"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <Alert variant="destructive" className="mb-3">
              <AlertDescription className="text-sm">
                Your UI specification contains validation issues that may cause rendering problems.
              </AlertDescription>
            </Alert>

            <Collapsible open={!isCollapsed} onOpenChange={(open) => setIsCollapsed(!open)}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex w-full items-center justify-between p-0 hover:bg-transparent"
                >
                  <span className="text-sm font-medium">Details</span>
                  {isCollapsed ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-3">
                <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
                  {errors.map((error_, index) => (
                    <div key={index}>
                      <div className="space-y-1">
                        <div className="flex items-start gap-2">
                          <Badge
                            variant={(() => {
                              if (error_.severity === ValidationSeverity.ERROR) return "destructive";
                              if (error_.severity === ValidationSeverity.WARNING) return "outline";
                              return "secondary";
                            })()}
                            className="mt-0.5 text-xs"
                          >
                            {error_.severity}
                          </Badge>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm leading-snug">{error_.message}</p>
                            {error_.path && (
                              <p className="font-mono text-xs text-muted-foreground">
                                {error_.path.join(".")}
                              </p>
                            )}
                            {error_.invalidValue !== undefined && (
                              <p className="font-mono text-xs text-muted-foreground">
                                Value: {JSON.stringify(error_.invalidValue)}
                              </p>
                            )}
                            {error_.suggestions && error_.suggestions.length > 0 && (
                              <div className="mt-2 space-y-1">
                                <p className="text-xs font-medium">Suggestions:</p>
                                <ul className="list-inside list-disc space-y-0.5">
                                  {error_.suggestions.map((suggestion, suggestionIndex) => (
                                    <li key={suggestionIndex} className="text-xs text-muted-foreground">
                                      {suggestion}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {index < errors.length - 1 && <Separator className="mt-3" />}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>

          <CardFooter className="gap-2 pt-3">
            <Button onClick={copyErrorReport} variant="outline" size="sm" className="h-8">
              <Copy className="mr-2 h-3 w-3" />
              Copy Report
            </Button>
            <Button onClick={handleDismiss} variant="ghost" size="sm" className="h-8">
              Dismiss
            </Button>
          </CardFooter>
        </Card>
      </MotionComponent>
    </AnimatePresence>
  );
}

export { ValidationErrorPanel };