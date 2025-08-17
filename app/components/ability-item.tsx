'use client';
import { Loader } from '@components';
import { useTranslations } from 'next-intl';

import { useGetPokemonAbilityQuery } from '@/features/slices/api-slice';
import { findAbilityDescriptionEn } from '@/utils/find-ability-description';

export const AbilityItem = ({ id }: { id: number }) => {
  const { data, isFetching, error } = useGetPokemonAbilityQuery(
    { id },
    { skip: !id }
  );

  const t = useTranslations('error');
  if (isFetching) return <Loader />;
  if (error) return <>{t('aby')}</>;

  return (
    <>
      <strong className="text-sm text-gray-900">{data.name}</strong>:{' '}
      {findAbilityDescriptionEn(data.effect_entries) ?? t('noDesc')}
    </>
  );
};
