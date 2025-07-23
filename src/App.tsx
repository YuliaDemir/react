import { useEffect, useState } from 'react';
import './App.css';
import { Search, CardList, Loader } from './components';
import type { Pokemons } from './components/types/interfaces';

const LINK = 'https://pokeapi.co/api/v2/pokemon/';

const App = () => {

  const [ state, setState ] = useState<{
    data: Pokemons[],
    error: null | Error,
    isLoading: boolean,
  }>({
    data: [],
    error: null,
    isLoading: false,
  });

  useEffect (() => {
    const wrapAsyncFunc = async () => {
      const previousQuery = localStorage.getItem('query')?.trim();
      if (previousQuery) {
        handleSearch(previousQuery);
      } else {
        const requestedData = await fetch(
          `${LINK}?offset=0&limit=1302`
        ).then((res) => res.json());
        setState((prev) => ({ ...prev, data: requestedData.results }));
      }
    }
  wrapAsyncFunc();
  }, []);

  async function handleSearch(query: string) {
    const trimmedQuery = query.trim();
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      await fetch(`${LINK}${trimmedQuery}`).then(
        (res) => {
          if (!res.ok) {
            throw new Error('Not found!');
          }
          return res.json();
        }
      );

      setState((prev) => ({ 
        ...prev, 
        data: [{
            name: trimmedQuery,
            url: `${LINK}${trimmedQuery}`,
          },],
        isLoading: false,
      }));
      localStorage.setItem('query', trimmedQuery);
    } catch (err) {
      setState((prev) => ({ ...prev, error: err as Error, isLoading: false }));
    }
  };


    if (state.error) {
      throw state.error;
    }
    return (
      <>
        <Search onSearch={ handleSearch } />
        {state.isLoading ? (
          <Loader />
        ) : (
          <CardList pokemons={state.data} />
        )}
        <button
          onClick={() => setState((prev) => ({ ...prev, error: new Error('Test error') }))}
        >
          Throw error
        </button>
      </>
    );
}

export default App;
