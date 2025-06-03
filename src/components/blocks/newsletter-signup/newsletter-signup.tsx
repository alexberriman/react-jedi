import * as React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog";
import { CheckCircle2, X, Gift, ArrowRight } from "lucide-react";

export interface NewsletterBenefit {
  readonly text: string;
  readonly icon?: React.ReactNode;
}

export interface NewsletterIncentive {
  readonly title: string;
  readonly description: string;
  readonly icon?: React.ReactNode;
}

export interface NewsletterSignupProperties {
  readonly variant?: "inline" | "modal" | "slide-in" | "footer-bar" | "with-incentive";
  readonly title?: string;
  readonly description?: string;
  readonly benefits?: readonly NewsletterBenefit[];
  readonly incentive?: NewsletterIncentive;
  readonly emailPlaceholder?: string;
  readonly showNameField?: boolean;
  readonly namePlaceholder?: string;
  readonly showGdprCheckbox?: boolean;
  readonly gdprText?: string;
  readonly privacyPolicyUrl?: string;
  readonly submitButtonText?: string;
  readonly successTitle?: string;
  readonly successMessage?: string;
  readonly backgroundImage?: string;
  readonly backgroundPattern?: "dots" | "grid" | "waves" | "gradient" | "none";
  readonly position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center";
  readonly delay?: number;
  readonly showOnExitIntent?: boolean;
  readonly onSubmit?: (data: { email: string; name?: string; gdprConsent?: boolean }) => Promise<void>;
  readonly className?: string;
  readonly animated?: boolean;
  // React Jedi specific props
  readonly parentContext?: Record<string, unknown>;
  readonly spec?: import("@/types/schema/components").ComponentSpec;
  readonly theme?: Record<string, unknown>;
  readonly state?: Record<string, unknown>;
  readonly conditionalProps?: Record<string, unknown>;
  readonly computedProps?: Record<string, unknown>;
  readonly when?: string | boolean;
  readonly eventActions?: Record<string, unknown>;
}

// Validation helpers
const validateEmail = (value: string): boolean => {
  // Simple email validation to avoid complex regex
  return value.includes('@') && value.includes('.') && value.length > 5;
};

const validateForm = ({
  email,
  name,
  gdprConsent,
  showNameField,
  showGdprCheckbox
}: {
  readonly email: string;
  readonly name: string;
  readonly gdprConsent: boolean;
  readonly showNameField?: boolean;
  readonly showGdprCheckbox?: boolean;
}): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (showNameField && !name.trim()) {
    errors.name = "Name is required";
  }

  if (showGdprCheckbox && !gdprConsent) {
    errors.gdpr = "You must accept the privacy policy";
  }

  return errors;
};

// Form field components to reduce complexity
function NameField({
  name,
  namePlaceholder,
  onChange,
  disabled,
  error,
  animated
}: Readonly<{
  readonly name: string;
  readonly namePlaceholder?: string;
  readonly onChange: (value: string) => void;
  readonly disabled: boolean;
  readonly error?: string;
  readonly animated?: boolean;
}>) {
  return (
    <div>
      <Input
        type="text"
        placeholder={namePlaceholder}
        value={name}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          error && "border-red-500",
          animated && "transition-all duration-200"
        )}
        aria-label="Name"
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

function EmailFieldSection({
  email,
  emailPlaceholder,
  onChange,
  disabled,
  error,
  isCompact,
  loading,
  submitButtonText,
  animated
}: Readonly<{
  readonly email: string;
  readonly emailPlaceholder?: string;
  readonly onChange: (value: string) => void;
  readonly disabled: boolean;
  readonly error?: string;
  readonly isCompact: boolean;
  readonly loading: boolean;
  readonly submitButtonText?: string;
  readonly animated?: boolean;
}>) {
  return (
    <div className={cn(
      isCompact && "flex gap-2",
      !isCompact && "space-y-4"
    )}>
      <div className="flex-1">
        <Input
          type="email"
          placeholder={emailPlaceholder}
          value={email}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            error && "border-red-500",
            animated && "transition-all duration-200"
          )}
          aria-label="Email address"
          required
        />
        {error && !isCompact ? (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        ) : null}
      </div>
      
      {isCompact && (
        <Button
          type="submit"
          disabled={loading}
          size="default"
          className={cn(
            animated && "transition-all duration-200",
            loading && "opacity-70"
          )}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-current border-r-transparent rounded-full" />
              <span className="sr-only">Subscribing...</span>
            </span>
          ) : (
            submitButtonText
          )}
        </Button>
      )}
    </div>
  );
}

function GdprCheckbox({
  gdprConsent,
  onChange,
  disabled,
  error,
  gdprText,
  privacyPolicyUrl
}: Readonly<{
  readonly gdprConsent: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly disabled: boolean;
  readonly error?: string;
  readonly gdprText?: string;
  readonly privacyPolicyUrl?: string;
}>) {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id="gdpr-consent"
        checked={gdprConsent}
        onCheckedChange={(checked) => onChange(checked as boolean)}
        disabled={disabled}
        className={error ? "border-red-500" : ""}
      />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor="gdpr-consent"
          className={cn(
            "text-xs text-muted-foreground cursor-pointer",
            error && "text-red-500"
          )}
        >
          {gdprText?.split("privacy policy").map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index === 0 && (
                <a
                  href={privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary transition-colors"
                >
                  privacy policy
                </a>
              )}
            </React.Fragment>
          ))}
        </Label>
      </div>
    </div>
  );
}

function SubmitButton({
  loading,
  submitButtonText,
  animated
}: Readonly<{
  readonly loading: boolean;
  readonly submitButtonText?: string;
  readonly animated?: boolean;
}>) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className={cn(
        "w-full",
        animated && "transition-all duration-200",
        loading && "opacity-70"
      )}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="animate-spin h-4 w-4 border-2 border-current border-r-transparent rounded-full" />
          <span>Subscribing...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {submitButtonText}
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </Button>
  );
}

function NewsletterForm({
  showNameField = false,
  showGdprCheckbox = true,
  emailPlaceholder = "Enter your email",
  namePlaceholder = "Your name",
  gdprText = "I agree to receive newsletters and accept the privacy policy",
  privacyPolicyUrl = "/privacy",
  submitButtonText = "Subscribe",
  onSubmit,
  onSuccess,
  variant = "inline",
  animated = true
}: Readonly<Pick<NewsletterSignupProperties, 
  | "showNameField" 
  | "showGdprCheckbox" 
  | "emailPlaceholder" 
  | "namePlaceholder" 
  | "gdprText" 
  | "privacyPolicyUrl" 
  | "submitButtonText" 
  | "onSubmit"
  | "variant"
  | "animated"
> & {
  readonly onSuccess: () => void;
}>) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [gdprConsent, setGdprConsent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = validateForm({
      email,
      name,
      gdprConsent,
      showNameField,
      showGdprCheckbox
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      await (onSubmit ? 
        onSubmit({ 
          email, 
          name: showNameField ? name : undefined, 
          gdprConsent: showGdprCheckbox ? gdprConsent : undefined 
        }) : 
        // Simulate API call
        new Promise(resolve => globalThis.setTimeout(resolve, 1500))
      );
      
      onSuccess();
      
      // Reset form
      setEmail("");
      setName("");
      setGdprConsent(false);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const isCompact = variant === "footer-bar" || variant === "slide-in";

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", isCompact && "space-y-3")}>
      <div className={cn(
        "space-y-4",
        isCompact && "space-y-3"
      )}>
        {showNameField && (
          <NameField
            name={name}
            namePlaceholder={namePlaceholder}
            onChange={setName}
            disabled={loading}
            error={errors.name}
            animated={animated}
          />
        )}
        
        <EmailFieldSection
          email={email}
          emailPlaceholder={emailPlaceholder}
          onChange={setEmail}
          disabled={loading}
          error={errors.email}
          isCompact={isCompact}
          loading={loading}
          submitButtonText={submitButtonText}
          animated={animated}
        />

        {showGdprCheckbox && (
          <GdprCheckbox
            gdprConsent={gdprConsent}
            onChange={setGdprConsent}
            disabled={loading}
            error={errors.gdpr}
            gdprText={gdprText}
            privacyPolicyUrl={privacyPolicyUrl}
          />
        )}

        {!isCompact && (
          <SubmitButton
            loading={loading}
            submitButtonText={submitButtonText}
            animated={animated}
          />
        )}

        {errors.submit && (
          <p className={cn(
            "text-xs text-red-500 text-center",
            isCompact && "mt-2"
          )}>{errors.submit}</p>
        )}
      </div>
    </form>
  );
}

function SuccessState({
  title = "You're subscribed!",
  message = "Thank you for subscribing to our newsletter. Check your inbox for a confirmation email.",
  onClose,
  animated = true
}: Readonly<{
  title?: string;
  message?: string;
  onClose?: () => void;
  animated?: boolean;
}>) {
  return (
    <div className={cn(
      "text-center space-y-4 py-8",
      animated && "animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
    )}>
      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      {onClose && (
        <Button variant="outline" onClick={onClose} className="mt-4">
          Close
        </Button>
      )}
    </div>
  );
}

function BackgroundPattern({ pattern = "none" }: Readonly<{ pattern?: NewsletterSignupProperties["backgroundPattern"] }>) {
  if (pattern === "none") return null;

  const patterns: Record<string, React.ReactNode> = {
    dots: (
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-current text-muted-foreground/10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    ),
    grid: (
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" className="stroke-current text-muted-foreground/10" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    ),
    waves: (
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path 
          fill="currentColor" 
          className="text-muted-foreground/5"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    ),
    gradient: (
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
    )
  };

  return patterns[pattern] || null;
}

// Shared wrapper component for background styling
function NewsletterWrapper({
  children,
  backgroundPattern,
  backgroundImage,
  className,
  animated = true,
  ...props
}: Readonly<{
  readonly children: React.ReactNode;
  readonly backgroundPattern?: NewsletterSignupProperties["backgroundPattern"];
  readonly backgroundImage?: string;
  readonly className?: string;
  readonly animated?: boolean;
}> & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card",
        animated && "transition-all duration-300",
        className
      )}
      {...props}
    >
      <BackgroundPattern pattern={backgroundPattern} />
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Content builder for newsletter forms
function NewsletterContent({
  title,
  description,
  benefits,
  incentive,
  variant,
  showSuccess,
  successTitle,
  successMessage,
  animated,
  formProps
}: Readonly<{
  readonly title?: string;
  readonly description?: string;
  readonly benefits?: readonly NewsletterBenefit[];
  readonly incentive?: NewsletterIncentive;
  readonly variant: NewsletterSignupProperties["variant"];
  readonly showSuccess: boolean;
  readonly successTitle?: string;
  readonly successMessage?: string;
  readonly animated?: boolean;
  readonly formProps: Pick<NewsletterSignupProperties, 
    | "showNameField" 
    | "showGdprCheckbox" 
    | "emailPlaceholder" 
    | "namePlaceholder" 
    | "gdprText" 
    | "privacyPolicyUrl" 
    | "submitButtonText" 
    | "onSubmit"
  > & {
    readonly onSuccess: () => void;
  };
}>) {
  if (showSuccess) {
    return (
      <SuccessState 
        title={successTitle} 
        message={successMessage} 
        onClose={variant === "inline" || variant === "with-incentive" ? formProps.onSuccess : undefined}
        animated={animated}
      />
    );
  }

  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3 className={cn(
              "font-semibold",
              variant === "footer-bar" ? "text-base" : "text-lg"
            )}>{title}</h3>
          )}
          {description && (
            <p className={cn(
              "text-muted-foreground",
              variant === "footer-bar" ? "text-xs" : "text-sm"
            )}>{description}</p>
          )}
        </div>
      )}

      {benefits && benefits.length > 0 && variant !== "footer-bar" && (
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              {benefit.icon || <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />}
              <span>{benefit.text}</span>
            </li>
          ))}
        </ul>
      )}

      {incentive && variant === "with-incentive" && (
        <div className={cn(
          "bg-primary/5 rounded-lg p-4 border border-primary/20",
          animated && "animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
        )}>
          <div className="flex items-start gap-3">
            {incentive.icon || <Gift className="h-5 w-5 text-primary mt-0.5" />}
            <div className="space-y-1">
              <p className="font-medium text-sm">{incentive.title}</p>
              <p className="text-xs text-muted-foreground">{incentive.description}</p>
            </div>
          </div>
        </div>
      )}

      <NewsletterForm
        {...formProps}
        variant={variant}
        animated={animated}
      />
    </div>
  );
}

// Variant components
function InlineVariant({
  content,
  backgroundPattern,
  backgroundImage,
  className,
  animated,
  filteredProps
}: Readonly<{
  readonly content: React.ReactNode;
  readonly backgroundPattern?: NewsletterSignupProperties["backgroundPattern"];
  readonly backgroundImage?: string;
  readonly className?: string;
  readonly animated?: boolean;
  readonly filteredProps: Record<string, unknown>;
}>) {
  return (
    <NewsletterWrapper
      backgroundPattern={backgroundPattern}
      backgroundImage={backgroundImage}
      className={cn("p-6", className)}
      animated={animated}
      {...filteredProps}
    >
      {content}
    </NewsletterWrapper>
  );
}

function WithIncentiveVariant({
  content,
  backgroundPattern,
  backgroundImage,
  className,
  animated,
  filteredProps
}: Readonly<{
  readonly content: React.ReactNode;
  readonly backgroundPattern?: NewsletterSignupProperties["backgroundPattern"];
  readonly backgroundImage?: string;
  readonly className?: string;
  readonly animated?: boolean;
  readonly filteredProps: Record<string, unknown>;
}>) {
  return (
    <NewsletterWrapper
      backgroundPattern={backgroundPattern}
      backgroundImage={backgroundImage}
      className={className}
      animated={animated}
      {...filteredProps}
    >
      <div className="p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          {content}
        </div>
      </div>
    </NewsletterWrapper>
  );
}

function FooterBarVariant({
  content,
  isOpen,
  handleClose,
  className,
  animated,
  filteredProps
}: Readonly<{
  readonly content: React.ReactNode;
  readonly isOpen: boolean;
  readonly handleClose: () => void;
  readonly className?: string;
  readonly animated?: boolean;
  readonly filteredProps: Record<string, unknown>;
}>) {
  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85",
        animated && "transition-all duration-300",
        !isOpen && "translate-y-full",
        className
      )}
      {...filteredProps}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-2xl">
            {content}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="flex-shrink-0"
            aria-label="Close newsletter signup"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ModalVariant({
  isOpen,
  setIsOpen,
  title,
  description,
  backgroundPattern,
  backgroundImage,
  className,
  animated,
  showSuccess,
  successTitle,
  successMessage,
  benefits,
  formProps,
  filteredProps
}: Readonly<{
  readonly isOpen: boolean;
  readonly setIsOpen: (open: boolean) => void;
  readonly title?: string;
  readonly description?: string;
  readonly backgroundPattern?: NewsletterSignupProperties["backgroundPattern"];
  readonly backgroundImage?: string;
  readonly className?: string;
  readonly animated?: boolean;
  readonly showSuccess: boolean;
  readonly successTitle?: string;
  readonly successMessage?: string;
  readonly benefits?: readonly NewsletterBenefit[];
  readonly formProps: Pick<NewsletterSignupProperties, 
    | "showNameField" 
    | "showGdprCheckbox" 
    | "emailPlaceholder" 
    | "namePlaceholder" 
    | "gdprText" 
    | "privacyPolicyUrl" 
    | "submitButtonText" 
    | "onSubmit"
  > & {
    readonly onSuccess: () => void;
  };
  readonly filteredProps: Record<string, unknown>;
}>) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={cn("sm:max-w-md", className)} {...filteredProps}>
        <BackgroundPattern pattern={backgroundPattern} />
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 rounded-lg"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="relative z-10">
          <DialogHeader className="text-left">
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="mt-4">
            {showSuccess ? (
              <SuccessState 
                title={successTitle} 
                message={successMessage}
                animated={animated}
              />
            ) : (
              <>
                {benefits && benefits.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        {benefit.icon || <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />}
                        <span>{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <NewsletterForm
                  {...formProps}
                  variant="modal"
                  animated={animated}
                />
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SlideInVariant({
  content,
  isOpen,
  handleClose,
  position,
  backgroundPattern,
  backgroundImage,
  className,
  animated,
  filteredProps
}: Readonly<{
  readonly content: React.ReactNode;
  readonly isOpen: boolean;
  readonly handleClose: () => void;
  readonly position: NonNullable<NewsletterSignupProperties["position"]>;
  readonly backgroundPattern?: NewsletterSignupProperties["backgroundPattern"];
  readonly backgroundImage?: string;
  readonly className?: string;
  readonly animated?: boolean;
  readonly filteredProps: Record<string, unknown>;
}>) {
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  };

  return (
    <div
      className={cn(
        "fixed z-50 w-full max-w-sm",
        positionClasses[position],
        animated && "transition-all duration-300",
        !isOpen && position.includes("bottom") && "translate-y-[calc(100%+2rem)]",
        !isOpen && position.includes("top") && "-translate-y-[calc(100%+2rem)]",
        !isOpen && position.includes("right") && "translate-x-[calc(100%+2rem)]",
        !isOpen && position.includes("left") && "-translate-x-[calc(100%+2rem)]",
        !isOpen && position === "center" && "scale-0 opacity-0"
      )}
      {...filteredProps}
    >
      <div className={cn(
        "relative overflow-hidden rounded-lg border bg-card shadow-lg",
        className
      )}>
        <BackgroundPattern pattern={backgroundPattern} />
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="relative z-10 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute right-2 top-2 h-8 w-8"
            aria-label="Close newsletter signup"
          >
            <X className="h-4 w-4" />
          </Button>
          {content}
        </div>
      </div>
    </div>
  );
}

export function NewsletterSignup({
  variant = "inline",
  title = "Stay updated",
  description = "Get the latest news and updates delivered to your inbox.",
  benefits,
  incentive,
  emailPlaceholder,
  showNameField,
  namePlaceholder,
  showGdprCheckbox,
  gdprText,
  privacyPolicyUrl,
  submitButtonText,
  successTitle,
  successMessage,
  backgroundImage,
  backgroundPattern = "none",
  position = "bottom-right",
  delay = 5000,
  showOnExitIntent = false,
  onSubmit,
  className,
  animated = true,
  ...props
}: NewsletterSignupProperties) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = React.useState(false);

  const reactJediProps = new Set(["parentContext", "spec", "theme", "state", "conditionalProps", "computedProps", "when", "eventActions"]);
  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !reactJediProps.has(key))
  );

  // Handle exit intent
  React.useEffect(() => {
    if (!showOnExitIntent || variant !== "modal" || hasShownExitIntent) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
        setHasShownExitIntent(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [showOnExitIntent, variant, hasShownExitIntent]);

  // Handle auto-show for slide-in variant
  React.useEffect(() => {
    if (variant === "slide-in" && delay > 0) {
      const timer = globalThis.setTimeout(() => {
        setIsOpen(true);
      }, delay);
      return () => globalThis.clearTimeout(timer);
    }
  }, [variant, delay]);

  const handleSuccess = () => {
    setShowSuccess(true);
    if (variant === "modal" || variant === "slide-in") {
      globalThis.setTimeout(() => {
        setIsOpen(false);
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowSuccess(false);
  };

  // Form properties shared across variants
  const formProps = {
    showNameField,
    showGdprCheckbox,
    emailPlaceholder,
    namePlaceholder,
    gdprText,
    privacyPolicyUrl,
    submitButtonText,
    onSubmit,
    onSuccess: handleSuccess
  };

  // Content shared across most variants
  const content = (
    <NewsletterContent
      title={title}
      description={description}
      benefits={benefits}
      incentive={incentive}
      variant={variant}
      showSuccess={showSuccess}
      successTitle={successTitle}
      successMessage={successMessage}
      animated={animated}
      formProps={formProps}
    />
  );

  // Render variant components
  switch (variant) {
    case "inline": {
      return (
        <InlineVariant
          content={content}
          backgroundPattern={backgroundPattern}
          backgroundImage={backgroundImage}
          className={className}
          animated={animated}
          filteredProps={filteredProps}
        />
      );
    }

    case "with-incentive": {
      return (
        <WithIncentiveVariant
          content={content}
          backgroundPattern={backgroundPattern}
          backgroundImage={backgroundImage}
          className={className}
          animated={animated}
          filteredProps={filteredProps}
        />
      );
    }

    case "footer-bar": {
      return (
        <FooterBarVariant
          content={content}
          isOpen={isOpen}
          handleClose={handleClose}
          className={className}
          animated={animated}
          filteredProps={filteredProps}
        />
      );
    }

    case "modal": {
      return (
        <ModalVariant
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={title}
          description={description}
          backgroundPattern={backgroundPattern}
          backgroundImage={backgroundImage}
          className={className}
          animated={animated}
          showSuccess={showSuccess}
          successTitle={successTitle}
          successMessage={successMessage}
          benefits={benefits}
          formProps={formProps}
          filteredProps={filteredProps}
        />
      );
    }

    case "slide-in": {
      return (
        <SlideInVariant
          content={content}
          isOpen={isOpen}
          handleClose={handleClose}
          position={position}
          backgroundPattern={backgroundPattern}
          backgroundImage={backgroundImage}
          className={className}
          animated={animated}
          filteredProps={filteredProps}
        />
      );
    }

    default: {
      return null;
    }
  }
}