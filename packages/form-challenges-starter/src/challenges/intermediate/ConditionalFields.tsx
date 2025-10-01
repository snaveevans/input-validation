interface FormData {
  hasCompany: boolean;
  companyName?: string;
  jobTitle?: string;
  employmentType: string;
  isStudent: boolean;
  schoolName?: string;
}

export default function ConditionalFields() {
  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form className="space-y-4">
      <div className="flex items-center">
        <input
          id="hasCompany"
          type="checkbox"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="hasCompany" className="ml-2 block text-sm text-gray-700">
          I am currently employed
        </label>
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          id="jobTitle"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
          Employment Type
        </label>
        <select
          id="employmentType"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select type...</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          id="isStudent"
          type="checkbox"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="isStudent" className="ml-2 block text-sm text-gray-700">
          I am currently a student
        </label>
      </div>

      <div>
        <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
          School Name
        </label>
        <input
          id="schoolName"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
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
