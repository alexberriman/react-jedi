import * as React from 'react';
import { isValidPhoneNumber, AsYouType, CountryCode } from 'libphonenumber-js';
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

// Helper function to prepare submission data
const prepareSubmissionData = (
  formData: Record<string, unknown>,
  uploadedFiles: Record<string, File[]>,
  formId: string | undefined,
  variant: string
) => {
  const submissionData: Record<string, unknown> = {
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

  return submissionData;
};

// Helper function to send to CRM
const sendToCRM = async (
  crmConfig: ContactFormBlockProperties['crmConfig'],
  submissionData: Record<string, unknown>
) => {
  if (!crmConfig?.endpoint) return;

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
};

// Helper type for field render props
type FieldRenderProps = {
  field: FormField;
  fieldValue: unknown;
  commonProps: Record<string, unknown>;
  compact: boolean;
  labelElement: React.ReactNode;
  helperElement: React.ReactNode;
  errorElement: React.ReactNode;
  handleFieldChange: (fieldId: string, value: unknown) => void;
  handleFieldBlur: (fieldId: string) => void;
  isRequired?: boolean;
  showRequiredIndicator?: boolean;
  uploadedFiles?: Record<string, File[]>;
  setUploadedFiles?: React.Dispatch<React.SetStateAction<Record<string, File[]>>>;
};

// Helper function to render text input fields
const renderTextInput = (props: FieldRenderProps) => {
  const { field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur } = props;
  return (
    <div className={cn('space-y-2', compact && 'space-y-1')}>
      {labelElement}
      <Input
        {...commonProps}
        type={field.type}
        placeholder={field.placeholder}
        value={String(fieldValue) || ''}
        onChange={(e) => handleFieldChange(field.id, e.target.value)}
        onBlur={() => handleFieldBlur(field.id)}
        min={field.min}
        max={field.max}
        step={field.step}
        className={cn(commonProps.className as string, compact && 'h-8 text-sm')}
      />
      {helperElement}
      {errorElement}
    </div>
  );
};

// Helper function to render phone input fields
const renderPhoneInput = (props: FieldRenderProps) => {
  const { field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur } = props;
  return (
    <div className={cn('space-y-2', compact && 'space-y-1')}>
      {labelElement}
      <Input
        {...commonProps}
        type="tel"
        placeholder={field.placeholder || '+1 (555) 123-4567'}
        value={String(fieldValue) || ''}
        onChange={(e) => {
          const asYouType = new AsYouType(field.phoneConfig?.defaultCountry as CountryCode | undefined);
          const formatted = asYouType.input(e.target.value);
          handleFieldChange(field.id, formatted);
        }}
        onBlur={() => handleFieldBlur(field.id)}
        className={cn(commonProps.className as string, compact && 'h-8 text-sm')}
      />
      {helperElement}
      {errorElement}
    </div>
  );
};

// Helper function to render textarea fields
const renderTextarea = (props: FieldRenderProps) => {
  const { field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur } = props;
  return (
    <div className={cn('space-y-2', compact && 'space-y-1')}>
      {labelElement}
      <Textarea
        {...commonProps}
        placeholder={field.placeholder}
        value={String(fieldValue) || ''}
        onChange={(e) => handleFieldChange(field.id, e.target.value)}
        onBlur={() => handleFieldBlur(field.id)}
        rows={field.rows || (compact ? 3 : 4)}
        className={cn(commonProps.className as string, compact && 'text-sm')}
      />
      {helperElement}
      {errorElement}
    </div>
  );
};

// Helper function to render select fields
const renderSelect = (props: FieldRenderProps) => {
  const { field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange } = props;
  return (
    <div className={cn('space-y-2', compact && 'space-y-1')}>
      {labelElement}
      <Select
        value={String(fieldValue) || ''}
        onValueChange={(value) => handleFieldChange(field.id, value)}
        disabled={commonProps.disabled as boolean}
      >
        <SelectTrigger 
          id={field.id}
          className={cn(commonProps.className as string, compact && 'h-8 text-sm')}
          aria-invalid={commonProps['aria-invalid'] as boolean}
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
};

// Helper function to render checkbox groups
const renderCheckboxGroup = (props: FieldRenderProps) => {
  const { field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange } = props;
  return (
    <div className={cn('space-y-2', compact && 'space-y-1')}>
      {labelElement}
      <div className="space-y-2">
        {field.options?.map(option => (
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
              disabled={Boolean(commonProps.disabled) || option.disabled}
            />
            <span className={cn('text-sm', compact && 'text-xs')}>{option.label}</span>
          </label>
        ))}
      </div>
      {helperElement}
      {errorElement}
    </div>
  );
};

// Helper function to render single checkbox
const renderSingleCheckbox = (props: FieldRenderProps) => {
  const { field, fieldValue, commonProps, isRequired, showRequiredIndicator, handleFieldChange } = props;
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        {...commonProps}
        checked={!!fieldValue as boolean}
        onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
      />
      <label
        htmlFor={field.id}
        className={cn('text-sm cursor-pointer', props.compact && 'text-xs')}
      >
        {field.label}
        {showRequiredIndicator && isRequired && (
          <span className="ml-1 text-destructive">*</span>
        )}
      </label>
    </div>
  );
};

// Helper function to render radio group
const renderRadioGroup = (props: FieldRenderProps) => {
  const { field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange } = props;
  return (
    <div className={cn('space-y-2', compact && 'space-y-1')}>
      {labelElement}
      <RadioGroup
        value={String(fieldValue) || ''}
        onValueChange={(value) => handleFieldChange(field.id, value)}
        disabled={commonProps.disabled as boolean}
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
};

// Helper function to render date/time input
const renderDateTimeInput = (props: FieldRenderProps) => {
  const { field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur } = props;
  return (
    <div className={cn('space-y-2', compact && 'space-y-1')}>
      {labelElement}
      <Input
        {...commonProps}
        type={field.type}
        value={String(fieldValue) || ''}
        onChange={(e) => handleFieldChange(field.id, e.target.value)}
        onBlur={() => handleFieldBlur(field.id)}
        min={field.min}
        max={field.max}
        className={cn(commonProps.className as string, compact && 'h-8 text-sm')}
      />
      {helperElement}
      {errorElement}
    </div>
  );
};

// Helper function to render file upload field
const renderFileField = (props: FieldRenderProps & { handleFileUpload: (fieldId: string, files: FileList | null) => void }) => {
  const { field, commonProps, compact, labelElement, helperElement, errorElement, uploadedFiles = {}, setUploadedFiles, handleFileUpload } = props;
  const fieldError = !!props.errorElement;
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
            Boolean(commonProps.disabled) && 'cursor-not-allowed opacity-50'
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
        {files.length > 0 && renderUploadedFiles(files, field.id, setUploadedFiles)}
      </div>
      {helperElement}
      {errorElement}
    </div>
  );
};

// Helper to handle file removal
const handleFileRemoval = (
  fieldId: string, 
  files: File[], 
  indexToRemove: number, 
  setUploadedFiles: React.Dispatch<React.SetStateAction<Record<string, File[]>>>
) => {
  setUploadedFiles(prev => ({
    ...prev,
    [fieldId]: files.filter((_, i) => i !== indexToRemove)
  }));
};

// Helper to render uploaded files list
const renderUploadedFiles = (files: File[], fieldId: string, setUploadedFiles?: React.Dispatch<React.SetStateAction<Record<string, File[]>>>) => {
  if (!setUploadedFiles) return null;
  
  return (
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
            onClick={() => handleFileRemoval(fieldId, files, index, setUploadedFiles)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

// Helper to render submit button content
const renderSubmitButtonContent = (isSubmitting: boolean, submitStatus: ContactFormBlockState['submitStatus'], submitButton: ContactFormBlockProperties['submitButton']) => {
  if (isSubmitting) {
    return (
      <>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        {submitButton?.loadingText || 'Submitting...'}
      </>
    );
  }
  if (submitStatus === 'success') {
    return (
      <>
        <CheckCircle className="w-4 h-4 mr-2" />
        {submitButton?.successText || 'Submitted!'}
      </>
    );
  }
  return (
    <>
      <Send className="w-4 h-4 mr-2" />
      {submitButton?.text || 'Submit'}
    </>
  );
};

// Helper to render wizard navigation buttons
const renderWizardNavigation = ({
  currentStep,
  stepsLength,
  isSubmitting,
  submitButton,
  onPrevious,
  onNext,
  submitStatus
}: {
  currentStep: number;
  stepsLength: number;
  isSubmitting: boolean;
  submitButton: ContactFormBlockProperties['submitButton'];
  onPrevious: () => void;
  onNext: () => void;
  submitStatus: ContactFormBlockState['submitStatus'];
}) => {
  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0 || isSubmitting}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      {currentStep < stepsLength - 1 ? (
        <Button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          type="submit"
          variant={submitButton?.variant || 'primary'}
          size={submitButton?.size === 'md' ? 'default' : submitButton?.size || 'default'}
          disabled={isSubmitting}
          className={cn(submitButton?.fullWidth && 'w-full')}
        >
          {renderSubmitButtonContent(isSubmitting, submitStatus, submitButton)}
        </Button>
      )}
    </div>
  );
};

// Helper function to render field elements
const renderFieldElements = (field: FormField, fieldError: string | undefined, compact: boolean, showRequiredIndicator: boolean, isRequired: boolean) => {
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

  return { labelElement, errorElement, helperElement };
};

// Individual validation functions to reduce complexity
const validateRequired = (value: unknown, message?: string, label?: string): string | null => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return message || `${label} is required`;
  }
  return null;
};

const validateEmail = (value: unknown, message?: string): string | null => {
  const emailRegex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{1,63}$/u;
  if (value && !emailRegex.test(String(value))) {
    return message || 'Please enter a valid email address';
  }
  return null;
};

const validatePhone = (value: unknown, defaultCountry: string | undefined, message?: string): string | null => {
  if (value && !isValidPhoneNumber(String(value), defaultCountry as CountryCode | undefined)) {
    return message || 'Please enter a valid phone number';
  }
  return null;
};

const validateUrl = (value: unknown, message?: string): string | null => {
  try {
    if (value) new URL(String(value));
  } catch {
    return message || 'Please enter a valid URL';
  }
  return null;
};

const validatePattern = (value: unknown, pattern: unknown, message?: string): string | null => {
  if (value && pattern && !new RegExp(pattern as string).test(String(value))) {
    return message || 'Invalid format';
  }
  return null;
};

const validateStringLength = (value: unknown, min: number | undefined, max: number | undefined, ruleValue: number, ruleType: string, message?: string): string | null => {
  const length = String(value).length;
  if (ruleType === 'minLength' && value && length < ruleValue) {
    return message || `Minimum length is ${ruleValue}`;
  }
  if (ruleType === 'maxLength' && value && length > ruleValue) {
    return message || `Maximum length is ${ruleValue}`;
  }
  return null;
};

const validateNumber = (value: unknown, ruleValue: number, ruleType: string, message?: string): string | null => {
  const numValue = Number(value);
  if (ruleType === 'min' && value && numValue < ruleValue) {
    return message || `Minimum value is ${ruleValue}`;
  }
  if (ruleType === 'max' && value && numValue > ruleValue) {
    return message || `Maximum value is ${ruleValue}`;
  }
  return null;
};

// Main validation function
const validateField = (field: FormField, value: unknown): string | null => {
  if (!field.validation) return null;

  for (const rule of field.validation) {
    let error: string | null = null;
    
    switch (rule.type) {
      case 'required': {
        error = validateRequired(value, rule.message, field.label);
        break;
      }
      case 'email': {
        error = validateEmail(value, rule.message);
        break;
      }
      case 'phone': {
        error = validatePhone(value, field.phoneConfig?.defaultCountry as string | undefined, rule.message);
        break;
      }
      case 'url': {
        error = validateUrl(value, rule.message);
        break;
      }
      case 'pattern': {
        error = validatePattern(value, rule.value, rule.message);
        break;
      }
      case 'minLength':
      case 'maxLength': {
        error = validateStringLength(value, field.min, field.max, rule.value as number, rule.type, rule.message);
        break;
      }
      case 'min':
      case 'max': {
        error = validateNumber(value, rule.value as number, rule.type, rule.message);
        break;
      }
    }
    
    if (error) return error;
  }
  return null;
};

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
}: Readonly<ContactFormBlockProperties>) {
  
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
      const submissionData = prepareSubmissionData(formData, uploadedFiles, formId, variant);

      // CRM integration
      await sendToCRM(crmConfig, submissionData);

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

    const { labelElement, errorElement, helperElement } = renderFieldElements(field, fieldError, compact, showRequiredIndicator, isRequired || false);

    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'number': {
        return renderTextInput({ field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur });
      }

      case 'phone': {
        return renderPhoneInput({ field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur });
      }

      case 'textarea': {
        return renderTextarea({ field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur });
      }

      case 'select': {
        return renderSelect({ field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur });
      }

      case 'checkbox': {
        return field.options && field.options.length > 1 
          ? renderCheckboxGroup({ field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur })
          : renderSingleCheckbox({ field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur, isRequired, showRequiredIndicator });
      }

      case 'radio': {
        return renderRadioGroup({ field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur });
      }

      case 'file': {
        return renderFileField({ 
          field, 
          fieldValue, 
          commonProps, 
          compact, 
          labelElement, 
          helperElement, 
          errorElement, 
          handleFieldChange, 
          handleFieldBlur,
          uploadedFiles,
          setUploadedFiles,
          handleFileUpload
        });
      }

      case 'date':
      case 'time': {
        return renderDateTimeInput({ field, fieldValue, commonProps, compact, labelElement, helperElement, errorElement, handleFieldChange, handleFieldBlur });
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

          {renderWizardNavigation({
            currentStep,
            stepsLength: steps.length,
            isSubmitting,
            submitButton,
            onPrevious: () => setCurrentStep(prev => Math.max(0, prev - 1)),
            onNext: () => {
              if (validateAllFields()) {
                setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
              }
            },
            submitStatus
          })}
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
          size={submitButton?.size === 'md' ? 'default' : submitButton?.size || 'default'}
          disabled={isSubmitting}
          className={cn(submitButton.fullWidth && 'w-full', 'mt-6')}
        >
          {renderSubmitButtonContent(isSubmitting, submitStatus, submitButton)}
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

  const contentProps = omit(props, ['type' as keyof typeof props]);

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