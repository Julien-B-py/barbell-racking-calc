import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Plate, { plates } from "./Plate";
import UserForm from "./UserForm";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  // State used to display error messages to the user
  const [error, setError] = useState();

  // Generates a random weight for demonstration
  const randomWeight = (Math.floor(Math.random() * (120 - 40)) + 40).toString();

  // State used to store and control user inputs
  const [userInputs, setUserInputs] = useState({
    totalWeight: randomWeight,
    barWeight: "20"
  });

  // State used to store the result of the calculation
  const [platesToUse, setPlatesToUse] = useState([]);
  // State used to determine if the calculation for the current user request has been done
  const [calculated, setCalculated] = useState(false);
  // Array containing all possible weight values
  const platesOptions = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5];

  // Returns an object containing all values of platesOptions array as single objects with a default value of true
  function initAvailablePlates() {
    const platesObject = {};
    platesOptions.forEach((element) => (platesObject[element] = true));
    return platesObject;
  }

  // State used to store user preference regarding available plates by weight
  const [availablePlates, setAvailablePlates] = useState(initAvailablePlates());

  // Edit availablePlates state by switching each value to true or false depending on corresponding checkbox state
  function editAvailablePlates(e) {
    const choice = e.target.name;
    setAvailablePlates((previousValue) => {
      return { ...previousValue, [choice]: !previousValue[choice] };
    });
  }

  // Targeting elements
  const barRef = useRef();
  // Targeting descendant elements
  const q = gsap.utils.selector(barRef);
  // Store the timeline in a ref
  const tl = useRef();

  // Animates bar and weights everytime calc function is performed
  useLayoutEffect(() => {
    tl.current = gsap
      .timeline()
      .from(q(".bar"), { autoAlpha: 0, scale: 0 })
      .from(q(".right .plate"), { y: "50px", stagger: 0.1 })
      .from(q(".left .plate"), { y: "-50px", stagger: -0.1 }, "<");
  }, [calculated]);

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

  // Creates the right part of the barbell
  const rightPart = platesToUse.map((plate) => (
    <Plate
      key={uuidv4()}
      color={plate.color}
      width={plate.width}
      text={plate.text}
      weight={plate.weight}
    />
  ));

  // Creates the left part of the barbell
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
      <Header />

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
        <div className="result" ref={barRef}>
          <div className="plates left">{leftPart}</div>
          <div className="bar"></div>
          <div className="plates right">{rightPart}</div>
        </div>
      ) : (
        <div className="result"></div>
      )}

      <Footer />
    </div>
  );
}

export default App;
