const Button = ({ textOnly, onClick, children }) => (
  <button className={textOnly ? "text-button" : "button"} onClick={onClick}>
    {children}
  </button>
);

export default Button;
