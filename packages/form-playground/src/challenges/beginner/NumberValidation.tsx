import { useForm } from 'react-hook-form';

interface FormData {
  age: number;
  quantity: number;
}

export default function NumberValidation() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(`Success! Age: ${data.age}, Quantity: ${data.quantity}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          Age
        </label>
        <input
          id="age"
          type="number"
          {...register('age', {
            required: 'Age is required',
            valueAsNumber: true,
            min: {
              value: 18,
              message: 'You must be at least 18 years old'
            },
            max: {
              value: 120,
              message: 'Please enter a valid age'
            }
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          Quantity (1-10)
        </label>
        <input
          id="quantity"
          type="number"
          {...register('quantity', {
            required: 'Quantity is required',
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Minimum quantity is 1'
            },
            max: {
              value: 10,
              message: 'Maximum quantity is 10'
            }
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.quantity ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
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
