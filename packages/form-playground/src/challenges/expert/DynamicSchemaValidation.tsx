import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';

type UserType = 'personal' | 'business' | '';

interface FormData {
  userType: UserType;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  taxId?: string;
  email: string;
}

const getSchema = (userType: UserType) => {
  const baseSchema = {
    userType: z.enum(['personal', 'business']),
    email: z.string().email('Invalid email address')
  };

  if (userType === 'personal') {
    return z.object({
      ...baseSchema,
      firstName: z.string().min(2, 'First name must be at least 2 characters'),
      lastName: z.string().min(2, 'Last name must be at least 2 characters')
    });
  } else if (userType === 'business') {
    return z.object({
      ...baseSchema,
      businessName: z.string().min(3, 'Business name must be at least 3 characters'),
      taxId: z.string()
        .regex(/^\d{2}-\d{7}$/, 'Tax ID must be in format XX-XXXXXXX')
    });
  }

  return z.object(baseSchema);
};

export default function DynamicSchemaValidation() {
  const { register, handleSubmit, watch, formState: { errors }, clearErrors, setValue } = useForm<FormData>({
    defaultValues: {
      userType: '',
      email: ''
    }
  });

  const userType = watch('userType');

  useEffect(() => {
    clearErrors();
    setValue('firstName', '');
    setValue('lastName', '');
    setValue('businessName', '');
    setValue('taxId', '');
  }, [userType, clearErrors, setValue]);

  const onSubmit = (data: FormData) => {
    const schema = getSchema(userType);
    try {
      const validatedData = schema.parse(data);
      alert(`Success! Form submitted:\n${JSON.stringify(validatedData, null, 2)}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(`Validation failed:\n${error.errors.map(e => `${e.path}: ${e.message}`).join('\n')}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
          Account Type
        </label>
        <select
          id="userType"
          {...register('userType', {
            required: 'Account type is required'
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.userType ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select type...</option>
          <option value="personal">Personal</option>
          <option value="business">Business</option>
        </select>
        {errors.userType && (
          <p className="mt-1 text-sm text-red-600">{errors.userType.message}</p>
        )}
      </div>

      {userType === 'personal' && (
        <>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              {...register('firstName', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register('lastName', {
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </>
      )}

      {userType === 'business' && (
        <>
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              id="businessName"
              type="text"
              {...register('businessName', {
                required: 'Business name is required',
                minLength: {
                  value: 3,
                  message: 'Business name must be at least 3 characters'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.businessName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.businessName && (
              <p className="mt-1 text-sm text-red-600">{errors.businessName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
              Tax ID (Format: XX-XXXXXXX)
            </label>
            <input
              id="taxId"
              type="text"
              {...register('taxId', {
                required: 'Tax ID is required',
                pattern: {
                  value: /^\d{2}-\d{7}$/,
                  message: 'Tax ID must be in format XX-XXXXXXX'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.taxId ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="12-3456789"
            />
            {errors.taxId && (
              <p className="mt-1 text-sm text-red-600">{errors.taxId.message}</p>
            )}
          </div>
        </>
      )}

      {userType && (
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={!userType}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
}
