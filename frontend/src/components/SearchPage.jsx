//if no prior search result, center search bar
//if there are present search results, move to top of main component
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LandlordCard from './LandlordCard.jsx';
import AddLandlord from './AddLandlord.jsx';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      landlords: [{name: 'The Grinch', location: 'Whoville', rating: '5.0', rentAgain: '94%'}, {name: 'Jimmy Buffet', location: 'Margaritaville', rating: '4.2', rentAgain: '82%'}, {name: 'Rupert Holmes', location:'O\'Malley\'s Bar', rating: 'N/A', rentAgain: 'N/A'}, {name: 'Herman Melville', location: 'Nantucket', rating: '4.7', rentAgain: '85'}, {name: 'Elon Must', location: 'Edison', rating: '1.7', rentAgain: '27%'}],
      searchBar: '', 
      searchResults: [], // { name: 'Boston Real Estate Management', averageRating: 4.3, city / primaryLocation: 'Boston, MA' }
    };
  }
  

  componentDidMount() {
    fetch('http://localhost:3000/api/')
    .then(res => res.json())
    .then(json => this.setState({landlords: json}))
    .then(console.log('landlords in state', this.state.landlords))
  }


  render() {
    const landlordsToRender = this.state.landlords.filter(landlord => landlord.name.toLowerCase().includes(this.state.searchBar) || landlord.location.toLowerCase().includes(this.state.searchBar))
    console.log('render',landlordsToRender)
    console.log('search', this.state.searchBar);

    /* NEED TO HANDLE IF THERE ARE NO LANDLORDS WITH THAT NAME OR CITY AND ALSO EMPTY SEARCH BAR*/
    const landlordCards = landlordsToRender.map(landlord => {
      return (
        <LandlordCard
          key={landlord.id}
          landlord={landlord}
        />
        
      );
    });

    return (
      <section>
        <header>
          <h3>Search Landlords</h3>
        </header>

        <h3>
        <input
        type="text"
        onChange={e=> this.setState({searchBar: e.target.value})}
        value={this.state.searchBar}
        />
        </h3>

        <div>
          {landlordCards}
        </div>

        <button
          type="button"
          onClick={this.getSearchResults}
        >
          Search!
        </button> 
        <AddLandlord/>
      </section>
    );
  }
}

export default SearchPage;
