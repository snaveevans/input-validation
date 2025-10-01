interface FormData {
  age: number;
  quantity: number;
}

export default function NumberValidation() {
  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(`Success! Age: ${data.age}, Quantity: ${data.quantity}`);
  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          Age
        </label>
        <input
          id="age"
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
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
