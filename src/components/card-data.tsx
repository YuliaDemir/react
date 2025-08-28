import type { Datas } from '../types';

export const CardData = ({ iso, data }: { iso: string; data: Datas[] }) => {
  return (
    <div className="space-y-1">
      {data?.length ? (
        data.map(({ year, ...others }) => (
          <div
            key={`${iso}${year}`}
            className="grid grid-cols-4 gap-2 items-center bg-gray-50 rounded-lg p-2 text-sm"
          >
            <div>{year ?? 'N/A'}</div>
            <div className="text-right">{others.population ?? 'N/A'}</div>
            <div className="text-right">{others.co2 ?? 'N/A'}</div>
            <div className="text-right">{others.co2_per_capita ?? 'N/A'}</div>
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
