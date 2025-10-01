interface FormData {
  files: FileList;
}

export default function FileUploadValidation() {
  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(`Success! ${data.files.length} file(s) uploaded`);
  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Files
        </label>
        <input
          id="files"
          type="file"
          multiple
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <p className="mt-1 text-xs text-gray-500">
          Accepted: Images (JPG, PNG, GIF) and PDFs. Max 5MB per file.
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
