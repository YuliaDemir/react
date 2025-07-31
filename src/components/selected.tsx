import { useSelector } from 'react-redux';

import { Card } from './card';
import { clearSelected, downloadSelected } from './slices/selected-slice';

import type { RootState } from './store';

export const Selected = () => {
  const selectedPokemons = useSelector((state: RootState) => state.selected);
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <header className="px-15 mb-4 border-b pb-2">
        <h3 className="font-semibold text-lg">Selected</h3>
      </header>
      <main className="grid grid-cols-1 gap-4">
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
      <div className="flex justify-center gap-1 mt-6">
        <button
          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl hover:bg-blue-300 transition"
          onClick={() => clearSelected}
        >
          Unselect All
        </button>
        <button
          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl hover:bg-blue-300 transition"
          onClick={() => downloadSelected}
        >
          Download
        </button>
      </div>
    </div>
  );
};
