import type { Pokemons } from '../types/interfaces.tsx';

export function downloadSelectedItems(data: Pokemons[]) {
  if (!data || data.length === 0) return;

  const headers = ['Name', 'URL'];

  const rows = data.map((pokemon: Pokemons) => [pokemon.name, pokemon.url]);

  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${value}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;characterset=utf-8' });
  const fileName = `${data.length}_items.csv`;
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
