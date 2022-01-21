import { useState } from "react";

function UserForm(props) {
  return (
    <form>
      <h2>Determine how you need to load your barbell</h2>
      <label htmlFor="total-weight">Target total Weight (kg)</label>
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
      <label>Available plates (kg)</label>
      <div className="plates-options">
        {props.platesOptions.map((number) => (
          <div className="plate-option">
            <input
              type="checkbox"
              onClick={props.onEditPlates}
              id={"plate-" + number}
              name={number}
              checked={props.availablePlates[number]}
            ></input>
            <label htmlFor={"plate-" + number}>{number}</label>
          </div>
        ))}
      </div>
    </form>
  );
}

export default UserForm;
