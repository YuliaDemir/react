import { useState } from 'react';

import { useLocalStorage } from '@/hooks';
import { useTranslations } from 'next-intl';

export const Search = (props: { onSearch: (value: string) => void }) => {
  const [LSvalue] = useLocalStorage();
  const [value, setValue] = useState(() => LSvalue || '');
  const t = useTranslations('search');

  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        type="text"
        className="border rounded-2xl px-3 py-2 w-98 dark:border-blue-300 dark:text-blue-600"
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
      ></input>
      <button
        className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl hover:bg-blue-300 transition"
        onClick={() => props.onSearch(value)}
      >
        {t("search")}
      </button>
    </div>
  );
};
