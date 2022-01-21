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

  const platesOptions = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5];

  function initAvailablePlates() {
    const platesObject = {};
    platesOptions.forEach((element) => (platesObject[element] = true));
    return platesObject;
  }

  const [availablePlates, setAvailablePlates] = useState(initAvailablePlates());

  function editAvailablePlates(e) {
        const choice = e.target.name;
        setAvailablePlates((previousValue) => {
          return { ...previousValue, [choice]: !previousValue[choice] };
        });
  }

  useEffect(() => {
    if (userInputs.totalWeight - userInputs.barWeight > 0) {
      calc();
    }
  }, [userInputs]);

  function calc() {
    console.log("CALC")
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

    console.log(platesToUse);

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
        onEditPlates={editAvailablePlates}
        platesOptions={platesOptions}
        availablePlates={availablePlates}
      />

      <div className="result">
        {calculated && <div className="plates">{leftPart}</div>}
        {calculated && <div className="bar"></div>}
        {calculated && <div className="plates">{rightPart}</div>}
      </div>
      <footer>©2022, Julien BEAUJOIN</footer>
    </div>
  );
}

export default App;
