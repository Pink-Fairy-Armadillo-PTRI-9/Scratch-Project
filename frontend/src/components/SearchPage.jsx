//if no prior search result, center search bar
//if there are present search results, move to top of main component
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LandlordCard from './LandlordCard.jsx';
import AddLandlord from './AddLandlord.jsx';
import Container from '../css/Container.jsx';

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
      .then((res) => res.json())
      .then((json) => this.setState({ landlords: json }));
    // .then(json => console.log('json: ', json))
    // .then(console.log('landlords in state', this.state.landlords))
  }

  render() {
    const landlordsToRender = this.state.landlords.filter(
      (landlord) =>
        landlord.name.toLowerCase().includes(this.state.searchBar) ||
        landlord.location.toLowerCase().includes(this.state.searchBar)
    );
    console.log('render', landlordsToRender);
    console.log('search', this.state.searchBar);

    /* NEED TO HANDLE IF THERE ARE NO LANDLORDS WITH THAT NAME OR CITY AND ALSO EMPTY SEARCH BAR*/
    const landlordCards = landlordsToRender.map((landlord) => {
      return <LandlordCard key={landlord.id} landlord={landlord} />;
    });

    return (
      <section>
        <Container>
          <div className="flex items-center justify-center relative p-10 space-x-10  ">
            <div className="text-gray-800">Search</div>

            <input
              type="text"
              onChange={(e) => this.setState({ searchBar: e.target.value })}
              value={this.state.searchBar}
              className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle focus:border-dark-purple w-full text-lg outline-none p-1 dark:text-white peer transition"
            />
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 p-5">
            {landlordCards}
          </div>
          {/* <AddLandlord /> */}
          <div className="flex flex-col items-center ">
            <Link to="/addlandlord" className="text-gray-800 text-lg   ">
              <button
                type="button"
                className="w-full rounded bg-secondary p-3 px-6 text-gray-600 hover:text-dark-purple"
              >
                Add New Landlord
              </button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }
}

export default SearchPage;
