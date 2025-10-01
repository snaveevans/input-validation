import { useForm } from 'react-hook-form';
import { checkUsernameAvailability, checkEmailExists } from '../../utils/mockApi';
import { useState } from 'react';

interface FormData {
  username: string;
  email: string;
}

export default function AsyncValidation() {
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const validateUsername = async (value: string) => {
    setIsCheckingUsername(true);
    const isAvailable = await checkUsernameAvailability(value);
    setIsCheckingUsername(false);
    return isAvailable || 'Username is already taken';
  };

  const validateEmail = async (value: string) => {
    setIsCheckingEmail(true);
    const exists = await checkEmailExists(value);
    setIsCheckingEmail(false);
    return !exists || 'Email is already registered';
  };

  const onSubmit = (data: FormData) => {
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
          {isCheckingUsername && <span className="ml-2 text-blue-500">Checking...</span>}
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
        <p className="mt-1 text-xs text-gray-500">
          Try: 'admin', 'user', 'test' (unavailable)
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
          {isCheckingEmail && <span className="ml-2 text-blue-500">Checking...</span>}
        </label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            },
            validate: validateEmail
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Try: 'test@example.com' (already exists)
        </p>
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
