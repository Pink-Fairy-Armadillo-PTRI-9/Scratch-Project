import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../css/Container.jsx';
import Submit from '../css/form/Submit.jsx';
import Title from '../css/form/Title.jsx';
import FormInput from '../css/form/FormInput.jsx';

async function signUp(credentials, navigate) {
  return fetch('api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data === 'user created') return navigate('/login',{state:{from:'signup'}});
      Swal.fire(
        'Sign Up Failed!',
        'email already in use',
        'error'
      )
    })
 }

export default function Login() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(
      {
        ...userInfo,
      },
      navigate
    );
  };

  return (
    <div className="inset-0 dark:bg-primary bg-white flex justify-center items-center ">
      <Container>
        {/* <div className=" bg-primary flex justify-center items-center h-screen -z-10 "> */}

        <form
          onSubmit={handleSubmit}
          className={'dark:bg-secondary bg-white drop-shadow rounded p-6 space-y-6 w-80'}
        >
          <Title>Sign up</Title>
          <FormInput
            value={username}
            onChange={handleChange}
            label="Username"
            placeholder="username"
            name="username"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="test@email.com"
            name="email"
          />
          <FormInput
            type="password"
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
          />
          <Submit value="Submit" />
        </form>
      </Container>
    </div>
  );
}
