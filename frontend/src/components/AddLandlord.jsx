//at the bottom of search results, display a new landlord form

import React, { useState } from "react";
import {Link, Routes, Route, useNavigate} from 'react-router-dom'

const AddLandlord = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const landlord = { name, location };

    const response = await fetch("api/createlandlord", {
      method: "POST",
      body: JSON.stringify(landlord), // { location: str, name: str }
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setLocation("");
      setError(null);
      console.log("new landlord added", json);
      navigate('/landlord/',json._id)
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Landlord</h3>

      <label>Landlord Name:</label>
      <input type="text" onChange={e => setName(e.target.value)} value={name} />

      <label>Landlord's City:</label>
      <input
        type="text"
        onChange={e => setLocation(e.target.value)}
        value={location}
      />

      <button>Submit Landlord</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddLandlord;
