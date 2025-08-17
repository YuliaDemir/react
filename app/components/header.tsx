'use client';

import { Search } from '@/components';
import { ThemeToggle } from '@/components';
import { Link } from '@/utils/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './lang';

export const Header = (props: { handleSearch: (query: string) => void }) => {
  const t = useTranslations('about');
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="w-32" />
      <ThemeToggle />
      <LanguageSwitcher />
      <Search onSearch={props.handleSearch} />
      <Link
        href="/about"
        className="text-blue-500 hover:underline font-medium w-32 text-right"
      >
        {t('about')}
      </Link>
    </div>
  );
};
