import { useSearchParams } from "react-router";

export function usePagination (): [curPage: string, curPagenationQwery: string, setPage: (page: number) => void] {
    const OFFSET_KEY = 'offset';
    const LIMIT_KEY = 'limit';
    const LIMIT_NUMBER = 20;
    
    const [searchParam, setSearchParam] = useSearchParams();
    const curPage = searchParam.get(OFFSET_KEY) || '0';
    const curPagenationQwery = `?${OFFSET_KEY}=${curPage}&${LIMIT_KEY}=${LIMIT_NUMBER}`;
    searchParam.set(LIMIT_KEY, LIMIT_NUMBER.toString());

    const setPage = (page: number) => {
        const newParams = new URLSearchParams(searchParam.toString());
        newParams.set(OFFSET_KEY, page.toString());
        setSearchParam(newParams);
    }

    return [curPage, curPagenationQwery, setPage];
}
