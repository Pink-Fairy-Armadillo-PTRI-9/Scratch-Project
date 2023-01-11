import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './src/components/Navbar.jsx'
import SearchPage from './src/components/SearchPage.jsx' // characters
import LandlordPage from './src/components/LandlordPage.jsx' // customize character
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoggedIn: false,
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
              element={<SearchPage/>}
            />
            <Route
              exact
              path="/landlord"
              element={<LandlordPage/>}
            />
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;