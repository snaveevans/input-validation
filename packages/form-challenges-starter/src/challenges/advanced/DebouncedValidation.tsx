interface FormData {
  username: string;
  search: string;
}

export default function DebouncedValidation() {
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
          Validation debounced by 1 second
        </p>
      </div>

      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search Query
        </label>
        <input
          id="search"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <p className="mt-1 text-xs text-gray-500">
          Debounced by 500ms
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
