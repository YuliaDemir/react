import { Card } from './';
import type { Pokemons } from './types/interfaces';

export const CardList = (props: { pokemons: Pokemons[]}) => {
  const { pokemons } = props;
    return (
      <div className="container">
        <header className="header">
          <h3>Item Name</h3>
          <h3>Item Description</h3>
        </header>
        <main className="main">
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
}
