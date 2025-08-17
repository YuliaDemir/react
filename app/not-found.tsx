import { useTranslations } from 'next-intl';

import { Link } from './utils/navigation';

import type { ReactElement } from 'react';

export default function NotFound(): ReactElement {
  const t = useTranslations('notFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-blue-800 p-6">
      <h1 className="text-8xl font-semibold mb-4">404</h1>
      <p className="text-xl mb-6">{t('title')}</p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition"
      >
        {t('backButton')}
      </Link>
    </div>
  );
}
