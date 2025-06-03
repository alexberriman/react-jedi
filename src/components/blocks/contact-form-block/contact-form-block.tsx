import * as React from 'react';
import { isValidPhoneNumber, AsYouType } from 'libphonenumber-js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileText,
  Building,
  User,
  MessageSquare
} from 'lucide-react';

import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Alert, AlertDescription } from '../../ui/alert';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { omit } from '../../../lib/utils';

import type { 
  ContactFormBlockProperties, 
  ContactFormBlockState,
  FormField
} from '../../../types/components/contact-form-block';

function ContactFormBlock({
  variant = 'simple',
  title,
  description,
  fields = [],
  steps = [],
  submitButton = {},
  captcha,
  successMessage = 'Thank you for your submission! We\'ll get back to you soon.',
  errorMessage = 'Something went wrong. Please try again.',
  redirectUrl,
  redirectDelay = 3000,
  mapConfig,
  splitContent,
  crmConfig,
  formId,
  className,
  animated = true,
  compact = false,
  showRequiredIndicator = true,
  validateOnBlur = true,
  validateOnChange = false,
  resetOnSuccess = true,
  persistData = false,
  storageKey = 'contact-form-data',
  ...props
}: ContactFormBlockProperties) {
  
  // State management
  const [formData, setFormData] = React.useState<Record<string, unknown>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<ContactFormBlockState['submitStatus']>('idle');
  const [submitMessage, setSubmitMessage] = React.useState<string>('');
  const [currentStep, setCurrentStep] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState<Record<string, File[]>>({});

  // Get active fields based on variant and current step
  const activeFields = React.useMemo(() => {
    if (variant === 'wizard' && steps.length > 0) {
      return steps[currentStep]?.fields || [];
    }
    return fields;
  }, [variant, fields, steps, currentStep]);

  // Load persisted data
  React.useEffect(() => {
    if (persistData && globalThis.window !== undefined) {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(parsed);
        } catch (error) {
          console.error('Failed to load persisted form data:', error);
        }
      }
    }
  }, [persistData, storageKey]);

  // Save data to localStorage
  React.useEffect(() => {
    if (persistData && Object.keys(formData).length > 0 && globalThis.window !== undefined) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(formData));
      } catch (error) {
        console.error('Failed to persist form data:', error);
      }
    }
  }, [formData, persistData, storageKey]);

  // Validation functions
  const validateField = (field: FormField, value: unknown): string | null => {
    if (!field.validation) return null;

    for (const rule of field.validation) {
      switch (rule.type) {
        case 'required': {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            return rule.message || `${field.label} is required`;
          }
          break;
        }
        case 'email': {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (value && !emailRegex.test(value)) {
            return rule.message || 'Please enter a valid email address';
          }
          break;
        }
        case 'phone': {
          if (value && !isValidPhoneNumber(String(value), field.phoneConfig?.defaultCountry)) {
            return rule.message || 'Please enter a valid phone number';
          }
          break;
        }
        case 'url': {
          try {
            if (value) new URL(value);
          } catch {
            return rule.message || 'Please enter a valid URL';
          }
          break;
        }
        case 'pattern': {
          if (value && rule.value && !new RegExp(rule.value as string).test(value)) {
            return rule.message || 'Invalid format';
          }
          break;
        }
        case 'minLength': {
          if (value && value.length < (rule.value as number)) {
            return rule.message || `Minimum length is ${rule.value}`;
          }
          break;
        }
        case 'maxLength': {
          if (value && value.length > (rule.value as number)) {
            return rule.message || `Maximum length is ${rule.value}`;
          }
          break;
        }
        case 'min': {
          if (value && Number(value) < (rule.value as number)) {
            return rule.message || `Minimum value is ${rule.value}`;
          }
          break;
        }
        case 'max': {
          if (value && Number(value) > (rule.value as number)) {
            return rule.message || `Maximum value is ${rule.value}`;
          }
          break;
        }
      }
    }
    return null;
  };

  // Check conditional display
  const shouldDisplayField = (field: FormField): boolean => {
    if (!field.conditionalDisplay) return true;

    const { fieldId, operator, value } = field.conditionalDisplay;
    const fieldValue = formData[fieldId];

    switch (operator) {
      case 'equals': {
        return fieldValue === value;
      }
      case 'notEquals': {
        return fieldValue !== value;
      }
      case 'contains': {
        return String(fieldValue).includes(String(value));
      }
      case 'notContains': {
        return !String(fieldValue).includes(String(value));
      }
      case 'exists': {
        return fieldValue !== undefined && fieldValue !== null && fieldValue !== '';
      }
      case 'notExists': {
        return fieldValue === undefined || fieldValue === null || fieldValue === '';
      }
      default: {
        return true;
      }
    }
  };

  // Handle field change
  const handleFieldChange = (fieldId: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    if (validateOnChange && touched[fieldId]) {
      const field = activeFields.find(f => f.id === fieldId);
      if (field) {
        const error = validateField(field, value);
        setErrors(prev => ({
          ...prev,
          [fieldId]: error || ''
        }));
      }
    }
  };

  // Handle field blur
  const handleFieldBlur = (fieldId: string) => {
    setTouched(prev => ({ ...prev, [fieldId]: true }));
    
    if (validateOnBlur) {
      const field = activeFields.find(f => f.id === fieldId);
      if (field) {
        const error = validateField(field, formData[fieldId]);
        setErrors(prev => ({
          ...prev,
          [fieldId]: error || ''
        }));
      }
    }
  };

  // Handle file upload
  const handleFileUpload = (fieldId: string, files: FileList | null) => {
    if (!files) return;
    
    const field = activeFields.find(f => f.id === fieldId);
    if (!field || field.type !== 'file') return;

    const fileArray = [...files];
    const maxFiles = field.fileConfig?.maxFiles || 1;
    const maxSize = field.fileConfig?.maxSize || Infinity;
    
    // Validate files
    const validFiles = fileArray.filter(file => {
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          [fieldId]: `File size must be less than ${(maxSize / 1024 / 1024).toFixed(2)}MB`
        }));
        return false;
      }
      return true;
    }).slice(0, maxFiles);

    setUploadedFiles(prev => ({
      ...prev,
      [fieldId]: validFiles
    }));
    handleFieldChange(fieldId, validFiles.map(f => f.name));
  };

  // Validate all fields
  const validateAllFields = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    for (const field of activeFields) {
      if (shouldDisplayField(field)) {
        const error = validateField(field, formData[field.id]);
        if (error) {
          newErrors[field.id] = error;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    setTouched(
      Object.fromEntries(activeFields.map(( field) => [field.id, true]))
    );

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields()) return;

    setIsSubmitting(true);
    setSubmitStatus('loading');

    try {
      // Prepare form data
      const submissionData = {
        ...formData,
        _formId: formId,
        _timestamp: new Date().toISOString(),
        _variant: variant
      };

      // Add uploaded files info
      for (const [fieldId, files] of Object.entries(uploadedFiles)) {
        submissionData[fieldId] = files.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type
        }));
      }

      // CRM integration
      if (crmConfig?.endpoint) {
        let mappedData: Record<string, unknown>;
        if (crmConfig.fieldMapping) {
          mappedData = { ...crmConfig.customData };
          for (const [key, fieldId] of Object.entries(crmConfig.fieldMapping)) {
            mappedData[key] = submissionData[fieldId];
          }
        } else {
          mappedData = submissionData;
        }

        const response = await fetch(crmConfig.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...crmConfig.headers
          },
          body: JSON.stringify(mappedData)
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }
      }

      // Success handling
      setSubmitStatus('success');
      setSubmitMessage(successMessage);

      if (resetOnSuccess) {
        setFormData({});
        setUploadedFiles({});
        if (persistData && globalThis.window !== undefined) {
          localStorage.removeItem(storageKey);
        }
      }

      // Handle redirect
      if (redirectUrl) {
        globalThis.setTimeout(() => {
          globalThis.location.href = redirectUrl;
        }, redirectDelay);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render field
  const renderField = (field: FormField) => {
    if (!shouldDisplayField(field)) return null;

    const fieldError = errors[field.id];
    const fieldValue = formData[field.id] || field.defaultValue || '';
    const isRequired = field.validation?.some(r => r.type === 'required');

    const commonProps = {
      id: field.id,
      name: field.id,
      disabled: field.disabled || isSubmitting,
      readOnly: field.readOnly,
      autoComplete: field.autoComplete,
      className: cn(field.className),
      'aria-invalid': !!fieldError,
      'aria-describedby': field.helperText ? `${field.id}-helper` : undefined
    };

    const labelElement = (
      <Label htmlFor={field.id} className={cn('text-sm font-medium', compact && 'text-xs')}>
        {field.label}
        {showRequiredIndicator && isRequired && (
          <span className="ml-1 text-destructive">*</span>
        )}
      </Label>
    );

    const errorElement = fieldError && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1 text-xs text-destructive"
      >
        {fieldError}
      </motion.p>
    );

    const helperElement = field.helperText && !fieldError && (
      <p id={`${field.id}-helper`} className="mt-1 text-xs text-muted-foreground">
        {field.helperText}
      </p>
    );

    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'number': {
        return (
          <div className={cn('space-y-2', compact && 'space-y-1')}>
            {labelElement}
            <Input
              {...commonProps}
              type={field.type}
              placeholder={field.placeholder}
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              min={field.min}
              max={field.max}
              step={field.step}
              className={cn(commonProps.className, compact && 'h-8 text-sm')}
            />
            {helperElement}
            {errorElement}
          </div>
        );
      }

      case 'phone': {
        return (
          <div className={cn('space-y-2', compact && 'space-y-1')}>
            {labelElement}
            <Input
              {...commonProps}
              type="tel"
              placeholder={field.placeholder || '+1 (555) 123-4567'}
              value={fieldValue}
              onChange={(e) => {
                const asYouType = new AsYouType(field.phoneConfig?.defaultCountry);
                const formatted = asYouType.input(e.target.value);
                handleFieldChange(field.id, formatted);
              }}
              onBlur={() => handleFieldBlur(field.id)}
              className={cn(commonProps.className, compact && 'h-8 text-sm')}
            />
            {helperElement}
            {errorElement}
          </div>
        );
      }

      case 'textarea': {
        return (
          <div className={cn('space-y-2', compact && 'space-y-1')}>
            {labelElement}
            <Textarea
              {...commonProps}
              placeholder={field.placeholder}
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              rows={field.rows || (compact ? 3 : 4)}
              className={cn(commonProps.className, compact && 'text-sm')}
            />
            {helperElement}
            {errorElement}
          </div>
        );
      }

      case 'select': {
        return (
          <div className={cn('space-y-2', compact && 'space-y-1')}>
            {labelElement}
            <Select
              value={fieldValue}
              onValueChange={(value) => handleFieldChange(field.id, value)}
              disabled={commonProps.disabled}
            >
              <SelectTrigger 
                id={field.id}
                className={cn(commonProps.className, compact && 'h-8 text-sm')}
                aria-invalid={commonProps['aria-invalid']}
              >
                <SelectValue placeholder={field.placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {helperElement}
            {errorElement}
          </div>
        );
      }

      case 'checkbox': {
        return field.options && field.options.length > 1 ? (
            <div className={cn('space-y-2', compact && 'space-y-1')}>
              {labelElement}
              <div className="space-y-2">
                {field.options.map(option => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      id={`${field.id}-${option.value}`}
                      checked={Array.isArray(fieldValue) && fieldValue.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const currentValues = Array.isArray(fieldValue) ? fieldValue : [];
                        const newValues = checked
                          ? [...currentValues, option.value]
                          : currentValues.filter(v => v !== option.value);
                        handleFieldChange(field.id, newValues);
                      }}
                      disabled={commonProps.disabled || option.disabled}
                    />
                    <span className={cn('text-sm', compact && 'text-xs')}>{option.label}</span>
                  </label>
                ))}
              </div>
              {helperElement}
              {errorElement}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Checkbox
                {...commonProps}
                checked={!!fieldValue}
                onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
              />
              <label
                htmlFor={field.id}
                className={cn('text-sm cursor-pointer', compact && 'text-xs')}
              >
                {field.label}
                {showRequiredIndicator && isRequired && (
                  <span className="ml-1 text-destructive">*</span>
                )}
              </label>
            </div>
          );
      }

      case 'radio': {
        return (
          <div className={cn('space-y-2', compact && 'space-y-1')}>
            {labelElement}
            <RadioGroup
              value={fieldValue}
              onValueChange={(value) => handleFieldChange(field.id, value)}
              disabled={commonProps.disabled}
            >
              <div className="space-y-2">
                {field.options?.map(option => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.value}
                      disabled={option.disabled}
                    />
                    <span className={cn('text-sm', compact && 'text-xs')}>{option.label}</span>
                  </label>
                ))}
              </div>
            </RadioGroup>
            {helperElement}
            {errorElement}
          </div>
        );
      }

      case 'file': {
        const files = uploadedFiles[field.id] || [];
        return (
          <div className={cn('space-y-2', compact && 'space-y-1')}>
            {labelElement}
            <div className="space-y-2">
              <label
                htmlFor={field.id}
                className={cn(
                  'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors',
                  compact && 'h-24',
                  fieldError && 'border-destructive',
                  commonProps.disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className={cn('w-8 h-8 mb-2 text-muted-foreground', compact && 'w-6 h-6')} />
                  <p className={cn('text-sm text-muted-foreground', compact && 'text-xs')}>
                    Click to upload or drag and drop
                  </p>
                  {field.fileConfig?.accept && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {field.fileConfig.accept}
                    </p>
                  )}
                </div>
                <input
                  {...commonProps}
                  type="file"
                  className="hidden"
                  accept={field.fileConfig?.accept}
                  multiple={field.fileConfig?.multiple}
                  onChange={(e) => handleFileUpload(field.id, e.target.files)}
                />
              </label>
              {files.length > 0 && (
                <div className="space-y-1">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 text-sm border rounded-md"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024).toFixed(1)}KB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setUploadedFiles(prev => ({
                            ...prev,
                            [field.id]: files.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {helperElement}
            {errorElement}
          </div>
        );
      }

      case 'date':
      case 'time': {
        return (
          <div className={cn('space-y-2', compact && 'space-y-1')}>
            {labelElement}
            <Input
              {...commonProps}
              type={field.type}
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              min={field.min}
              max={field.max}
              className={cn(commonProps.className, compact && 'h-8 text-sm')}
            />
            {helperElement}
            {errorElement}
          </div>
        );
      }

      default: {
        return null;
      }
    }
  };

  // Render form content
  const renderFormContent = () => {
    if (variant === 'wizard' && steps.length > 0) {
      const currentStepData = steps[currentStep];
      const progress = ((currentStep + 1) / steps.length) * 100;

      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{currentStepData.title}</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {currentStepData.description && (
                <p className="text-sm text-muted-foreground">
                  {currentStepData.description}
                </p>
              )}
              {currentStepData.fields.map(field => (
                <div key={field.id}>{renderField(field)}</div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0 || isSubmitting}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={() => {
                  if (validateAllFields()) {
                    setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
                  }
                }}
                disabled={isSubmitting}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant={submitButton.variant || 'primary'}
                size={submitButton.size || 'md'}
                disabled={isSubmitting}
                className={cn(submitButton.fullWidth && 'w-full')}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {submitButton.loadingText || 'Submitting...'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {submitButton.text || 'Submit'}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {activeFields.map(field => (
          <div key={field.id}>{renderField(field)}</div>
        ))}
        
        {captcha?.enabled && (
          <div className="flex justify-center">
            <div className="g-recaptcha" data-sitekey={captcha.siteKey}></div>
          </div>
        )}

        <Button
          type="submit"
          variant={submitButton.variant || 'primary'}
          size={submitButton.size || 'md'}
          disabled={isSubmitting}
          className={cn(submitButton.fullWidth && 'w-full', 'mt-6')}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {submitButton.loadingText || 'Submitting...'}
            </>
          ) : submitStatus === 'success' ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              {submitButton.successText || 'Submitted!'}
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {submitButton.text || 'Submit'}
            </>
          )}
        </Button>
      </div>
    );
  };

  // Render status alerts
  const renderStatusAlert = () => {
    if (submitStatus === 'success') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              {submitMessage}
            </AlertDescription>
          </Alert>
        </motion.div>
      );
    }

    if (submitStatus === 'error') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitMessage}</AlertDescription>
          </Alert>
        </motion.div>
      );
    }

    return null;
  };

  // Render based on variant
  const renderContent = () => {
    switch (variant) {
      case 'with-map': {
        return (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden">
              {(title || description) && (
                <CardHeader>
                  {title && <CardTitle>{title}</CardTitle>}
                  {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
              )}
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {renderFormContent()}
                </form>
                {renderStatusAlert()}
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] relative">
                {mapConfig && (
                  <iframe
                    title="Location Map"
                    src={`https://www.google.com/maps/embed/v1/place?key=${mapConfig.apiKey}&q=${mapConfig.lat},${mapConfig.lng}&zoom=${mapConfig.zoom || 15}`}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    aria-hidden="false"
                  />
                )}
              </div>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Visit Us</p>
                    <p className="text-sm text-muted-foreground">
                      123 Business St, Suite 100<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-sm text-muted-foreground">info@example.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      }

      case 'split-screen': {
        return (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden">
              {(title || description) && (
                <CardHeader>
                  {title && <CardTitle>{title}</CardTitle>}
                  {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
              )}
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {renderFormContent()}
                </form>
                {renderStatusAlert()}
              </CardContent>
            </Card>
            
            {splitContent && (
              <div className="flex items-center justify-center">
                {splitContent.type === 'image' && splitContent.image && (
                  <img
                    src={splitContent.image}
                    alt={splitContent.alt || ''}
                    className="rounded-lg shadow-lg object-cover w-full h-full"
                  />
                )}
                {splitContent.type === 'content' && (
                  <Card>
                    <CardHeader>
                      {splitContent.title && <CardTitle>{splitContent.title}</CardTitle>}
                      {splitContent.description && (
                        <CardDescription>{splitContent.description}</CardDescription>
                      )}
                    </CardHeader>
                    {splitContent.features && splitContent.features.length > 0 && (
                      <CardContent>
                        <ul className="space-y-2">
                          {splitContent.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                )}
                {splitContent.type === 'info' && (
                  <div className="space-y-6">
                    <div>
                      <Building className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
                      <p className="text-muted-foreground">
                        We&apos;re here to help and answer any question you might have.
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">Professional support team</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">Quick response time</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">24/7 availability</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }

      default: {
        return (
          <Card className={cn('overflow-hidden', className)}>
            {(title || description) && (
              <CardHeader>
                {title && <CardTitle>{title}</CardTitle>}
                {description && <CardDescription>{description}</CardDescription>}
              </CardHeader>
            )}
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {renderFormContent()}
              </form>
              {renderStatusAlert()}
            </CardContent>
          </Card>
        );
      }
    }
  };

  const contentProps = omit(props, ['ariaLabel']);

  if (!animated) {
    return (
      <div
        {...contentProps}
        className={cn('w-full', className)}
      >
        {renderContent()}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...contentProps}
      className={cn('w-full', className)}
    >
      {renderContent()}
    </motion.div>
  );
}

ContactFormBlock.displayName = 'ContactFormBlock';

export { ContactFormBlock };

export {type ContactFormBlockProperties} from '../../../types/components/contact-form-block';