interface FormData {
  password: string;
}

export default function PasswordValidation() {
  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(`Success! Password is strong.`);
  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
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
