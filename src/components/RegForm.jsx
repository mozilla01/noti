import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Button from './Button.jsx';
import { useState } from 'react';
import { getCookie } from '../App.jsx';
const RegForm = () => {
  const [currentForm, setCurrentForm] = useState('1');

  const onSwitch = (e) => {
    setCurrentForm(e.target.id);
  };

  const onSignup = (username, email, password) => {
    // This function can perhaps be put inside the Signup component.
    const csrf_token = getCookie('csrftoken');
    fetch('https://noti-zo7n.onrender.com/api/create-user/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrf_token,
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentForm(1);
      });
  };
  return (
    <div className="reg-form">
      <Button
        id="1"
        value="Login"
        type="button"
        onClick={(e) => {
          onSwitch(e);
        }}
      />
      <Button
        id="2"
        value="Sign up"
        type="button"
        onClick={(e) => {
          onSwitch(e);
        }}
      />
      {currentForm === '2' ? <Signup onSignup={onSignup} /> : <Login />}
    </div>
  );
};

export default RegForm;
