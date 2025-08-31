import { useSelector } from 'react-redux';

import type { RootState } from '../state/store';

export const CardSecondaryHeader = () => {
  const selectedCols = useSelector(
    (state: RootState) => state.selectedColomns.selectedColomns,
  );
  return (
    <div
      className="grid gap-2 text-xs text-gray-600 font-semibold px-2"
      style={{
        gridTemplateColumns: `repeat(${4 + selectedCols.length}, minmax(0, 1fr))`,
      }}
    >
      <div>Year</div>
      <div className="text-right">Population</div>
      <div className="text-right">CO₂</div>
      <div className="text-right">CO₂ / cap</div>
      {selectedCols.map((col) => (
        <div className="text-right">{col}</div>
      ))}
    </div>
  );
};
