'use client';
import { Card } from '@components';
import { twMerge } from 'tailwind-merge';

import type { Pokemons } from '@/types';
import { useTranslations } from 'next-intl';

export const CardList = (props: { pokemons: Pokemons[] }) => {
  const { pokemons } = props;
  const t = useTranslations('cardList');

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <header
        className={twMerge(
          'flex justify-between',
          'px-15 mb-4',
          'border-b pb-2 dark:border-blue-300'
        )}
      >
        <h3 className="font-semibold text-lg dark:text-blue-600">
          {t('name')}
        </h3>
        <h3 className="font-semibold text-lg dark:text-blue-600">
          {t('image')}
        </h3>
      </header>
      <main className="grid grid-cols-1 gap-4 max-h-96 overflow-auto">
        {pokemons.map((card) => {
          const urlParts = card.url.split('/');
          const id = urlParts[urlParts.length - 2];

          return (
            <div key={id}>
              <Card name={card.name} url={card.url} mainCard />
            </div>
          );
        })}
      </main>
    </div>
  );
};
