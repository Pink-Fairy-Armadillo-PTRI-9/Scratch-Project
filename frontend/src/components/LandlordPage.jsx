import React, { useEffect } from 'react'

class LandlordPage extends Component {
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

    getLandlord(landlord) {
        this.setState({ fetchingDetails: landlord._id });
        fetch(`/api/characters/${landlord._id}`, {
          headers: { 'Content-Type': 'application/json' },
        })
          .then(res => res.json())
          .then(data => {
            // const updatedCharacter = { ...character };
            // const moreInfo = {};
            // moreInfo.birth_year = data.birth_year;
            // moreInfo.eye_color = data.eye_color;
            // moreInfo.gender = data.gender;
            // moreInfo.hair_color = data.hair_color;
            // moreInfo.skin_color = data.skin_color;
            // updatedCharacter.moreInfo = moreInfo;
            this.setState(
              { fetchingDetails: false },
              () => this.props.updateCharacter(character.id, updatedCharacter),
            );
          })
          .catch(err => console.log('getDetails: ERROR: ', err));
      }
    
      getLandlordReviews() {
        fetch('/api/landlord/:id/reviews')
          .then(res => res.json())
          .then(res => {
            this.props.addCharacters(res.moreCharacters);
            this.props.getMoreClicked();
          })
          .catch(err => console.log('Characters.getMoreCharacters: ERROR: ', err));
      }
    
    
      render() {
        const {
          landlord, characters, favs, nicknames, fav_foods, moreClicked
        } = this.props;
    
        if (!landlord) return null;
    
        if (!landlords.length) return (
          <div>Sorry, no characters found</div>
        );
    
        const landLordReviews = reviews.map(id => {
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
              <h2>Landlord: {landlord.name}</h2>
            </header>
            <div className="landlordContainer">
              {landlord}
            </div>
            {!moreClicked && 
            <div className="charactersPageOptions">
                <button
                  type="button"
                  className="btnSecondary btnLg"
                  onClick={this.getMoreCharacters}
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
    
    export default LandlordPage;