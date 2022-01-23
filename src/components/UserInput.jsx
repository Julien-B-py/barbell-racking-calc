// Returns a customisable div composed of a label and his associated input
function UserInput(props) {
  return (
    <div className="input input-row">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        name={props.name}
        id={props.id}
        type="number"
        onChange={props.onChange}
        value={props.value}
      ></input>
    </div>
  );
}

export default UserInput;
