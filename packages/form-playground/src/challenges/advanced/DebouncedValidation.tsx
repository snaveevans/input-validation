import { useForm } from 'react-hook-form';
import { checkUsernameAvailability } from '../../utils/mockApi';
import { useState, useRef } from 'react';

interface FormData {
  username: string;
  searchQuery: string;
}

export default function DebouncedValidation() {
  const [isChecking, setIsChecking] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const validateUsername = async (value: string) => {
    setIsChecking(true);

    return new Promise<string | boolean>((resolve) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        const isAvailable = await checkUsernameAvailability(value);
        setIsChecking(false);
        resolve(isAvailable || 'Username is already taken');
      }, 1000);
    });
  };

  const handleSearch = (query: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!query) {
      setSearchResults([]);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      const mockResults = [
        `${query} - Result 1`,
        `${query} - Result 2`,
        `${query} - Result 3`
      ];
      setSearchResults(mockResults);
    }, 500);
  };

  const onSubmit = (data: FormData) => {
    alert(`Success! Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username (Debounced Async Validation)
          {isChecking && <span className="ml-2 text-blue-500">Validating...</span>}
        </label>
        <input
          id="username"
          type="text"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters'
            },
            validate: validateUsername
          })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.username ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Validation waits 1 second after you stop typing
        </p>
      </div>

      <div>
        <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
          Search Query (Debounced Search)
        </label>
        <input
          id="searchQuery"
          type="text"
          {...register('searchQuery', {
            onChange: (e) => handleSearch(e.target.value)
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Type to search..."
        />
        {searchResults.length > 0 && (
          <div className="mt-2 p-2 border border-gray-200 rounded-md bg-gray-50">
            <p className="text-xs font-medium text-gray-700 mb-1">Search Results:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Search executes 500ms after you stop typing
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
