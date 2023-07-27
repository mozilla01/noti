import { useState } from "react";
import Button from "./Button";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter complete credentials");
      return redirect("/");
    } else {
      onLogin(username, password);
      setUsername("");
      setPassword("");
    }
  };
  return (
    <form className="container-form container-form--1" onSubmit={onSubmit}>
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
