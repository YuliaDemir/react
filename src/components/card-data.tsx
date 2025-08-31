import { useSelector } from 'react-redux';

import { CardRow } from './card-row';

import type { RootState } from '../state/store';
import type { Datas } from '../types';

export const CardData = ({ iso, data }: { iso: string; data: Datas[] }) => {
  const selectedCols = useSelector(
    (state: RootState) => state.selectedColomns.selectedColomns,
  );
  const year = useSelector((state: RootState) => state.yearSearch.year);
  const row =
    year !== 'all'
      ? data.find((dataElement) => dataElement.year === Number(year))
      : null;
  return (
    <div className="space-y-1">
      {data?.length ? (
        year === 'all' ? (
          data.map((dataElement) => (
            <div
              key={`${iso}${dataElement.year}`}
              className="grid gap-2 items-center bg-gray-50 rounded-lg p-2 text-sm"
              style={{
                gridTemplateColumns: `repeat(${4 + selectedCols.length}, minmax(0, 1fr))`,
              }}
            >
              <CardRow data={dataElement} />
            </div>
          ))
        ) : (
          row && (
            <div
              key={`${iso}`}
              className="grid gap-2 items-center bg-gray-50 rounded-lg p-2 text-sm"
              style={{
                gridTemplateColumns: `repeat(${4 + selectedCols.length}, minmax(0, 1fr))`,
              }}
            >
              <CardRow data={row} />
            </div>
          )
        )
      ) : (
        <div className="text-sm text-gray-500 p-2">
          No yearly data available
        </div>
      )}
    </div>
  );
};
