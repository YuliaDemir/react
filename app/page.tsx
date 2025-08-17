import { redirect } from './utils/navigation';

export default function Home() {
  redirect({
    href: '/',
    locale: 'en',
  });
}
