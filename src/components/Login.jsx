import Button from './Button';

const Login = () => {
  return (
    <div className="container-form">
      <h1>Login to noti</h1>
      <hr />
      <label>Username</label>
      <input type="text" name="username" className="username" />
      <label>Password</label>
      <input type="password" name="password" className="password" />
      <Button type="submit" value="Login" />
    </div>
  );
};

export default Login;
