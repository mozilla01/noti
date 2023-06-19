import Button from './Button';

const Signup = () => {
  return (
    <div className="container-form">
      <h1>Sign up to noti</h1>
      <hr />
      <label>Email</label>
      <input type="email" name="email" className="email" />
      <label>Username</label>
      <input type="text" name="username" className="username" />
      <label>Password</label>
      <input type="password" name="password" className="password" />
      <Button type="submit" value="Sign up" />
    </div>
  );
};

export default Signup;
