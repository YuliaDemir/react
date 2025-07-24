import { Link, Outlet } from "react-router";
import { CardList, Loader, Search } from "./";
import { useEffect, useState } from "react";
import type { Pokemons } from "./types/interfaces";
import { useLocalStorage, usePagination } from "./helpers";

const LINK = 'https://pokeapi.co/api/v2/pokemon/';

export const Home = () => {
  const [ state, setState ] = useState<{
        data: Pokemons[],
        error: null | Error,
        isLoading: boolean,
    }>({
        data: [],
        error: null,
        isLoading: false,
  });

  const [curLSValue, setLSValue] = useLocalStorage();
  const [curPagination] = usePagination();

  useEffect (() => {
    handleSearch(curLSValue);
  }, [curLSValue]);



  async function handleSearch(query: string) {
    const newQuery = query ? query + '/' : curPagination;
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const requestedData = await fetch(`${LINK}${newQuery}`)
      .then((res) => {
          if (!res.ok) {
            throw new Error('Not found!');
          }
          return res.json();
      });

      let result = requestedData.results;
      
      if (query.trim()) {
        setLSValue(query);
        result = [{
          name: curLSValue,
          url: `${LINK}${curLSValue}`,
        },]
      }
      setState(() => ({ 
        error: null, 
        data: result,//requestedData.results,
        isLoading: false,
      }));

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
      <Link to="/about">About</Link>
      {state.isLoading ? (<Loader />) : (<CardList pokemons={[...state.data]} />)}
      <Outlet/>
    </>
  );
}


