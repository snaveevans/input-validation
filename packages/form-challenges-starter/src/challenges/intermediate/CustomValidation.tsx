interface FormData {
  username: string;
  creditCard: string;
  zipCode: string;
  website: string;
}

export default function CustomValidation() {
  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <p className="mt-1 text-xs text-gray-500">
          3-16 characters, alphanumeric and underscore only
        </p>
      </div>

      <div>
        <label htmlFor="creditCard" className="block text-sm font-medium text-gray-700 mb-1">
          Credit Card Number
        </label>
        <input
          id="creditCard"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <p className="mt-1 text-xs text-gray-500">
          Must pass Luhn algorithm validation
        </p>
      </div>

      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
          ZIP Code
        </label>
        <input
          id="zipCode"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <p className="mt-1 text-xs text-gray-500">
          5 digits or 5+4 format (e.g., 12345 or 12345-6789)
        </p>
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
          Website URL
        </label>
        <input
          id="website"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <p className="mt-1 text-xs text-gray-500">
          Must be a valid URL with http:// or https://
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
