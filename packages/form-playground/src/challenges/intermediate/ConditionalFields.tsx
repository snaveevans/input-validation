import { useForm } from 'react-hook-form';

interface FormData {
  hasCompany: boolean;
  companyName?: string;
  jobTitle?: string;
  employmentType: string;
  isStudent: boolean;
  schoolName?: string;
}

export default function ConditionalFields() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      hasCompany: false,
      isStudent: false,
      employmentType: ''
    }
  });

  const hasCompany = watch('hasCompany');
  const isStudent = watch('isStudent');

  const onSubmit = (data: FormData) => {
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center">
        <input
          id="hasCompany"
          type="checkbox"
          {...register('hasCompany')}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="hasCompany" className="ml-2 block text-sm text-gray-700">
          I am currently employed
        </label>
      </div>

      {hasCompany && (
        <>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              {...register('companyName', {
                required: hasCompany ? 'Company name is required' : false,
                minLength: {
                  value: 2,
                  message: 'Company name must be at least 2 characters'
                }
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
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              {...register('jobTitle', {
                required: hasCompany ? 'Job title is required' : false
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.jobTitle ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.jobTitle.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type
            </label>
            <select
              id="employmentType"
              {...register('employmentType', {
                required: hasCompany ? 'Employment type is required' : false
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.employmentType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select type...</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
            {errors.employmentType && (
              <p className="mt-1 text-sm text-red-600">{errors.employmentType.message}</p>
            )}
          </div>
        </>
      )}

      <div className="flex items-center">
        <input
          id="isStudent"
          type="checkbox"
          {...register('isStudent')}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="isStudent" className="ml-2 block text-sm text-gray-700">
          I am currently a student
        </label>
      </div>

      {isStudent && (
        <div>
          <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
            School Name
          </label>
          <input
            id="schoolName"
            type="text"
            {...register('schoolName', {
              required: isStudent ? 'School name is required' : false,
              minLength: {
                value: 2,
                message: 'School name must be at least 2 characters'
              }
            })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.schoolName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.schoolName && (
            <p className="mt-1 text-sm text-red-600">{errors.schoolName.message}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
