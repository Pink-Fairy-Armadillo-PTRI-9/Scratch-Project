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
        searchResults: [], // { name: 'Boston Real Estate Management', averageRating: 4.3, city / primaryLocation: 'Boston, MA' }
        isLoggedIn: false,
        searchBarData: []
    };
  }

  render() {
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
          </Routes>
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
