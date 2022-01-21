import { useEffect, useState } from "react";
import Plate, {plates} from "./Plate";
import UserForm from "./UserForm";

function App() {

  const [userInputs, setUserInputs] = useState({
    totalWeight: "",
    barWeight: 20
  });

  const [platesToUse, setPlatesToUse] = useState([]);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    if (userInputs.totalWeight - userInputs.barWeight > 0) {
      calc();
    }
  }, [userInputs]);

  function calc() {
    const weightToUse = userInputs.totalWeight - userInputs.barWeight;
    let weightPerSide = weightToUse / 2;

    let platesToUse = [];

    while (weightPerSide > 0) {
      const plate = plates.filter((plate) => plate.weight <= weightPerSide)[0];

      if (!plate) {
        return;
      }

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

  const rightPart = platesToUse.map((plate) => (
    <Plate
      color={plate.color}
      width={plate.width}
      text={plate.text}
      weight={plate.weight}
    />
  ));
  const leftPart = platesToUse
    .reverse()
    .map((plate) => (
      <Plate
        color={plate.color}
        width={plate.width}
        text={plate.text}
        weight={plate.weight}
      />
    ));

  return (
    <div className="content">
      <h1>Barbell racking calc</h1>

      <UserForm
        onChange={(e) => handleChange(e)}
        totalWeight={userInputs.totalWeight}
        barWeight={userInputs.barWeight}
      />

      <div className="result">
        {calculated && leftPart}
        {calculated && <div className="bar"></div>}
        {calculated && rightPart}
      </div>
      <footer>©2022, Julien BEAUJOIN</footer>
    </div>
  );
}

export default App;
