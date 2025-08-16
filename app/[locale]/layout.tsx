import { locales, type Locale } from '@/constants';
import { Providers } from '@/features/providers';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pokemons',
  description: 'Description of pokemons',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const messages = (await import(`@/locales/${(await params).locale}.json`))
    .default;

  return (
    <html lang={(await params).locale}>
      <body>
        <Providers locale={(await params).locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
