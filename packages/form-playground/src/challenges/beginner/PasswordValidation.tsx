import { useForm } from 'react-hook-form';

interface FormData {
  password: string;
}

export default function PasswordValidation() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

  const password = watch('password', '');

  const getStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[!@#$%^&*]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

  const onSubmit = () => {
    alert('Success! Password is valid');
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
            },
            validate: {
              hasUpperCase: (value) => /[A-Z]/.test(value) || 'Must contain at least one uppercase letter',
              hasLowerCase: (value) => /[a-z]/.test(value) || 'Must contain at least one lowercase letter',
              hasNumber: (value) => /\d/.test(value) || 'Must contain at least one number',
              hasSpecial: (value) => /[!@#$%^&*]/.test(value) || 'Must contain at least one special character'
            }
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {password && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded ${
                    i < strength ? strengthColors[strength - 1] : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Strength: {strengthLabels[strength - 1] || 'Very Weak'}
            </p>
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
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
