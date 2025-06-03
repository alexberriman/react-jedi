import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { MapIcon, PhoneIcon, MailIcon, ClockIcon, CheckCircleIcon, XCircleIcon, Loader2Icon } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";

// Form validation schemas for different variants
const simpleContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const detailedInquirySchema = simpleContactSchema.extend({
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  preferredContact: z.enum(["email", "phone"]).optional(),
});

const fileUploadSchema = detailedInquirySchema.extend({
  attachment: z.any().optional(),
});

type ContactFormData = z.infer<typeof fileUploadSchema>;

export interface OfficeInfo {
  name?: string;
  address: string;
  phone: string;
  email: string;
  hours?: string;
  mapUrl?: string;
}

export interface ContactFormProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly variant?: "simple" | "detailed" | "with-map" | "split-screen" | "minimal";
  readonly title?: string;
  readonly description?: string;
  readonly officeInfo?: OfficeInfo;
  readonly subjects?: string[];
  readonly showFileUpload?: boolean;
  readonly showPhone?: boolean;
  readonly showCompany?: boolean;
  readonly showPreferredContact?: boolean;
  readonly submitText?: string;
  readonly onFormSubmit?: (data: ContactFormData) => Promise<void> | void;
  readonly recaptchaSiteKey?: string;
  readonly successMessage?: string;
  readonly errorMessage?: string;
  readonly backgroundImage?: string;
  readonly animated?: boolean;
}

function ContactForm({
  variant = "simple",
  title = "Contact Us",
  description = "Get in touch with our team",
  officeInfo,
  subjects = ["General Inquiry", "Support", "Sales", "Partnership", "Other"],
  showFileUpload = false,
  showPhone = false,
  showCompany = false,
  showPreferredContact = false,
  submitText = "Send Message",
  onFormSubmit,
  recaptchaSiteKey,
  successMessage = "Thank you for your message. We'll get back to you soon!",
  errorMessage = "Something went wrong. Please try again later.",
  backgroundImage,
  animated = true,
  className,
  ...props
}: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  
  // Choose schema based on variant and options
  const schema = React.useMemo(() => {
    if (variant === "minimal") return simpleContactSchema;
    if (variant === "detailed" || showFileUpload) return fileUploadSchema;
    if (showPhone || showCompany || showPreferredContact) return detailedInquirySchema;
    return simpleContactSchema;
  }, [variant, showFileUpload, showPhone, showCompany, showPreferredContact]);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
      company: "",
      subject: "",
      preferredContact: "email",
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    try {
      await (onFormSubmit ? onFormSubmit(data) : new Promise(resolve => globalThis.setTimeout(resolve, 2000)));
      setSubmitStatus("success");
      form.reset();
      // Reset success message after 5 seconds
      globalThis.setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      // Reset error message after 5 seconds
      globalThis.setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const renderForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className={cn(
          "grid gap-4",
          variant === "minimal" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        )}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(variant === "detailed" || showPhone) && (
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(variant === "detailed" || showCompany) && (
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {variant === "detailed" && (
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(variant === "detailed" || showPreferredContact) && showPhone && (
            <FormField
              control={form.control}
              name="preferredContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Contact Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contact method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us how we can help..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {showFileUpload && (
          <FormField
            control={form.control}
            name="attachment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attachment (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormDescription>
                  Accepted formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 5MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {recaptchaSiteKey && (
          <div className="flex items-center justify-center">
            <div className="text-sm text-muted-foreground">
              Protected by reCAPTCHA
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={submitStatus === "loading"}
        >
          {submitStatus === "loading" && (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {submitStatus === "loading" ? "Sending..." : submitText}
        </Button>

        {submitStatus === "success" && (
          <Alert className={cn(
            "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
            animated && "animate-in fade-in slide-in-from-bottom-2"
          )}>
            <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className={cn(
            "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950",
            animated && "animate-in fade-in slide-in-from-bottom-2"
          )}>
            <XCircleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );

  const renderOfficeInfo = () => (
    <div className="space-y-6">
      {officeInfo?.name && (
        <h3 className="text-xl font-semibold">{officeInfo.name}</h3>
      )}
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Address</p>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {officeInfo?.address}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <PhoneIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-sm text-muted-foreground">{officeInfo?.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MailIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{officeInfo?.email}</p>
          </div>
        </div>

        {officeInfo?.hours && (
          <div className="flex items-start gap-3">
            <ClockIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Business Hours</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {officeInfo.hours}
              </p>
            </div>
          </div>
        )}
      </div>

      {officeInfo?.mapUrl && (
        <div className="mt-6">
          <iframe
            src={officeInfo.mapUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
            title="Office Location"
          />
        </div>
      )}
    </div>
  );

  if (variant === "minimal") {
    return (
      <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
        <div className="space-y-2 mb-6 text-center">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {renderForm()}
      </div>
    );
  }

  if (variant === "with-map") {
    return (
      <div className={cn("grid gap-8 lg:grid-cols-2", className)} {...props}>
        <div>
          <div className="space-y-2 mb-6">
            <h2 className="text-3xl font-bold">{title}</h2>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          {renderForm()}
        </div>
        {officeInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Visit our office or reach out through the contact details below
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderOfficeInfo()}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (variant === "split-screen") {
    return (
      <div className={cn("grid lg:grid-cols-2 min-h-[600px]", className)} {...props}>
        <div
          className={cn(
            "relative hidden lg:block",
            !backgroundImage && "bg-gradient-to-br from-primary/10 to-primary/5"
          )}
          style={backgroundImage ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          } : undefined}
        >
          {!backgroundImage && (
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-center space-y-4">
                <h3 className="text-4xl font-bold">{title}</h3>
                {description && (
                  <p className="text-lg text-muted-foreground max-w-md">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="p-8 lg:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="space-y-2 mb-6 lg:hidden">
              <h2 className="text-3xl font-bold">{title}</h2>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
            {renderForm()}
          </div>
        </div>
      </div>
    );
  }

  // Default variants: "simple" and "detailed"
  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {renderForm()}
      </CardContent>
    </Card>
  );
}

ContactForm.displayName = "ContactForm";

export { ContactForm };