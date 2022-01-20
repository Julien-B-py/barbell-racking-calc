import { useEffect, useState } from "react";

function App() {
  const plates = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5];

  const [userInputs, setUserInputs] = useState({
    totalWeight: "",
    barWeight: 20
  });
  const [disableButton, setDisableButton] = useState(false);
  const [platesToUse, setPlatesToUse] = useState([]);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    userInputs.totalWeight - userInputs.barWeight > 0
      ? setDisableButton(false)
      : setDisableButton(true);
  }, [userInputs]);

  function calc(e) {
    const weightToUse = userInputs.totalWeight - userInputs.barWeight;
    let weightPerSide = weightToUse / 2;

    let platesToUse = [];

    while (weightPerSide > 0) {
      const plate = plates.filter((plate) => plate <= weightPerSide)[0];
      platesToUse.push(plate);
      weightPerSide = weightPerSide - plate;
    }

    setPlatesToUse(platesToUse);

    setCalculated(true);

    e.preventDefault();
  }

  function handleChange(event) {
    setCalculated(false);

    const { value, name } = event.target;

    setUserInputs((previousValue) => ({ ...userInputs, [name]: value }));
  }

  const rightPart = platesToUse.map((plate) => <div>{plate}</div>);
  const leftPart = platesToUse.reverse().map((plate) => <div>{plate}</div>);

  return (
    <div>
      <form>
        <label htmlFor="total-weight">Total Weight</label>
        <input
          name="totalWeight"
          id="total-weight"
          type="number"
          onChange={handleChange}
          value={userInputs.totalWeight}
        ></input>
        <label htmlFor="bar-weight">Bar Weight</label>
        <input
          name="barWeight"
          id="bar-weight"
          type="number"
          onChange={handleChange}
          value={userInputs.barWeight}
        ></input>
        {!disableButton && <button onClick={calc}>Calc</button>}
      </form>

      {calculated && leftPart}
      {calculated && <div>bar</div>}
      {calculated && rightPart}
    </div>
  );
}

export default App;
