import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx'
import Search from './components/Search.jsx' //characters
import Landlord from './components/Landlord.jsx' 
// import LandlordPage from './components/CustomizeCharacter'; //customize character
// import AddLandlord from './components/AddLandlord';
import './styles.css';
// https://www.npmjs.com/package/react-search-autocomplete

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        fetchedLandlords: false,
        landlords: [], // @ pierce, @ mason: { name: 'Boston Real Estate Management', averageRating: 4.3, city / primaryLocation: 'Boston, MA' }
        isLoggedIn: false,
        searchBarData: [],
    };
    // this.updateFavs = this.updateFavs.bind(this);
    // this.addLandlords = this.addLandlords.bind(this);
    // this.updateCharacter = this.updateCharacter.bind(this);
    // this.customizeCharacter = this.customizeCharacter.bind(this);
    // this.formatLandlords = this.formatLandlords.bind(this);
    // this.deleteCharacter = this.deleteCharacter.bind(this);
    // this.getMoreClicked = this.getMoreClicked.bind(this);
  }

  componentDidMount() {
    fetch('/api/', {
      method: 'POST',
      body: JSON.stringify('Pierce'),
      headers: { 'Content-Type': 'application/json' },
    }) //route to get required data for home: landlords information—ratings, name, city
      .then(res => res.json()) // should send an object called landlords
      .then(({ landLord }) => {
        // const { landlordIds, landlordNames } = this.formatLandlords(landlords);
        console.log('landLord: ', landLord);
        return this.setState({
            fetchedLandlords: true,
            landlordData: landlords,
        });
      })
      .catch(err => console.log('App.componentDidMount: get landlords: ERROR: ', err));
  }


  updateCharacter(id, character) {
    const charactersById = JSON.parse(JSON.stringify(this.state.charactersById));
    charactersById[id] = character;
    this.setState({ charactersById });
    return true;
  }

  deleteCharacter(id) {
    console.log('~~~~~~~~~~~FRONT END~~~~~~~~~~~');
    console.log('deleteCharacter(id) fetch request path: ', `/api/characters/${id - 1}`);
    fetch(`/api/characters/${id - 1}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(() => {
        const characters = [];
        for (const [charId, char] of Object.entries(this.state.charactersById)) {
          if (parseInt(charId) !== id) characters.push(char);
        }
        const { characterIds, charactersById, nicknames, fav_foods } = this.formatLandlords(characters, {
          characterIds: [],
          charactersById: {},
          nicknames: {},
          fav_foods: {}
        });
        this.setState({ characterIds, charactersById, nicknames, fav_foods });
      })
    .catch(err => console.log('App: delete character: ERROR: ', err));
    return true;
  }


  customizeCharacter(id, character) {
    const charactersById = JSON.parse(JSON.stringify(this.state.charactersById));
    if (character.custom) {
      const { eye_color, hair_color, skin_color, birth_year } = character;
      character.moreInfo = { eye_color, hair_color, skin_color, birth_year };
    }
    charactersById[id] = character;
    charactersById[id].id = id;
    const nicknames = JSON.parse(JSON.stringify(this.state.nicknames));
    nicknames[id] = character.nickname;
    const fav_foods = JSON.parse(JSON.stringify(this.state.fav_foods));
    fav_foods[id] = character.fav_food;
    this.setState({ charactersById, nicknames, fav_foods });
  }

  getMoreClicked() {
    this.setState({ moreClicked: true });
  }

  render() {
    if (!this.state.fetchedChars) return (
      <div>
        <h1>Loading data, please wait...</h1>
      </div>
    );
    const sharedPageProps = {
      landlords: this.state.landlords,
      nicknames: this.state.nicknames,
      fav_foods: this.state.fav_foods,
      characters: this.state.charactersById,
      characterIds: this.state.characterIds,
      moreClicked: this.state.moreClicked,
    };
    return (
      <div className="router">
        <main>
        <Navbar/>
          <Routes>
            <Route
              exact
              path="/"
              element={<Search/>}
            />
            <Route
              exact
              path="/landlord"
              element={<Landlord/>}
            />
            <Route
              exact
              path="/landlord/:id"
              component={
                () => <LandlordPage
                  {...sharedPageProps}/>
              }
            />
          </Routes>

        <div className="home">
        <div className="landlords">
        {landlords && landlords.map((landlord)=> (
            <Landlords key = {landlord._id} landlord={landlord}/>
        ))}
        </div>
        <NewTask/>
        </div>


        </main>
      </div>
    );
  }
}

export default App;


        // <div className = "App">
        // <BrowserRouter>
        // <Navbar/>
        // <div className = "pages">
        //     <Routes>
        //         {/* <Route
        //             path="/"
        //             element={<Home />}
        //         />
        //         <Route
        //             path="/landlord"
        //             // element={<Landlord/>}
        //         /> */}
        //     </Routes>
        // </div>
        // </BrowserRouter>
        // </div>
