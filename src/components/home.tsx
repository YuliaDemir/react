import { Outlet } from 'react-router';
import { CardList, Loader, Header } from './';
import { useCallback, useEffect, useState } from 'react';
import type { Pokemons } from './types/interfaces';
import { useLocalStorage, usePagination } from './helpers';
localStorage.clear();

const LINK = 'https://pokeapi.co/api/v2/pokemon/';
const LIMIT_NUMBER = 20;
const MAX = 1302;

export const Home = () => {
  const [state, setState] = useState<{
    data: Pokemons[];
    error: null | Error;
    isLoading: boolean;
  }>({
    data: [],
    error: null,
    isLoading: false,
  });

  const [curLSValue, setLSValue] = useLocalStorage();
  const [curPage, curPagination, setPage] = usePagination();

  const handleSearch = useCallback(
    async (query: string) => {
      const newQuery = query ? query + '/' : curPagination;
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const requestedData = await fetch(`${LINK}${newQuery}`).then((res) => {
          if (!res.ok) {
            throw new Error('Not found!');
          }
          return res.json();
        });

        let result = requestedData.results;

        if (query.trim()) {
          setLSValue(query);
          result = [
            {
              name: curLSValue,
              url: `${LINK}${curLSValue}`,
            },
          ];
        }
        setState(() => ({
          error: null,
          data: result, //requestedData.results,
          isLoading: false,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err as Error,
          isLoading: false,
        }));
      }
    },
    [curLSValue, setLSValue, setState, curPagination]
  );

  useEffect(() => {
    handleSearch(curLSValue);
  }, [curLSValue, curPage, handleSearch]);

  if (state.error) {
    throw state.error;
  }

  function navigate(curPage: number, left: boolean) {
    const newPage = curPage - (left ? LIMIT_NUMBER : -LIMIT_NUMBER);
    setPage(newPage);
  }

  return (
    <>
      <Header handleSearch={handleSearch} />
      {state.isLoading ? <Loader /> : <CardList pokemons={[...state.data]} />}
      <Outlet />
      <button
        onClick={() => navigate(Number(curPage), true)}
        disabled={Number(curPage) <= 0}
      >
        Left
      </button>
      <button
        onClick={() => navigate(Number(curPage), false)}
        disabled={Number(curPage) > MAX - LIMIT_NUMBER}
      >
        Right
      </button>
    </>
  );
};
