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
      landlords: [],
      searchBar: '', 
      searchResults: [], // { name: 'Boston Real Estate Management', averageRating: 4.3, city / primaryLocation: 'Boston, MA' }
    };
  }
  

  componentDidMount() {
    fetch('/api/getall')
    .then(res => res.json())
    .then(json => this.setState({landlords: json}))
    // .then(json => console.log('json: ', json)) 
    // .then(console.log('landlords in state', this.state.landlords))
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
        <AddLandlord/>
      </section>
    );
  }
}

export default SearchPage;
