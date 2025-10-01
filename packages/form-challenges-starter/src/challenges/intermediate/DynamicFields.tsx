interface PhoneNumber {
  number: string;
}

interface FormData {
  name: string;
  phoneNumbers: PhoneNumber[];
}

export default function DynamicFields() {
  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Numbers
        </label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="Phone number"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
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
