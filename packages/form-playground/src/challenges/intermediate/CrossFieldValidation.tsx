import { useForm } from 'react-hook-form';

interface FormData {
  password: string;
  confirmPassword: string;
  startDate: string;
  endDate: string;
}

export default function CrossFieldValidation() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const password = watch('password');
  const startDate = watch('startDate');

  const onSubmit = (data: FormData) => {
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match'
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          {...register('startDate', {
            required: 'Start date is required'
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.startDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.startDate && (
          <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          {...register('endDate', {
            required: 'End date is required',
            validate: (value) => {
              if (!startDate) return true;
              return new Date(value) >= new Date(startDate) || 'End date must be after start date';
            }
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.endDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.endDate && (
          <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
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
