const Button = ({ value, type, onClick }) => {
  return (
    <button className="btn" type={type} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
