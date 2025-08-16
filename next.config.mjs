/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./next-intl.config.js');

const nextConfig = {
  distDir: './dist',
};

export default withNextIntl(nextConfig);
