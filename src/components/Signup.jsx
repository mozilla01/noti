import { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import Response from './Response';

const Signup = ({ onSignup, response }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert('Please enter complete credentials');
      return redirect('/');
    } else {
      onSignup(username, email, password);
      setEmail('');
      setUsername('');
      setPassword('');
    }
  };
  return (
    <form className="container-form container-form--2" onSubmit={onSubmit}>
      <h1>Sign up</h1>
      <hr />
      <label>Email</label>
      <input
        type="email"
        name="email"
        className="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
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
      <Response message={response} />
      <br />
      <Button type="submit" value="Sign up" />
    </form>
  );
};

export default Signup;
