import { Link } from 'react-router';

import { Search } from '../';
import { ThemeToggle } from '../';

export const Header = (props: {
  handleSearch: (query: string) => Promise<void>;
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="w-32" />
      <ThemeToggle />
      <Search onSearch={props.handleSearch} />
      <Link
        to="/about"
        className="text-blue-500 hover:underline font-medium w-32 text-right"
      >
        About
      </Link>
    </div>
  );
};
