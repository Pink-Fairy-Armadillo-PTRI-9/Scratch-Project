import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

async function signUp(credentials, navigate) {
  return fetch('api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(res => res.json())
    .then(data => {
      console.log('data: ', data);
      if (data === 'user created') return navigate('/login',{state:{from:'signup'}});
      Swal.fire(
        'Sign Up Failed!',
        'email already in use',
        'error'
      )
    })
 }

export default function Signup() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await signUp({
      username,
      email,
      password
    }, navigate);
  }

  return(
    <div className="signup-wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Come up with a username</p>
          <input type="text" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Enter your email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Enter password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to='/login'>
        <p>Log in</p>
      </Link>
    </div>
  )
}