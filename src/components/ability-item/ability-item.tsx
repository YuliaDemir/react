import { Loader } from '@/components';
import { useGetDataQuery } from '@/features/slices/api-slice';
import { findAbilityDescriptionEn } from '@/utils/find-ability-description';

export const AbilityItem = ({ url }: { url: string }) => {
  const { data, isLoading, error } = useGetDataQuery(url, { skip: !url });

  if (isLoading) return <Loader />;
  if (error) return <li>Error loading ability</li>;

  return (
    <li key={url} className="text-sm text-gray-700">
      <strong className="text-sm text-gray-900">{data.name}</strong>:{' '}
      {findAbilityDescriptionEn(data.effect_entries) ?? 'No description'}
    </li>
  );
};
