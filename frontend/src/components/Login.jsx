import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

async function loginUser(credentials, navigate, updateLoginStatus, from) {
  return fetch('api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(res => res.json())
    .then(data => {
      if (data === 'user authenicated!') {
        updateLoginStatus(true);
        const destination = from === 'signup' ? '../' : -1;
        navigate(destination);
      }
    })
 }

export default function Login({updateLoginStatus}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  let from;
  if (location.state) from = location.state.from;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser({
      email,
      password
    }, navigate, updateLoginStatus, from);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to='/signup'>
        <p>Sign up</p>
      </Link>
    </div>
  )
}