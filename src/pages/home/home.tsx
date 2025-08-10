import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import { CardList, Loader, Header, Selected, Flyout } from '@/components';
import { LeftRight } from '@/components';
import { LINK } from '@/constants';
import { useGetPokemonsQuery } from '@/features/slices/api-slice';
import { useLocalStorage, usePagination } from '@/hooks';

export const Home = () => {
  const [curSearchValue, setSearchValue] = useState('');
  const [curLSValue, setLSValue] = useLocalStorage();
  const [curPage, , setPage] = usePagination();
  const location = useLocation();

  const queryParam = curSearchValue.trim()
    ? { name: curSearchValue, page: 0 }
    : { page: Number(curPage), name: '' };
  const { data, error, isLoading } = useGetPokemonsQuery(queryParam);

  useEffect(() => {
    if (curLSValue) {
      setSearchValue(curLSValue);
    }
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchValue(query);
      if (query.trim()) {
        setLSValue(query);
      } else {
        setLSValue('');
      }
    },
    [setLSValue]
  );

  if (error) {
    return (
      <div>
        <span>Error loading all cards</span>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  const pokemons = curSearchValue.trim()
    ? data
      ? [
          {
            name: curLSValue,
            url: `${LINK}${curSearchValue}`,
          },
        ]
      : []
    : data?.results || [];

  return (
    <div className="p-4 max-w-screen-mdlg mx-auto">
      <Header handleSearch={handleSearch} />
      <div className={`flex transition-all duration-300`}>
        <div className="w-1/4 pr-4">
          <Selected />
        </div>
        <div
          className={`transition-all duration-300 ${
            location.pathname !== '/' ? 'w-1/2' : 'w-full'
          }`}
        >
          <CardList pokemons={pokemons} />
        </div>
        {location.pathname !== '/' && (
          <div className="w-1/4 min-h-20 border-l pl-4">
            <Outlet />
          </div>
        )}
      </div>
      <LeftRight curPage={curPage} setPage={setPage} />
      <Flyout />
    </div>
  );
};
