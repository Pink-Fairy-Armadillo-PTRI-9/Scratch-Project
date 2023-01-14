import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './src/components/Navbar.jsx';
import SearchPage from './src/components/SearchPage.jsx'; // characters
import LandlordPage from './src/components/LandlordPage.jsx'; // customize character
import Login from './src/components/Login.jsx';
import Logout from './src/components/Logout.jsx'
import Signup from './src/components/Signup.jsx';
import AddLandlord from './src/components/AddLandlord.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoggedIn: false,
    };
  }
  
  updateLoginStatus = (isLoggedIn) => {
    this.setState({isLoggedIn})};

  render() {
    return (
      <div className="router">
        <main>
           <Navbar isLoggedIn={this.state.isLoggedIn}/> 
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
            <Route
              exact
              path="/login"
              element={<Login updateLoginStatus={this.updateLoginStatus}/>}
            />
            <Route
              exact
              path="/logout"
              element={<Logout updateLoginStatus={this.updateLoginStatus}/>}
            />
            <Route
              exact
              path="/signup"
              element={<Signup/>}
            />
            <Route exact path="/addlandlord" element={<AddLandlord />} />
          </Routes>
       </main>
      </div>
    );
  }
}

export default App;
