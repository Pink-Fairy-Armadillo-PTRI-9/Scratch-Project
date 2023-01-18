import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../css/Container.jsx';
import Submit from '../css/form/Submit.jsx';
import Title from '../css/form/Title.jsx';
import FormInput from '../css/form/FormInput.jsx';
import { useLocation } from 'react-router-dom';

async function loginUser(credentials, navigate, updateLoginStatus, from) {
  return fetch('api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(res => res.json())
    .then(data => {
      if (data === 'user authenicated!') {
        updateLoginStatus(true);
        const destination = from === 'signup' ? '../' : -1;
        navigate(destination);
      }
    });
}

export default function Login({updateLoginStatus}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  let from;
  if (location.state) from = location.state.from;

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(
      {
        ...userInfo,
      },
      navigate, updateLoginStatus, from
    );
  };

  return (
    <div className="inset-0  flex justify-center items-center ">
      <Container>
        {/* <div className=" bg-primary flex justify-center items-center h-screen -z-10 "> */}

        <form
          onSubmit={handleSubmit}
          className={' bg-white drop-shadow rounded p-6 space-y-6 w-80'}
        >
          <Title>Sign in</Title>
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="email@email.com"
            name="email"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Submit" />
        </form>

        <button
          type="submit"
          className="w-full bg-white rounded text-gray-600 hover:bg-opacity-90 hover:text-dark-purple transition font-semibold text-lg cursor-pointer py-2"
        >
          <Link to="/signup">
            <p>Sign up</p>
          </Link>
        </button>
      </Container>
    </div>
  );
}
