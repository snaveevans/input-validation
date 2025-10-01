interface FormData {
  username: string;
  email: string;
}

export default function AsyncValidation() {
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
          Try: 'admin', 'user', 'test' (unavailable)
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <p className="mt-1 text-xs text-gray-500">
          Try: 'test@example.com' (already exists)
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
