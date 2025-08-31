import { useSelector } from 'react-redux';

import type { RootState } from '../state/store';
import type { Datas } from '../types';

export const CardRow = ({ data }: { data: Datas }) => {
  const selectedCols = useSelector(
    (state: RootState) => state.selectedColomns.selectedColomns,
  );

  return (
    <>
      <div>{data.year ?? 'N/A'}</div>
      <div className="text-right">{data.population ?? 'N/A'}</div>
      <div className="text-right">{data.co2 ?? 'N/A'}</div>
      <div className="text-right">{data.co2_per_capita ?? 'N/A'}</div>
      {selectedCols.map((col) => (
        <div className="text-right">{data[col] ?? 'N/A'}</div>
      ))}
    </>
  );
};
