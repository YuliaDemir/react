import { Component } from 'react';

interface SearchState {
  value: string;
}

interface SearchProps {
  value: string;
  onSearch(query: string): void;
}

class Search extends Component<SearchProps, SearchState> {
  state = {
    value: localStorage.getItem('query') || '',
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value.trim() })}
        ></input>
        <button onClick={() => this.props.onSearch(this.state.value)}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
