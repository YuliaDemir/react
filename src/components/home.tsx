import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { CardList, Loader, Header, Selected, Flyout } from './';
import { useLocalStorage, usePagination } from './helpers';
import { LIMIT_NUMBER, MAX, LINK } from './helpers/consts';

import type { Pokemons } from './types/interfaces';

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

  const [curSearchValue, setSearchValue] = useState('');
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
              name: query,
              url: `${LINK}${query}`,
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
    [curSearchValue, setSearchValue, setState, curPagination]
  );

  useEffect(() => {
    if (curLSValue) {
      handleSearch(curLSValue);
    }
  }, []);

  useEffect(() => {
    handleSearch(curSearchValue);
  }, [curSearchValue, curPage]);

  if (state.error) {
    throw state.error;
  }

  function navigate(curPage: number, left: boolean) {
    const newPage = curPage - (left ? LIMIT_NUMBER : -LIMIT_NUMBER);
    setPage(newPage);
  }

  return (
    <div className="p-4 max-w-screen-mdlg mx-auto">
      <Header handleSearch={handleSearch} />
      {state.isLoading ? (
        <Loader />
      ) : (
        <div className={`flex transition-all duration-300`}>
          <div className="w=1/4 pr-4">
            <Selected />
          </div>
          <div
            className={`transition-all duration-300 ${
              location.pathname !== '/' ? 'w-1/2' : 'w-full'
            }`}
          >
            <CardList pokemons={[...state.data]} />
          </div>
          {location.pathname !== '/' && (
            <div className="w-1/4 min-h-20 border-l pl-4">
              <Outlet />
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-gray-300  dark:bg-blue-500 hover:bg-gray-400 px-4 py-2 rounded-2xl disabled:opacity-50"
          onClick={() => navigate(Number(curPage), true)}
          disabled={Number(curPage) <= 0}
        >
          Left
        </button>
        <button
          className="bg-gray-300 dark:bg-blue-500 hover:bg-gray-400 px-4 py-2 rounded-2xl disabled:opacity-50"
          onClick={() => navigate(Number(curPage), false)}
          disabled={Number(curPage) > MAX - LIMIT_NUMBER}
        >
          Right
        </button>
      </div>
      <Flyout />
    </div>
  );
};
