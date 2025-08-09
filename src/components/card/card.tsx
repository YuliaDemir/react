import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import type { RootState } from '@/app/store';
import { Loader } from '@/components/loader/loader';
import { useGetDataQuery } from '@/features/slices/api-slice';
import { addPokemon, deletePokemon } from '@/features/slices/selected-slice';
import { usePagination } from '@/hooks';
import type { CardType, Pokemons } from '@/types';

export const Card = ({ name, url, mainCard }: CardType) => {
  const [, currPaginationQuery] = usePagination();
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selected.some((el) => el.name === name)
  );
  const { data, error, isLoading } = useGetDataQuery(url);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <span>Error loading card for {name}</span>
      </div>
    );
  }
  function handleChangeSelect() {
    if (!isSelected) {
      dispatch(addPokemon({ name, url } as Pokemons));
    } else {
      dispatch(deletePokemon({ name, url } as Pokemons));
    }
  }

  return (
    <Link
      to={`/${name}${currPaginationQuery}`}
      className={twMerge(
        'flex items-center justify-between',
        'border dark:border-blue-300 rounded-lg',
        `${!mainCard ? 'px-5' : 'px-20'} py-1 shadow`,
        'hover:shadow-md transition hover:bg-blue-100'
      )}
    >
      <input
        type="checkbox"
        name={name}
        checked={isSelected}
        onChange={handleChangeSelect}
        onClick={(e) => e.stopPropagation()}
        className="scale-200"
      />
      {mainCard && (
        <span className="text-lg font-semibold text-blue-500">{name}</span>
      )}
      <img
        src={data?.sprites?.front_default}
        alt={name}
        className="w-20 h-20 object-contain"
      />
    </Link>
  );
};
