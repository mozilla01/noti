import { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = async function (e) {
    e.preventDefault();
    const token_response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (token_response.ok) {
      const tokens = await token_response.json();
      localStorage.setItem('token', JSON.stringify(tokens));
      const details = jwtDecode(tokens.access);
      localStorage.setItem('User', details.username);
      localStorage.setItem('User-id', details.user_id);
      setUsername('');
      setPassword('');
      navigate('/notepad');
    }
  };
  return (
    <form className="container-form container-form--1" onSubmit={onLogin}>
      <h1>Login to Noti</h1>
      <hr />
      <label>Username</label>
      <input
        type="text"
        name="username"
        className="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        className="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button type="submit" value="Login" />
    </form>
  );
};

export default Login;
