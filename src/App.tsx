import { Component } from 'react'
import './App.css'
import Search from './components/search'
import CardList from './components/card-list'
import type { Pokemons } from './components/types/interfaces';
import Loader from './components/loader'

class App extends Component<{}, { data: Pokemons[], error: Error | null, isLoading: boolean }>{

  state = {
    data: [],
    error: null,
    isLoading: false,
  };

  async componentDidMount(): Promise<void> {
    const requestedData = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1400").then(res => res.json());
    this.setState({ data: requestedData.results });
  }

  handleSearch = async (query: string) => {
    try {
      this.setState({ isLoading: true })
      const requestedData = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`).then(res => {
        if (!res.ok) {
          throw new Error('Not found!');
        }
        return res.json();
      });
      
      this.setState({ data: [{name: query, url: `https://pokeapi.co/api/v2/pokemon/${query}`}], isLoading: false});
    }
    catch (err) {
      this.setState({ error: err as Error, isLoading: false})
    }
  }


  render() { 
    if (this.state.error) {
      throw this.state.error
    }
    return (
      <>
        <Search value="" onSearch={this.handleSearch}/>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <CardList data={this.state.data}/>
        )}
        <button onClick={() => this.setState({ error: new Error('Test error')})}>Throw error</button>
      </>
    )
  }
}
export default App
