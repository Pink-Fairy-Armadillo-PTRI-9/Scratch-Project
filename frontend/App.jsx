import React, { Component, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import Search from './components/Search.jsx' //characters
import Landlord from './components/Landlord.jsx' 
// import LandlordPage from './components/CustomizeCharacter'; //customize character
// import AddLandlord from './components/AddLandlord';
import './styles.css';
// https://www.npmjs.com/package/react-search-autocomplete

export default function App() {

  const [addFormData,setAddFormData] = useState({
    email: "",
    password: ""
  });

  
  const handleFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };

    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const newContact = {
  //     email: addFormData.email,
  //     password: addFormData.password,
  //   };

  //   const newContacts = [...contacts, newContact];
  // };

  return (
    <div>
      <form action="submit" >
        <input type="text" value={addFormData.email} name="email" onChange={handleFormChange} placeholder="email"/>
        <input type="text" value={addFormData.password} name="password"onChange={handleFormChange} placeholder="password"/>
        <button>submit</button>
      </form>
    </div>
  )
}
