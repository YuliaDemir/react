import { useState } from 'react';

export const Search = (props: {
  onSearch: (value: string) => Promise<void>;
}) => {
  const [value, setValue] = useState(localStorage.getItem('query') || '');

  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        type="text"
        className="border rounded-2xl px-3 py-2 w-98"
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
      ></input>
      <button
        className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl hover:bg-blue-300 transition"
        onClick={() => props.onSearch(value)}
      >
        Search
      </button>
    </div>
  );
};
