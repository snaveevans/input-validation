import { useForm, useFieldArray } from 'react-hook-form';

interface PhoneNumber {
  type: string;
  number: string;
}

interface FormData {
  name: string;
  phones: PhoneNumber[];
}

export default function DynamicFields() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      phones: [{ type: 'mobile', number: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phones'
  });

  const onSubmit = (data: FormData) => {
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            }
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Numbers
        </label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <select
              {...register(`phones.${index}.type` as const, {
                required: 'Type is required'
              })}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="mobile">Mobile</option>
              <option value="home">Home</option>
              <option value="work">Work</option>
            </select>
            <input
              type="tel"
              {...register(`phones.${index}.number` as const, {
                required: 'Phone number is required',
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: 'Invalid phone number'
                }
              })}
              className={`flex-1 px-3 py-2 border rounded-md ${
                errors.phones?.[index]?.number ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123-456-7890"
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {errors.phones && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phones.message || errors.phones[fields.length - 1]?.number?.message}
          </p>
        )}
        <button
          type="button"
          onClick={() => append({ type: 'mobile', number: '' })}
          className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Add Phone Number
        </button>
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
