import { useSearchParams } from 'react-router';

import { OFFSET_KEY, LIMIT_KEY, LIMIT_NUMBER } from '../../constants';

export function usePagination(): [
  curPage: string,
  curPaginationQuery: string,
  setPage: (page: number) => void,
] {
  const [searchParam, setSearchParam] = useSearchParams();
  const curPage = searchParam.get(OFFSET_KEY) || '0';
  const curPaginationQuery = `?${OFFSET_KEY}=${curPage}&${LIMIT_KEY}=${LIMIT_NUMBER}`;
  searchParam.set(LIMIT_KEY, LIMIT_NUMBER.toString());

  const setPage = (page: number) => {
    const newParams = new URLSearchParams(searchParam.toString());
    newParams.set(OFFSET_KEY, page.toString());
    setSearchParam(newParams);
  };

  return [curPage, curPaginationQuery, setPage];
}
