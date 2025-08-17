import { useSelector, useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import {
  clearSelected,
  downloadSelected,
} from '@/features/slices/selected-slice';
import type { RootState } from '@/features/slices/store';
import { useTranslations } from 'next-intl';

export const Flyout = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selected);
  const t = useTranslations('flyout');

  if (selected.length === 0) return null;

  return (
    <div
      className={twMerge(
        'fixed bottom-0 left-0 z-50 w-full',
        'bg-blue-600 text-white px-6 py-3 shadow-lg',
        'flex justify-between items-center'
      )}
    >
      <span className="text-lg font-medium">
        {' '}
        {selected.length} {t('selected')}
      </span>
      <div className="space-x-3">
        <button
          className={twMerge(
            'bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl',
            'hover:bg-blue-300 transition'
          )}
          onClick={() => dispatch(clearSelected())}
        >
          {t('all')}
        </button>
        <button
          className={twMerge(
            'bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl',
            'hover:bg-blue-300 transition'
          )}
          onClick={() => dispatch(downloadSelected())}
        >
          {t('download')}
        </button>
      </div>
    </div>
  );
};
