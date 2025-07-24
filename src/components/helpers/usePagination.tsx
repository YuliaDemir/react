import { useSearchParams } from "react-router";

export function usePagination () {
    const OFSET_KEY = 'ofset';
    const LIMIT_KEY = 'limit';
    const LIMIT_NUMBER = 20;
    
    const [searchParam, setSearchParam] = useSearchParams();
    const curPagenationQwery = `?${OFSET_KEY}=${searchParam.get(OFSET_KEY) || '0'}&${LIMIT_KEY}=${LIMIT_NUMBER}`;
    searchParam.set(LIMIT_KEY, LIMIT_NUMBER.toString());

    const setPage = (page: number) => {
        searchParam.set(OFSET_KEY, page.toString());
        setSearchParam(searchParam);
    }

    return [curPagenationQwery, setPage];
}
