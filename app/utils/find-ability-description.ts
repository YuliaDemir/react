import type { EffectDescription } from '@/types';

export function findAbilityDescriptionEn(
  effectEntries: EffectDescription[]
): string | null {
  const entry = effectEntries.find((e) => e.language.name === 'en');
  return entry ? entry.effect : null;
}
