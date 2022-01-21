function UserForm(props) {
  return (
    <form>
      <h2>Determine how you need to load your barbell</h2>
      <label htmlFor="total-weight">Total Weight (kg)</label>
      <input
        name="totalWeight"
        id="total-weight"
        type="number"
        onChange={props.onChange}
        value={props.totalWeight}
      ></input>
      <label htmlFor="bar-weight">Bar Weight (kg)</label>
      <input
        name="barWeight"
        id="bar-weight"
        type="number"
        onChange={props.onChange}
        value={props.barWeight}
      ></input>
    </form>
  );
}

export default UserForm;
