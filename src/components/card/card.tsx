import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { usePagination } from '../../shared/helpers';
import { addPokemon, deletePokemon } from '../../shared/state/slices/selected-slice.ts';

import type { RootState } from '../store.ts';
import type { Pokemons } from '../../shared/types/interfaces.tsx';

export const Card = ({
  name,
  description,
  mainCard,
}: {
  name: string;
  description: string;
  mainCard: boolean;
}) => {
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const [, currPaginationQuery] = usePagination();
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selected.some((el) => el.name === name)
  );

  useEffect(() => {
    (async () => {
      const pokData = await fetch(description).then((res) => res.json());
      const formUrl = pokData.forms[0].url;
      const formData = await fetch(formUrl).then((res) => res.json());
      setImgUrl(formData.sprites.front_default);
    })();
  }, [description]);

  function handleChangeSelect1() {
    if (!isSelected) {
      dispatch(addPokemon({ name, url: description } as Pokemons));
    } else {
      dispatch(deletePokemon({ name, url: description } as Pokemons));
    }
  }

  return (
    <Link
      to={`/${name}${currPaginationQuery}`}
      className={`flex items-center justify-between border dark:border-blue-300 rounded-lg ${!mainCard ? 'px-5' : 'px-20'} py-1 shadow hover:shadow-md transition hover:bg-blue-100`}
    >
      <input
        type="checkbox"
        name={name}
        checked={isSelected}
        onChange={handleChangeSelect1}
        onClick={(e) => e.stopPropagation()}
        className="scale-200"
      />
      {mainCard && (
        <span className="text-lg font-semibold text-blue-500">{name}</span>
      )}
      <img src={imgUrl} alt={name} className="w-20 h-20 object-contain" />
    </Link>
  );
};
