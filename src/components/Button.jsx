const Button = ({ value, type, onClick, id }) => {
  return (
    <button id={id} className="btn" type={type} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
