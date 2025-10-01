import { Challenge } from '../types';

import BasicTextValidation from './beginner/BasicTextValidation';
import EmailValidation from './beginner/EmailValidation';
import PasswordValidation from './beginner/PasswordValidation';
import NumberValidation from './beginner/NumberValidation';
import MultiFieldForm from './beginner/MultiFieldForm';

import ConditionalFields from './intermediate/ConditionalFields';
import DynamicFields from './intermediate/DynamicFields';
import CrossFieldValidation from './intermediate/CrossFieldValidation';
import CustomValidation from './intermediate/CustomValidation';

import AsyncValidation from './advanced/AsyncValidation';
import DebouncedValidation from './advanced/DebouncedValidation';
import FileUploadValidation from './advanced/FileUploadValidation';
import ZodSchemaValidation from './advanced/ZodSchemaValidation';

import DynamicSchemaValidation from './expert/DynamicSchemaValidation';
import NestedFormArrays from './expert/NestedFormArrays';

export const challenges: Challenge[] = [
  {
    id: 'basic-text',
    title: 'Basic Text Validation',
    difficulty: 'beginner',
    category: 'Basic Validation',
    description: 'Learn to validate text inputs with required, minLength, and maxLength rules.',
    requirements: [
      'Field must be required',
      'Minimum length of 3 characters',
      'Maximum length of 20 characters',
      'Display appropriate error messages'
    ],
    hints: [
      'Use the register function with validation rules',
      'Access errors from formState',
      'Use conditional styling for error states'
    ],
    component: BasicTextValidation
  },
  {
    id: 'email-validation',
    title: 'Email Validation',
    difficulty: 'beginner',
    category: 'Basic Validation',
    description: 'Validate email addresses using pattern matching with regex.',
    requirements: [
      'Field must be required',
      'Must match valid email format',
      'Show specific error for invalid format'
    ],
    hints: [
      'Use the pattern validation rule',
      'Common email regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i'
    ],
    component: EmailValidation
  },
  {
    id: 'password-validation',
    title: 'Password Strength Validation',
    difficulty: 'beginner',
    category: 'Basic Validation',
    description: 'Create password validation with multiple requirements and strength indicator.',
    requirements: [
      'Minimum 8 characters',
      'At least one uppercase letter',
      'At least one lowercase letter',
      'At least one number',
      'At least one special character',
      'Display password strength indicator'
    ],
    hints: [
      'Use validate object for multiple checks',
      'Use watch to monitor password value',
      'Calculate strength based on criteria met'
    ],
    component: PasswordValidation
  },
  {
    id: 'number-validation',
    title: 'Number Range Validation',
    difficulty: 'beginner',
    category: 'Basic Validation',
    description: 'Validate numeric inputs with min and max constraints.',
    requirements: [
      'Validate age between 18 and 120',
      'Validate quantity between 1 and 10',
      'Use valueAsNumber for proper type handling'
    ],
    hints: [
      'Use min and max validation rules',
      'Add valueAsNumber: true to register options',
      'Provide clear boundary messages'
    ],
    component: NumberValidation
  },
  {
    id: 'multi-field',
    title: 'Multi-Field Form',
    difficulty: 'beginner',
    category: 'Basic Validation',
    description: 'Handle validation for multiple fields with different validation rules.',
    requirements: [
      'Validate first and last name',
      'Validate email format',
      'Validate phone number format',
      'Display all errors correctly'
    ],
    hints: [
      'Each field can have independent validation',
      'Use pattern for phone number format',
      'Handle errors object with multiple fields'
    ],
    component: MultiFieldForm
  },
  {
    id: 'conditional-fields',
    title: 'Conditional Field Validation',
    difficulty: 'intermediate',
    category: 'Dynamic Forms',
    description: 'Show/hide fields and adjust validation rules based on other field values.',
    requirements: [
      'Toggle fields based on checkbox state',
      'Conditionally require fields',
      'Clear errors when fields are hidden'
    ],
    hints: [
      'Use watch to monitor field values',
      'Conditionally apply required in register',
      'Use ternary operators for conditional validation'
    ],
    component: ConditionalFields
  },
  {
    id: 'dynamic-fields',
    title: 'Dynamic Field Arrays',
    difficulty: 'intermediate',
    category: 'Dynamic Forms',
    description: 'Add and remove form fields dynamically with validation.',
    requirements: [
      'Allow adding multiple phone numbers',
      'Each field must be validated',
      'Allow removing fields (except the first)',
      'Maintain validation state correctly'
    ],
    hints: [
      'Use useFieldArray hook',
      'Access validation with array index',
      'Handle errors for array fields'
    ],
    component: DynamicFields
  },
  {
    id: 'cross-field',
    title: 'Cross-Field Validation',
    difficulty: 'intermediate',
    category: 'Advanced Validation',
    description: 'Validate fields that depend on other field values.',
    requirements: [
      'Password confirmation must match password',
      'End date must be after start date',
      'Show appropriate error messages'
    ],
    hints: [
      'Use watch to get other field values',
      'Use validate function with comparison logic',
      'Access watched values in validation'
    ],
    component: CrossFieldValidation
  },
  {
    id: 'custom-validation',
    title: 'Custom Validation Rules',
    difficulty: 'intermediate',
    category: 'Advanced Validation',
    description: 'Implement custom business logic validation rules.',
    requirements: [
      'Validate username format and rules',
      'Validate credit card with Luhn algorithm',
      'Validate ZIP code format',
      'Validate URL format and protocol'
    ],
    hints: [
      'Create custom validation functions',
      'Use validate property with functions',
      'Return true or error message string'
    ],
    component: CustomValidation
  },
  {
    id: 'async-validation',
    title: 'Async Validation',
    difficulty: 'advanced',
    category: 'Async Operations',
    description: 'Validate fields using asynchronous API calls.',
    requirements: [
      'Check username availability via mock API',
      'Check email existence via mock API',
      'Show loading state during validation',
      'Display validation results'
    ],
    hints: [
      'Validation functions can be async',
      'Return promises from validate',
      'Use state to track loading status',
      'Mock APIs have built-in delays'
    ],
    component: AsyncValidation
  },
  {
    id: 'debounced-validation',
    title: 'Debounced Validation',
    difficulty: 'advanced',
    category: 'Performance',
    description: 'Optimize validation and API calls with debouncing.',
    requirements: [
      'Debounce username validation (1 second)',
      'Debounce search query (500ms)',
      'Show loading indicators',
      'Display results after debounce period'
    ],
    hints: [
      'Use setTimeout in validation function',
      'Clear previous timeout before setting new one',
      'Return promise that resolves after delay',
      'Track loading state separately'
    ],
    component: DebouncedValidation
  },
  {
    id: 'file-upload',
    title: 'File Upload Validation',
    difficulty: 'advanced',
    category: 'File Handling',
    description: 'Validate file uploads with type and size constraints.',
    requirements: [
      'Accept only images and PDFs',
      'Maximum file size of 5MB',
      'Allow multiple files',
      'Show upload progress',
      'Display uploaded file list'
    ],
    hints: [
      'Validate FileList in validate function',
      'Check file.type and file.size',
      'Use mock uploadFile with progress callback',
      'Handle multiple files in loop'
    ],
    component: FileUploadValidation
  },
  {
    id: 'zod-schema',
    title: 'Zod Schema Validation',
    difficulty: 'advanced',
    category: 'Schema Validation',
    description: 'Use Zod schema with zodResolver for type-safe validation.',
    requirements: [
      'Define Zod schema with all field validations',
      'Use zodResolver with useForm',
      'Implement cross-field validation with refine',
      'Get type inference from schema'
    ],
    hints: [
      'Import zodResolver from @hookform/resolvers/zod',
      'Define schema using z.object()',
      'Use schema.refine() for cross-field validation',
      'Use z.infer<typeof schema> for types'
    ],
    component: ZodSchemaValidation
  },
  {
    id: 'dynamic-schema',
    title: 'Dynamic Schema Validation',
    difficulty: 'expert',
    category: 'Advanced Patterns',
    description: 'Change validation schema dynamically based on form state.',
    requirements: [
      'Switch between personal and business forms',
      'Apply different validation rules per type',
      'Clear irrelevant fields on type change',
      'Validate with appropriate schema on submit'
    ],
    hints: [
      'Create schema factory function',
      'Use useEffect to clear fields on change',
      'Manually validate with Zod on submit',
      'Conditional rendering based on form type'
    ],
    component: DynamicSchemaValidation
  },
  {
    id: 'nested-arrays',
    title: 'Nested Form Arrays',
    difficulty: 'expert',
    category: 'Complex Structures',
    description: 'Handle complex nested array structures with validation.',
    requirements: [
      'Multiple addresses with full validation',
      'Multiple projects with nested arrays',
      'Add/remove functionality at all levels',
      'Proper error handling for nested fields'
    ],
    hints: [
      'Use multiple useFieldArray hooks',
      'Access nested errors with array indices',
      'Register fields with proper path notation',
      'Handle nested field addition/removal'
    ],
    component: NestedFormArrays
  }
];

export const getChallengesByDifficulty = (difficulty: string) => {
  return challenges.filter(c => c.difficulty === difficulty);
};

export const getChallengeById = (id: string) => {
  return challenges.find(c => c.id === id);
};
