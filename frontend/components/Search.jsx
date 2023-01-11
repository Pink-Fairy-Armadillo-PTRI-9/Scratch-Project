import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LandlordCard from './LandlordCard.jsx';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
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

    const landlord1 = {
      id: 12345,
      name: 'Best Realty',
      rating: 4.5
    }
    const landlord2 = {
      id: 67890,
      name: 'ABC Property Management',
      rating: 3.8
    }
    const foundLandlords = [landlord1, landlord2];
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
          name={landlord.name}
          rating={landlord.rating}
        />
      );
    });

    return (
      <section className="mainSection">
        <header className="pageHeader">
          <h2>Search Landlords</h2>
        </header>
        <h3>***our future search bar***</h3>
        <div className="charContainer">
          {landlordCards}
        </div>
        <button
          type="button"
          className="btnSecondary btnLg"
          onClick={this.getSearchResults}
        >
          Search!
        </button>
      </section>
    );
  }
}

export default Search;
