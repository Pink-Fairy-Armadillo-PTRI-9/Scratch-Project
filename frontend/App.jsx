import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './src/components/Navbar.jsx';
import SearchPage from './src/components/SearchPage.jsx'; // characters
import LandlordPage from './src/components/LandlordPage.jsx'; // customize character
import Login from './src/components/Login.jsx';
import Signup from './src/components/Signup.jsx';

// import './styles.css';

// ReactModal.setAppElement('#root');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      modalIsOpen: false,
    };
  }

  // toggleModal() {
  //   this.setState({modalIsOpen: !this.state.modalIsOpen});
  // }

  render() {
    return (
      <div className="router">
        <main>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<SearchPage />} />
            <Route exact path="/landlord" element={<LandlordPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>

          {/* // <div>
          //   <button onClick={this.toggleModal}>Open Modal</button>
          // <ReactModal 
          //     isOpen={this.modalIsOpen}
          //     show={true}
          //     fade={false} 
          //     onRequestClose={this.toggleModal}
          //     contentLabel="Example Modal"
          //     className="modal"
          //     overlayClassName="overlay"
          //   >
          //     <h2>Hello</h2>
          //     <button onClick={this.toggleModal}>close</button>
          //   </ReactModal>
          // </div> */}
        </main>
      </div>
    );
  }
}

export default App;
