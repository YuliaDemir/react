import { useEffect, useState } from 'react';

import type { JsonType } from '../types';

export const useBigJson = () => {
  const [data, setData] = useState<JsonType>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/owid-co2-data.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);
  return { data, loading };
};
