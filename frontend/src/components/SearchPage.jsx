//if no prior search result, center search bar
//if there are present search results, move to top of main component
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LandlordCard from './LandlordCard.jsx';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchSuggestions: [], 
      searchResults: [], // { name: 'Boston Real Estate Management', averageRating: 4.3, city / primaryLocation: 'Boston, MA' }
    };
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  getSearchResults() {
    // fetch('/api/search')
    //   .then(res => res.json())
    //   .then(res => {
    //     .....setState.....
    //   })
    //   .catch(err => console.log('Characters.getMoreCharacters: ERROR: ', err));

    // mock database call:
    const foundLandlords = [{
      id: 12345,
      name: 'Best Realty',
      rating: 4.5
    }, {
      id: 67890,
      name: 'ABC Property Management',
      rating: 3.8
    }];
    this.setState({searchResults: foundLandlords});
  }

  render() {
    const landlords = this.state.searchResults;

    // if (!landlords.length) return (
    //   <div>Sorry, no landlords found</div>
    // );

    const landlordCards = landlords.map(landlord => {
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
          <h2>Search Landlords</h2>
        </header>

        <h3>***our future search bar***</h3>

        <div>
          {landlordCards}
        </div>

        <button
          type="button"
          onClick={this.getSearchResults}
        >
          Search!
        </button>    

        <button
          type="button"
          // onClick={this.addLandlord}
        >
          Add landlord
        </button>
      </section>
    );
  }
}

export default SearchPage;
