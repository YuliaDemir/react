import { useRef } from 'react';
import { Link, useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { AbilityItem, Loader } from '@/components';
import { LINK } from '@/constants';
import { useGetDataQuery } from '@/features/slices/api-slice';
import { usePagination } from '@/hooks';
import type { AbilityItemType } from '@/types';

export const Description = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [, currPaginationQuery] = usePagination();
  const { index } = useParams();

  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetDataQuery(`${LINK}${index}`);

  if (isLoading) return <Loader />;
  if (error || !pokemon) return <div>Error loading data</div>;

  return (
    <div
      ref={ref}
      className={twMerge(
        'relative p-6 w-full max-w-md mx-auto mt-4',
        ' bg-white dark:bg-blue-200 shadow-lg rounded-2xl'
      )}
    >
      <Link
        to={'/' + currPaginationQuery}
        className="absolute top-2 right-2 text-gray-700 hover:text-red-600 transition"
        aria-label="Close"
      >
        ✖
      </Link>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Abilities of {index?.toUpperCase()}
      </h2>
      <ul className="space-y-2">
        {pokemon.abilities.map((a: AbilityItemType) => (
          <AbilityItem url={a.ability.url} />
        ))}
      </ul>
    </div>
  );
};
