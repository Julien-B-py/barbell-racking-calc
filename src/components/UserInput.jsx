// Avoids unnecessary re-renders when the props don't change.
// Returns a customisable div composed of a label and his associated input
const UserInput = ({ id, label, name, onChange, value }) => {
  return (
    <div className="input input-row">
      <label htmlFor={id}>{label}</label>
      <input
        name={name}
        id={id}
        type="number"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default UserInput;