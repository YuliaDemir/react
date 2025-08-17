import './index.css';

import { locales } from '@/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokemons',
  description: 'Description of pokemons',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default function StylesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
