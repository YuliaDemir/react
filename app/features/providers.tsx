'use client';

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { Provider } from 'react-redux';

import { store } from '@/features/slices/store';
import { ThemeProvider } from '@/features/theme-context/theme-context';

import type { ReactNode } from 'react';

export function Providers({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {locale}
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </Provider>
  );
}
