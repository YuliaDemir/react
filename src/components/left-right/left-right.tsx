import { twMerge } from 'tailwind-merge';

import { LIMIT_NUMBER, MAX } from '@/constants';
export const LeftRight = ({
  curPage,
  setPage,
}: {
  curPage: string;
  setPage: (newPage: number) => void;
}) => {
  function navigate(curPage: number, left: boolean) {
    const newPage = curPage - (left ? LIMIT_NUMBER : -LIMIT_NUMBER);
    setPage(newPage);
  }

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        className={twMerge(
          'bg-gray-300  dark:bg-blue-500 hover:bg-gray-400',
          'px-4 py-2 rounded-2xl disabled:opacity-50'
        )}
        onClick={() => navigate(Number(curPage), true)}
        disabled={Number(curPage) <= 0}
      >
        Left
      </button>
      <button
        className={twMerge(
          'bg-gray-300 dark:bg-blue-500 hover:bg-gray-400',
          'px-4 py-2 rounded-2xl disabled:opacity-50'
        )}
        onClick={() => navigate(Number(curPage), false)}
        disabled={Number(curPage) > MAX - LIMIT_NUMBER}
      >
        Right
      </button>
    </div>
  );
};
