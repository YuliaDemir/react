import { useState } from 'react';

export const Search = (props: {
  onSearch: (value: string) => Promise<void>;
}) => {
  const [value, setValue] = useState(localStorage.getItem('query') || '');

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
      ></input>
      <button onClick={() => props.onSearch(value)}>Search</button>
    </div>
  );
};
