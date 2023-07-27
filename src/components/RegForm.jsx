import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Button from "./Button.jsx";
import { useState } from "react";
import { getCookie } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Loader from "./Loader.jsx";

const RegForm = () => {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState("1");
  const [loading, setLoading] = useState(false);

  const onSwitch = (e) => {
    setCurrentForm(e.target.id);
  };

  const onLogin = async function (username, password) {
    setLoading(true);
    const token_response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (token_response.ok) {
      const tokens = await token_response.json();
      localStorage.setItem("token", JSON.stringify(tokens));
      const details = jwtDecode(tokens.access);
      localStorage.setItem("User", details.username);
      localStorage.setItem("User-id", details.user_id);
      setLoading(false);
      navigate("/notepad");
    }
  };

  const onSignup = (username, email, password) => {
    setLoading(true);
    const csrf_token = getCookie("csrftoken");
    fetch("http://127.0.0.1:8000/api/create-user/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrf_token,
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCurrentForm(1);
      });
  };
  if (loading) {
    return <Loader />;
  }
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
      {currentForm === "2" ? (
        <Signup onSignup={onSignup} />
      ) : (
        <Login onLogin={onLogin} />
      )}
    </div>
  );
};

export default RegForm;
