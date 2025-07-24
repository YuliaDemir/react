import { useState } from "react";

export function useLocalStorage(): [string, (query: string) => void] {
    const KEY = "query";
    const [currentQuery, setQuery] = useState(() => localStorage.getItem(KEY) || "" );
    
    const setNewQuery = (query: string) => {
        setQuery(query);
        localStorage.setItem(KEY, query);
    };

    return [currentQuery, setNewQuery];
} 