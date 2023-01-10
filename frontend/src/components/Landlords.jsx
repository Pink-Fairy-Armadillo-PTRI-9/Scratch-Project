//displays at the top of a specific landlords webpage with more aggregate information than LandlordMini

/*

*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CharacterCard from './CharacterCard';

class Characters extends Component {
  constructor(props) {
    super(props);

    /**
     * NOTE: we can use state in this child component because
     *       it is state that is specific to only this component
     *       and does not need to be accessible to parent and / or
     *       sibling components.
     */
    this.state = {
      fetchingDetails: false,
    };

    this.getDetails = this.getDetails.bind(this);
    this.favClicked = this.favClicked.bind(this);
    this.getMoreCharacters = this.getMoreCharacters.bind(this);
  }

  getDetails(character) {
    this.setState({ fetchingDetails: character.id });
    fetch(`/api/characters/${character.id}`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        const updatedCharacter = { ...character };
        const moreInfo = {};
        moreInfo.birth_year = data.birth_year;
        moreInfo.eye_color = data.eye_color;
        moreInfo.gender = data.gender;
        moreInfo.hair_color = data.hair_color;
        moreInfo.skin_color = data.skin_color;
        updatedCharacter.moreInfo = moreInfo;
        this.setState(
          { fetchingDetails: false },
          () => this.props.updateCharacter(character.id, updatedCharacter),
        );
      })
      .catch(err => console.log('getDetails: ERROR: ', err));
  }

  showSearchResults() {
    fetch('/api/search-results')
      .then(res => res.json())
      .then(res => {
        this.props.addCharacters(res.moreCharacters);
        this.props.getMoreClicked();
      })
      .catch(err => console.log('Characters.getMoreCharacters: ERROR: ', err));
  }

  favClicked(charId) {
    let method = 'POST';
    if (this.props.favs
      && this.props.favs[charId]) method = 'DELETE';
    fetch(`/api/favs/${charId}`, {
      method,
      body: JSON.stringify({ id: charId }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(({ favs }) => this.props.updateFavs(favs))
      .catch(err => {
        console.log(err)
        console.log('favClicked: ERROR: ', err)});
  }

  render() {
    const {
      characterIds, characters, favs, nicknames, fav_foods, moreClicked
    } = this.props;

    if (!characterIds) return null;

    if (!characterIds.length) return (
      <div>Sorry, no characters found</div>
    );

    const charElems = characterIds.map(id => {
      const char = characters[id];
      return (
        <CharacterCard
          key={id}
          info={char}
          isFav={favs && favs[id] ? favs[id] : false}
          nickname={nicknames[id]}
          fav_food={fav_foods[id]}
          getDetails={this.getDetails}
          favClicked={this.favClicked}
          fetchingDetails={this.state.fetchingDetails}
          deleteCharacter={this.props.deleteCharacter}
        />
      );
    });

    return (
      <section className="mainSection">
        <header className="pageHeader">
          <h2>Characters</h2>
        </header>
        <div className="charContainer">
          {charElems}
        </div>
        {!moreClicked && 
        <div className="charactersPageOptions">
            <button
              type="button"
              className="btnSecondary btnLg"
              onClick={this.showSearchResults}
            >
              Get More Characters
            </button>
          <Link to="/custom">
            <button
            type="button"
            className="btnSecondary btnLg"
            >
              Add Custom Character
            </button>
            </Link>
          </div>}
      </section>
    );
  }
}

export default Characters;
