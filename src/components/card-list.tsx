import { Card } from './';

import type { Pokemons } from './types/interfaces';

export const CardList = (props: { pokemons: Pokemons[] }) => {
  const { pokemons } = props;

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <header className="flex justify-between px-15 mb-4 border-b pb-2">
        <h3 className="font-semibold text-lg">Pokemon's name</h3>
        <h3 className="font-semibold text-lg">Pokemon's image</h3>
      </header>
      <main className="grid grid-cols-1 gap-4">
        {pokemons.map((card) => {
          const urlParts = card.url.split('/');
          const id = urlParts[urlParts.length - 2];

          return (
            <div key={id}>
              <Card name={card.name} description={card.url} />
            </div>
          );
        })}
      </main>
    </div>
  );
};
