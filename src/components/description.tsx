import { useParams } from 'react-router';
import { LINK } from './helpers/consts';
import { useEffect, useState } from 'react';
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
    <div>
      <h2>Abilities of {index?.toUpperCase()}</h2>
      <ul>
        {abilities.map((a) => (
          <li key={a.name}>
            <strong>{a.name}</strong>: {a.description}
          </li>
        ))}
      </ul>
    </div>
  );
};
