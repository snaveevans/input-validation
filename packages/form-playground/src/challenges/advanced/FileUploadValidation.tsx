import { useForm } from 'react-hook-form';
import { uploadFile } from '../../utils/mockApi';
import { useState } from 'react';

interface FormData {
  title: string;
  files: FileList;
}

export default function FileUploadValidation() {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

  const files = watch('files');

  const validateFiles = (fileList: FileList) => {
    if (fileList.length === 0) {
      return 'At least one file is required';
    }

    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      if (!allowedTypes.includes(file.type)) {
        return `Invalid file type: ${file.name}`;
      }

      if (file.size > maxSize) {
        return `File too large: ${file.name} (max 5MB)`;
      }
    }

    return true;
  };

  const onSubmit = async (data: FormData) => {
    setIsUploading(true);
    setUploadedFiles([]);
    const uploaded: string[] = [];

    for (let i = 0; i < data.files.length; i++) {
      const file = data.files[i];
      const result = await uploadFile(file, setUploadProgress);

      if (result.success && result.url) {
        uploaded.push(result.url);
      }
    }

    setUploadedFiles(uploaded);
    setIsUploading(false);
    setUploadProgress(0);
    alert(`Success! Uploaded ${uploaded.length} file(s)`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title', {
            required: 'Title is required'
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-1">
          Files (Images or PDF, max 5MB each)
        </label>
        <input
          id="files"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/gif,application/pdf"
          {...register('files', {
            validate: validateFiles
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.files ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.files && (
          <p className="mt-1 text-sm text-red-600">{errors.files.message}</p>
        )}

        {files && files.length > 0 && (
          <div className="mt-2 p-2 border border-gray-200 rounded-md bg-gray-50">
            <p className="text-xs font-medium text-gray-700 mb-1">Selected Files:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {Array.from(files).map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}

        {isUploading && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-600">Uploading... {uploadProgress}%</p>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="mt-2 p-2 border border-green-200 rounded-md bg-green-50">
            <p className="text-xs font-medium text-green-700 mb-1">Uploaded Successfully:</p>
            <ul className="text-sm text-green-600 space-y-1">
              {uploadedFiles.map((url, index) => (
                <li key={index} className="truncate">{url}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isUploading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
}
