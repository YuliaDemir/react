import { useSelector } from 'react-redux';

import type { RootState } from '../state/store';
import type { Datas } from '../types';

export const CardData = ({ iso, data }: { iso: string; data: Datas[] }) => {
  const selectedCols = useSelector((state: RootState) => state.selectedColomns.selectedColomns)
  
  return (
    <div className="space-y-1">
      {data?.length ? (
        data.map(({ year, ...others }) => (
          <div
            key={`${iso}${year}`}
            className="grid gap-2 items-center bg-gray-50 rounded-lg p-2 text-sm"
            style={{ gridTemplateColumns: `repeat(${4 + selectedCols.length}, minmax(0, 1fr))` }}
          >
            <div>{year ?? 'N/A'}</div>
            <div className="text-right">{others.population ?? 'N/A'}</div>
            <div className="text-right">{others.co2 ?? 'N/A'}</div>
            <div className="text-right">{others.co2_per_capita ?? 'N/A'}</div>
            {selectedCols.map(col => 
              <div className="text-right">{others[col] ?? 'N/A'}</div>
            )}
          </div>
        ))
      ) : (
        <div className="text-sm text-gray-500 p-2">
          No yearly data available
        </div>
      )}
    </div>
  );
};
