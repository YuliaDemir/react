'use client';
import { usePathname } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

import {
  CardList,
  Flyout,
  Header,
  LeftRight,
  Loader,
  Selected,
} from '@/components';
import { LINK } from '@/constants';
import { useGetPokemonsQuery } from '@/features/slices/api-slice';
import { useLocalStorage, usePagination } from '@/hooks';

function Home() {
  const [curLSValue, setLSValue] = useLocalStorage();
  const [searchValue, setSearchValue] = useState('');
  const [page, , setPage] = usePagination();
  const pathname = usePathname();

  const queryParam = searchValue.trim()
    ? { name: searchValue, page: 0 }
    : { page: Number(page), name: '' };

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

  const pokemons = searchValue.trim()
    ? data
      ? [
          {
            name: curLSValue,
            url: `${LINK}${searchValue}`,
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
            pathname !== '/' ? 'w-1/2' : 'w-full'
          } `}
        >
          <CardList pokemons={pokemons} />
        </div>
        {/**rightSlot && (
          <div className="w-1/4 min-h-20 border-l pl-4">{rightSlot}</div>
        )*/}
      </div>
      <LeftRight curPage={page} setPage={setPage} />
      <Flyout />
    </div>
  );
}

export default function WrappedHome() {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  );
}
