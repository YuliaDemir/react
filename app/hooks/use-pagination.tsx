'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { OFFSET_KEY, LIMIT_KEY, LIMIT_NUMBER } from '@/constants';

export function usePagination(): [
  curPage: string,
  curPaginationQuery: string,
  setPage: (page: number) => void,
] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const curPage = searchParams?.get(OFFSET_KEY) || '0';
  const curPaginationQuery = `?${OFFSET_KEY}=${curPage}&${LIMIT_KEY}=${LIMIT_NUMBER}`;

  const setPage = useCallback(
    (page: number) => {
      if (!searchParams) return;
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(OFFSET_KEY, page.toString());
      newParams.set(LIMIT_KEY, LIMIT_NUMBER.toString());
      router.push(`${pathname}?${newParams.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return [curPage, curPaginationQuery, setPage];
}
