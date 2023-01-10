// import React from "react";
// import { BrowserRouter, Routes, Route} from 'react-router-dom';
// //pages and components
// import Home from './src/pages/Home'
import Navbar from './src/components/Navbar'
// import Login from './src/components/Login'
// import LandLord from './src/pages/Landlord'


import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landlords from './components/Landlords'; //characters
import LandlordPage from './components/CustomizeCharacter'; //customize character
import AddLandlord from './components/AddLandlord';
import './stylesheets/styles.css';
// https://www.npmjs.com/package/react-search-autocomplete

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        landlordData: [], // { name: 'Boston Real Estate Management', averageRating: 4.3, city / primaryLocation: 'Boston, MA' }
        isLoggedIn: false,
        searchBarData: []
        


    //   characterIds: [],
    //   fetchedChars: false,
    //   charactersById: {},
    //   favs: {},
    //   nicknames: {},
    //   fav_foods: {},
    //   moreClicked: false,
    };

    // this.updateFavs = this.updateFavs.bind(this);
    this.addLandlords = this.addLandlords.bind(this);
    // this.updateCharacter = this.updateCharacter.bind(this);
    // this.customizeCharacter = this.customizeCharacter.bind(this);
    this.formatLandlords = this.formatLandlords.bind(this);
    // this.deleteCharacter = this.deleteCharacter.bind(this);
    // this.getMoreClicked = this.getMoreClicked.bind(this);
  }

  componentDidMount() {
    fetch('/api/')
      .then(res => res.json())
      .then(({ landlords }) => {
        // const { landlordIds, landlordNames } = this.formatLandlords(landlords);
        return this.setState({
            searchBarData: landlords
        });
      })
      .catch(err => console.log('App.componentDidMount: get landlords: ERROR: ', err));
  }

  formatLandlords(characters, state = this.state) {
    // console.log('characters: ', characters);
    const charactersById = JSON.parse(JSON.stringify(state.charactersById));
    const fav_foods = JSON.parse(JSON.stringify(state.fav_foods));
    const nicknames = JSON.parse(JSON.stringify(state.nicknames));
    const characterIds = [...state.characterIds];
    let newCharId = state.characterIds.length;

    characters.forEach((char, index) => {
      if (newCharId) char.id = ++newCharId;
      else char.id = index+1;
      if (!charactersById[char.id]) {
        if (char.custom || newCharId) {
          const { eye_color, hair_color, skin_color, birth_year } = char;
          char.moreInfo = {eye_color, hair_color, skin_color, birth_year};
        }
        if (char.nickname && char.fav_food) {
          fav_foods[char.id] = char.fav_food;
          nicknames[char.id] = char.nickname;
        }
        characterIds.push(char.id);
        charactersById[char.id] = char;
      }
    });
    return { characterIds, charactersById, nicknames, fav_foods };
  }

  addLandlords(characters) {
    const { characterIds, charactersById } = this.formatLandlords(characters);
    this.setState({ characterIds, charactersById, fetchedChars: true });
    return true;
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

  updateFavs(favs) {
    return this.setState({ favs });
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
      favs: this.state.favs,
      nicknames: this.state.nicknames,
      fav_foods: this.state.fav_foods,
      characters: this.state.charactersById,
      characterIds: this.state.characterIds,
      moreClicked: this.state.moreClicked,
    };
    return (
      <div className="router">
        <main>
          {/*
              NOTE: The syntax below is for React-Router
                - A helpful library for routing with a React app.
                You can learn more about this at:
                https://reacttraining.com/react-router/web/guides/quick-start
          */}
          <Navbar/>
          <Switch>
          <Route
              exact
              path="/"
              component={
                () => <SearchBar searchBarData={this.searchBarData} />
              }
            />
            <Route
              exact
              path="/"
              component={
                () => <Landlords
                  {...sharedPageProps}
                  updateFavs={this.updateFavs}
                  addLandlords={this.addLandlords}
                  updateCharacter={this.updateCharacter}
                  deleteCharacter={this.deleteCharacter}
                  getMoreClicked={this.getMoreClicked}
                />
              }
            />
            <Route
              exact
              path="/custom"
              component={
                () => <AddLandlord
                  {...sharedPageProps}
                  addCharacter={this.addLandlords}
                />
              }
            />
            <Route
              exact
              path="/customize/:id"
              component={
                () => <CustomizeCharacter
                  {...sharedPageProps}
                  customizeCharacter={this.customizeCharacter}
                />
              }
            />
          </Switch>
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
