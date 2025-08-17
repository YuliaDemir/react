import type { Locale } from '@/constants';
import { Providers } from '@/features/providers';

import type { ReactNode } from 'react';

export default async function RootLayout({
  children,
  params,
  pokemon,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
  pokemon: ReactNode;
}) {
  const messages = (await import(`@/locales/${(await params).locale}.json`))
    .default;

  return (
    <html lang={(await params).locale || 'en'}>
      <body>
        <Providers locale={(await params).locale} messages={messages}>
          {children}
          {pokemon}
        </Providers>
      </body>
    </html>
  );
}
