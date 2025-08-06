import { useSelector } from 'react-redux';

import type { RootState } from '@/app/store';

import { Card } from '../';

export const Selected = () => {
  const selectedPokemons = useSelector((state: RootState) => state.selected);
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <header className="px-15 mb-4 border-b pb-2 dark:border-blue-300 ">
        <h3 className="font-semibold text-lg dark:text-blue-600">Selected</h3>
      </header>
      <main className="grid grid-cols-1 gap-4 max-h-96 overflow-auto">
        {selectedPokemons.map((card) => {
          const urlParts = card.url.split('/');
          const id = urlParts[urlParts.length - 2];

          return (
            <div key={id}>
              <Card name={card.name} description={card.url} mainCard={false} />
            </div>
          );
        })}
      </main>
    </div>
  );
};
