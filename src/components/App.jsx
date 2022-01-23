import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Plate, { plates } from "./Plate";
import UserForm from "./UserForm";

function App() {
  const [error, setError] = useState();
  const [formInit, setFormInit] = useState(false);

  // Generates a random weight for demonstration
  const randomWeight = (Math.floor(Math.random() * (120 - 40) ) + 40).toString();

  const [userInputs, setUserInputs] = useState({
    totalWeight: randomWeight,
    barWeight: "20"
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

  // Runs everytime userInputs or availablePlates values are changed
  useEffect(() => {
    if (
      userInputs.totalWeight.includes(".") ||
      userInputs.barWeight.includes(".")
    ) {
      setError("No decimal please.");
    } else if (userInputs.totalWeight - userInputs.barWeight >= 0) {
      calc();
    } else {
      setError("Target total weight must be higher than bar weight.");
    }
  }, [userInputs, availablePlates]);

  function calc() {
    const weightToUse = userInputs.totalWeight - userInputs.barWeight;
    let weightPerSide = weightToUse / 2;

    let platesToUse = [];

    // Use only plates that are checked
    const availableOnly = plates.filter((plate) => {
      if (availablePlates[plate.weight] === true) {
        return plate.weight;
      }
    });

    while (weightPerSide > 0) {
      const plate = availableOnly.filter(
        (plate) => plate.weight <= weightPerSide
      )[0];

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
      key={uuidv4()}
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
        key={uuidv4()}
        color={plate.color}
        width={plate.width}
        text={plate.text}
        weight={plate.weight}
      />
    ));

  return (
    <div className="content">
      <header>
        <i className="fas fa-dumbbell"></i> Barbell racking calc
      </header>

      <UserForm
        onChange={(e) => handleChange(e)}
        totalWeight={userInputs.totalWeight}
        barWeight={userInputs.barWeight}
        onEditPlates={editAvailablePlates}
        platesOptions={platesOptions}
        availablePlates={availablePlates}
        calculated={calculated}
        error={error}
      />

      {calculated ? (
        <div className="result">
          <div className="plates left">{leftPart}</div>
          <div className="bar"></div>
          <div className="plates right">{rightPart}</div>
        </div>
      ) : (
        <div className="result"></div>
      )}

      <footer>©2022, Julien BEAUJOIN</footer>
    </div>
  );
}

export default App;
