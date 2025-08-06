import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import { LINK } from '../constants';
import { usePagination } from '../hooks';
import { Loader } from './loader';

interface AbilityItem {
  ability: {
    url: string;
  };
}

function findAbilityDescriptionEn(
  effectEntries: {
    effect: string;
    language: { name: string };
  }[]
): string | null {
  const entry = effectEntries.find((e) => e.language.name === 'en');
  return entry ? entry.effect : null;
}

export const Description = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [, currPaginationQuery] = usePagination();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        navigate('/' + currPaginationQuery);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  const { index } = useParams();
  const [abilities, setAbilities] = useState<
    { name: string; description: string }[] | null
  >(null);

  useEffect(() => {
    const getDescription = async () => {
      const data = await fetch(`${LINK}${index}`).then((res) => res.json());

      const abilityUrls = data.abilities.map((i: AbilityItem) => i.ability.url);

      const abilities: {
        name: string;
        description: string;
      }[] = await Promise.all(
        abilityUrls.map(async (url: string) => {
          const ability = await fetch(url).then((res) => res.json());
          return {
            name: ability.name,
            description: findAbilityDescriptionEn(ability.effect_entries),
          };
        })
      );
      setAbilities(abilities);
    };
    getDescription();
  }, [index]);

  if (!abilities) {
    return <Loader />;
  }
  return (
    <div
      ref={ref}
      className="relative bg-white dark:bg-blue-200 shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto mt-4"
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
        {abilities.map((a) => (
          <li key={a.name} className="text-sm text-gray-700">
            <strong className="text-sm text-gray-900">{a.name}</strong>:{' '}
            {a.description}
          </li>
        ))}
      </ul>
    </div>
  );
};
