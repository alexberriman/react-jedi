import type { BaseComponentSpec } from '../schema/base';

export type ContactFormBlockVariant = 'simple' | 'detailed' | 'with-map' | 'split-screen' | 'wizard';

export type FieldType = 
  | 'text' 
  | 'email' 
  | 'phone' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'radio' 
  | 'file'
  | 'date'
  | 'time'
  | 'number'
  | 'url';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'url' | 'pattern' | 'minLength' | 'maxLength' | 'min' | 'max';
  value?: string | number;
  message?: string;
}

export interface ConditionalRule {
  fieldId: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'notContains' | 'exists' | 'notExists';
  value?: string | boolean | number;
}

export interface PhoneConfig {
  defaultCountry?: string;
  preferredCountries?: string[];
  onlyCountries?: string[];
  excludeCountries?: string[];
  formatOnDisplay?: boolean;
}

export interface FileUploadConfig {
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  multiple?: boolean;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: string | boolean | string[];
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  validation?: ValidationRule[];
  conditionalDisplay?: ConditionalRule;
  options?: SelectOption[]; // for select, radio, checkbox
  fileConfig?: FileUploadConfig; // for file type
  phoneConfig?: PhoneConfig; // for phone type
  rows?: number; // for textarea
  min?: number; // for number, date
  max?: number; // for number, date
  step?: number; // for number
  autoComplete?: string;
  helperText?: string;
  className?: string;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  icon?: string;
}

export interface MapConfig {
  lat: number;
  lng: number;
  zoom?: number;
  marker?: {
    title?: string;
    icon?: string;
  };
  apiKey?: string;
}

export interface CRMConfig {
  endpoint?: string;
  headers?: Record<string, string>;
  fieldMapping?: Record<string, string>;
  customData?: Record<string, unknown>;
}

export interface ContactFormBlockProperties extends BaseComponentSpec {
  type: 'ContactFormBlock';
  variant?: ContactFormBlockVariant;
  title?: string;
  description?: string;
  fields?: FormField[];
  steps?: FormStep[]; // for wizard variant
  submitButton?: {
    text?: string;
    loadingText?: string;
    successText?: string;
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
  };
  captcha?: {
    enabled?: boolean;
    siteKey?: string;
    theme?: 'light' | 'dark';
  };
  successMessage?: string;
  errorMessage?: string;
  redirectUrl?: string;
  redirectDelay?: number; // in milliseconds
  mapConfig?: MapConfig; // for with-map variant
  splitContent?: {
    type: 'image' | 'content' | 'info';
    image?: string;
    alt?: string;
    title?: string;
    description?: string;
    features?: string[];
  }; // for split-screen variant
  crmConfig?: CRMConfig;
  formId?: string;
  className?: string;
  animated?: boolean;
  compact?: boolean;
  showRequiredIndicator?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  resetOnSuccess?: boolean;
  persistData?: boolean;
  storageKey?: string;
}

export interface ContactFormBlockState {
  formData: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitStatus: 'idle' | 'loading' | 'success' | 'error';
  submitMessage?: string;
  currentStep?: number; // for wizard variant
}