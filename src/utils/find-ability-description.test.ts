import { findAbilityDescriptionEn } from './find-ability-description';

describe('findAbilityDescriptionEn', () => {
  test('returns effect string when English entry exists', () => {
    const entries = [
      { language: { name: 'jp' }, effect: 'Japanese effect' },
      { language: { name: 'en' }, effect: 'English effect' },
      { language: { name: 'fr' }, effect: 'French effect' },
    ];

    expect(findAbilityDescriptionEn(entries)).toBe('English effect');
  });

  test('returns null if no English entry', () => {
    const entries = [
      { language: { name: 'jp' }, effect: 'Japanese effect' },
      { language: { name: 'fr' }, effect: 'French effect' },
    ];

    expect(findAbilityDescriptionEn(entries)).toBeNull();
  });

  test('returns null for empty array', () => {
    expect(findAbilityDescriptionEn([])).toBeNull();
  });
});
