import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../css/Container.jsx';
import Submit from '../css/form/Submit.jsx';
import Title from '../css/form/Title.jsx';
import FormInput from '../css/form/FormInput.jsx';
async function loginUser(credentials, navigate) {
  // console.log('credentials', credentials);
  return fetch('api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('login data: ', data);
      if (data === 'user authenicated!') {
        navigate(-1); // go back to the previous page
      }
    });
}

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

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
      navigate
    );
  };

  return (
    <Container>
      <div className=" bg-primary flex justify-center items-center h-screen -z-10 ">
        <form onSubmit={handleSubmit} className={'space-y-6 w-72'}>
          <Title>Sign in</Title>
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="test@email.com"
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
          <Submit value="Sign in" />
        </form>
      </div>
    </Container>
  );
}
