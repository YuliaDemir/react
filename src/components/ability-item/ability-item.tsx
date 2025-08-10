import { Loader } from '@/components';
import { useGetPokemonAbilityQuery } from '@/features/slices/api-slice';
import { findAbilityDescriptionEn } from '@/utils/find-ability-description';

export const AbilityItem = ({ id }: { id: number }) => {
  const { data, isFetching, error } = useGetPokemonAbilityQuery(
    { id },
    { skip: !id }
  );

  if (isFetching) return <Loader />;
  if (error) return <>Error loading ability</>;

  return (
    <>
      <strong className="text-sm text-gray-900">{data.name}</strong>:{' '}
      {findAbilityDescriptionEn(data.effect_entries) ?? 'No description'}
    </>
  );
};
