import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { CardList, Loader, Header, Selected, Flyout } from '@/components';
import { LeftRight } from '@/components';
import { LINK } from '@/constants';
import { useLocalStorage, usePagination } from '@/hooks';
import type { Pokemons } from '@/types';

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

  return (
    <div className="p-4 max-w-screen-mdlg mx-auto">
      <Header handleSearch={handleSearch} />
      {state.isLoading ? (
        <Loader />
      ) : (
        <div className={`flex transition-all duration-300`}>
          <div className="w-1/4 pr-4">
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
      <LeftRight curPage={curPage} setPage={setPage} />
      <Flyout />
    </div>
  );
};
