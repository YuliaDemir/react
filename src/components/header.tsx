import { Link } from 'react-router';
import { Search } from './search';

export const Header = (props: {
  handleSearch: (query: string) => Promise<void>;
}) => {
  return (
    <>
      <Search onSearch={props.handleSearch} />
      <Link to="/about">About</Link>
    </>
  );
};
