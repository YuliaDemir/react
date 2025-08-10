import { useRef } from 'react';
import { Link, useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { AbilityItem, Loader } from '@/components';
import { useGetPokemonsQuery } from '@/features/slices/api-slice';
import { usePagination } from '@/hooks';
import type { AbilityItemType } from '@/types';

export const Description = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [, currPaginationQuery] = usePagination();
  const { name } = useParams<{ name: string }>();
  const { data, error, isLoading } = useGetPokemonsQuery({
    name: name || '',
    page: 0,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <span>Error loading description for {name}</span>
      </div>
    );
  }

  const abilityIds = data?.abilities?.map((a: AbilityItemType) => {
    const params = a.ability.url.split('/');
    return params[params.length - 2];
  });
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
        Abilities of {name}
      </h2>
      <ul className="space-y-2">
        {abilityIds &&
          abilityIds.map((id: string) => (
            <li key={id} className="text-sm text-gray-700">
              <AbilityItem id={Number(id)} />
            </li>
          ))}
      </ul>
    </div>
  );
};
