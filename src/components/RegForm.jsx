import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Button from "./Button.jsx";

const RegForm = () => {
  return (
    <div className="reg-form">
      <Button value="Login" type="button" />
      <Button value="Sign up" type="button" />
      <Login />
      <Signup />
    </div>
  );
};

export default RegForm;
