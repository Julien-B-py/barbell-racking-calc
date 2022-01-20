import { useEffect, useState } from "react";

function App() {
  const plates = [
    { weight: 25, color: "red", width:110 },
    { weight: 20, color: "blue", width:100, text:"white"},
    { weight: 15, color: "yellow", width:85 },
    { weight: 10, color: "black" , width:75, text:"white"},
    { weight: 5, color: "green" , width:60 },
    { weight: 2.5, color: "gray" , width:50},
    { weight: 2, color: "gray" , width:48},
    { weight: 1.5, color: "gray", width:46 },
    { weight: 1, color: "gray", width:44 },
    { weight: 0.5, color: "gray" , width:42}
  ];

  const [userInputs, setUserInputs] = useState({
    totalWeight: "",
    barWeight: 20
  });

  const [platesToUse, setPlatesToUse] = useState([]);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    if (userInputs.totalWeight - userInputs.barWeight > 0) {
      calc()
    }

  }, [userInputs]);

  function calc() {
    const weightToUse = userInputs.totalWeight - userInputs.barWeight;
    let weightPerSide = weightToUse / 2;

    let platesToUse = [];

    while (weightPerSide > 0) {
      const plate = plates.filter((plate) => plate.weight <= weightPerSide)[0];
      console.log(plate)
      platesToUse.push(plate);
      weightPerSide = weightPerSide - plate.weight;
    }

    setPlatesToUse(platesToUse);

    setCalculated(true);


  }

  function handleChange(event) {
    setCalculated(false);

    const { value, name } = event.target;

    setUserInputs((previousValue) => ({ ...userInputs, [name]: value }));
  }

  const rightPart = platesToUse.map((plate) => <div className="plate" style={{
        backgroundColor: plate.color,
        width:plate.width,
        color:plate.text
      }}>{plate.weight}</div>);
  const leftPart = platesToUse.reverse().map((plate) => <div className="plate" style={{
        backgroundColor: plate.color,
            width:plate.width,
                    color:plate.text

      }}>{plate.weight}</div>);

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
      </form>
    <div className="result">
      {calculated && leftPart}
      {calculated && <div className="bar"></div>}
      {calculated && rightPart}
          </div>
    </div>
  );
}

export default App;
