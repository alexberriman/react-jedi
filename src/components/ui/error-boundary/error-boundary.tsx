import * as React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "../button";
import { Alert, AlertDescription, AlertTitle } from "../alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error;
    errorInfo: React.ErrorInfo;
    resetError: () => void;
  }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

const DefaultErrorFallback: React.FC<{
  error: Error;
  errorInfo: React.ErrorInfo;
  resetError: () => void;
}> = ({ error, resetError }) => {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background via-background/95 to-background dark:from-background dark:via-background/95 dark:to-background overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-tl from-destructive/20 to-destructive/5 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>
      
      <Card className="max-w-2xl w-full shadow-2xl backdrop-blur-sm bg-card/95 border-destructive/20 relative animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto relative">
            <div className="w-20 h-20 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/30 to-destructive/10 rounded-full blur-xl animate-pulse" />
              <AlertCircle className="w-10 h-10 text-destructive relative z-10 animate-in spin-in duration-700" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-2 duration-700 animation-delay-200">
              Oops! Something went wrong
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-700 animation-delay-300">
              Don&apos;t worry, even the best code has bad days
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700 animation-delay-400">
          <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 backdrop-blur-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold">Error Details</AlertTitle>
            <AlertDescription className="mt-2 font-mono text-sm break-all">
              {error.message || "An unexpected error occurred"}
            </AlertDescription>
          </Alert>

          {process.env.NODE_ENV === "development" && error.stack && (
            <div className="relative">
              <button
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="w-full text-left p-4 bg-muted/50 hover:bg-muted/70 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    {isDetailsOpen ? "Hide" : "Show"} Stack Trace
                  </span>
                  <svg
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                      isDetailsOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {isDetailsOpen && (
                <div className="mt-2 p-4 bg-muted/30 rounded-lg overflow-hidden animate-in slide-in-from-top-2 duration-300">
                  <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all font-mono">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center animate-in fade-in slide-in-from-bottom-2 duration-700 animation-delay-500">
          <Button 
            onClick={resetError} 
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
          
          <Button
            onClick={() => (globalThis.location.href = "/")}
            variant="outline"
            size="lg"
            className="group relative overflow-hidden border-muted-foreground/20 hover:border-muted-foreground/40 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform duration-300" />
              Go Home
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;

      return (
        <>
          <FallbackComponent
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            resetError={this.resetError}
          />
        </>
      );
    }

    return <>{this.props.children}</>;
  }
}
