const RadioButton = ({ status, setStatus, value, title, children }) => {
  return (
    <div className={value}>
      <label htmlFor={value}>
        {children}
        {title}
      </label>
      <input
        type="radio"
        id={value}
        value={value}
        checked={value === status}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
};

export default RadioButton;
