import { useForm } from 'react-hook-form';

interface FormData {
  username: string;
  creditCard: string;
  zipCode: string;
  url: string;
}

export default function CustomValidation() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const validateCreditCard = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cleaned)) {
      return 'Credit card must be 16 digits';
    }

    let sum = 0;
    for (let i = 0; i < cleaned.length; i++) {
      let digit = parseInt(cleaned[i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0 || 'Invalid credit card number';
  };

  const validateUsername = (value: string) => {
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    if (/^\d/.test(value)) {
      return 'Username cannot start with a number';
    }
    return true;
  };

  const onSubmit = (data: FormData) => {
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters'
            },
            validate: validateUsername
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.username ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="creditCard" className="block text-sm font-medium text-gray-700 mb-1">
          Credit Card Number
        </label>
        <input
          id="creditCard"
          type="text"
          {...register('creditCard', {
            required: 'Credit card is required',
            validate: validateCreditCard
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.creditCard ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="1234567890123456"
        />
        {errors.creditCard && (
          <p className="mt-1 text-sm text-red-600">{errors.creditCard.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
          ZIP Code
        </label>
        <input
          id="zipCode"
          type="text"
          {...register('zipCode', {
            required: 'ZIP code is required',
            validate: (value) => {
              if (!/^\d{5}(-\d{4})?$/.test(value)) {
                return 'Invalid ZIP code format (e.g., 12345 or 12345-6789)';
              }
              return true;
            }
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.zipCode ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="12345"
        />
        {errors.zipCode && (
          <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Website URL
        </label>
        <input
          id="url"
          type="text"
          {...register('url', {
            required: 'URL is required',
            validate: (value) => {
              try {
                const url = new URL(value);
                return (url.protocol === 'http:' || url.protocol === 'https:') || 'URL must use http or https';
              } catch {
                return 'Invalid URL format';
              }
            }
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.url ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="https://example.com"
        />
        {errors.url && (
          <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
