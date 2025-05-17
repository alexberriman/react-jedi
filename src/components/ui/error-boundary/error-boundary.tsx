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
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
            We encountered an unexpected error
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Details</AlertTitle>
            <AlertDescription className="mt-2 font-mono text-sm">{error.message}</AlertDescription>
          </Alert>

          {process.env.NODE_ENV === "development" && (
            <details className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300">
                Stack Trace (Development Only)
              </summary>
              <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
        </CardContent>
        <CardFooter className="flex gap-4 justify-center">
          <Button onClick={resetError} variant="default" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button
            onClick={() => (globalThis.location.href = "/")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
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
