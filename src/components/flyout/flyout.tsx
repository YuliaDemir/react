import { useSelector, useDispatch } from 'react-redux';

import { clearSelected, downloadSelected } from '../../features/selected-slice';

import type { RootState } from '../../app/store';

export const Flyout = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selected);

  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-lg z-50">
      <span className="text-lg font-medium">
        {' '}
        {selected.length} items selected
      </span>
      <div className="space-x-3">
        <button
          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl hover:bg-blue-300 transition"
          onClick={() => dispatch(clearSelected())}
        >
          Unselect All
        </button>
        <button
          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl hover:bg-blue-300 transition"
          onClick={() => dispatch(downloadSelected())}
        >
          Download
        </button>
      </div>
    </div>
  );
};
