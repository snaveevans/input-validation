import { useForm, useFieldArray } from 'react-hook-form';

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
}

interface FormData {
  companyName: string;
  addresses: Address[];
  projects: Project[];
}

export default function NestedFormArrays() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      companyName: '',
      addresses: [{ street: '', city: '', zipCode: '' }],
      projects: [{ name: '', description: '', technologies: [''] }]
    }
  });

  const { fields: addressFields, append: appendAddress, remove: removeAddress } = useFieldArray({
    control,
    name: 'addresses'
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const onSubmit = (data: FormData) => {
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          {...register('companyName', {
            required: 'Company name is required'
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.companyName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Addresses
        </label>
        {addressFields.map((field, index) => (
          <div key={field.id} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Street
                </label>
                <input
                  type="text"
                  {...register(`addresses.${index}.street` as const, {
                    required: 'Street is required'
                  })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.addresses?.[index]?.street ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.addresses?.[index]?.street && (
                  <p className="mt-1 text-xs text-red-600">{errors.addresses[index]?.street?.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    {...register(`addresses.${index}.city` as const, {
                      required: 'City is required'
                    })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.addresses?.[index]?.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.addresses?.[index]?.city && (
                    <p className="mt-1 text-xs text-red-600">{errors.addresses[index]?.city?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    {...register(`addresses.${index}.zipCode` as const, {
                      required: 'ZIP code is required',
                      pattern: {
                        value: /^\d{5}$/,
                        message: 'Invalid ZIP'
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.addresses?.[index]?.zipCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.addresses?.[index]?.zipCode && (
                    <p className="mt-1 text-xs text-red-600">{errors.addresses[index]?.zipCode?.message}</p>
                  )}
                </div>
              </div>

              {addressFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAddress(index)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove Address
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendAddress({ street: '', city: '', zipCode: '' })}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Add Address
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Projects
        </label>
        {projectFields.map((field, projectIndex) => (
          <div key={field.id} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  {...register(`projects.${projectIndex}.name` as const, {
                    required: 'Project name is required'
                  })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.projects?.[projectIndex]?.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.projects?.[projectIndex]?.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.projects[projectIndex]?.name?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  {...register(`projects.${projectIndex}.description` as const, {
                    required: 'Description is required',
                    minLength: {
                      value: 10,
                      message: 'Description must be at least 10 characters'
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.projects?.[projectIndex]?.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={2}
                />
                {errors.projects?.[projectIndex]?.description && (
                  <p className="mt-1 text-xs text-red-600">{errors.projects[projectIndex]?.description?.message}</p>
                )}
              </div>

              {projectFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(projectIndex)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove Project
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendProject({ name: '', description: '', technologies: [''] })}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Add Project
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
