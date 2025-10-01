interface PersonalFormData {
  formType: 'personal';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

interface BusinessFormData {
  formType: 'business';
  companyName: string;
  taxId: string;
  industry: string;
}

type FormData = PersonalFormData | BusinessFormData;

export default function DynamicSchemaValidation() {
  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="formType" className="block text-sm font-medium text-gray-700 mb-1">
          Form Type
        </label>
        <select
          id="formType"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="personal">Personal</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          type="date"
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
