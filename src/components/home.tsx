import { Outlet } from 'react-router';
import { CardList, Loader, Header } from './';
import { useCallback, useEffect, useState } from 'react';
import type { Pokemons } from './types/interfaces';
import { useLocalStorage, usePagination } from './helpers';
import { LIMIT_NUMBER, MAX, LINK } from './helpers/consts';

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
  }, [curLSValue, curPage]);

  if (state.error) {
    throw state.error;
  }

  function navigate(curPage: number, left: boolean) {
    const newPage = curPage - (left ? LIMIT_NUMBER : -LIMIT_NUMBER);
    setPage(newPage);
  }

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <Header handleSearch={handleSearch} />
      {state.isLoading ? (
        <Loader /> 
      ): (
        <div className={`flex transition-all duration-300`}>
          <div
            className={`transition-all duration-300 ${
              location.pathname !== '/' ? 'w-2/3' : 'w-full'
            }`}
          >
            <CardList pokemons={[...state.data]} />
          </div>
          {location.pathname !== '/' && (
            <div className='w-1/3 min-h-[80h] border-l pl-4'>
              <Outlet />
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-2xl disabled:opacity-50"
          onClick={() => navigate(Number(curPage), true)}
          disabled={Number(curPage) <= 0}
        >
          Left
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-2xl disabled:opacity-50"
          onClick={() => navigate(Number(curPage), false)}
          disabled={Number(curPage) > MAX - LIMIT_NUMBER}
        >
          Right
        </button>
      </div>
    </div>
  );
};
