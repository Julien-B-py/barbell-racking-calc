import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Barbell from "./Barbell";
import Footer from "./Footer";
import Header from "./Header";
import Plate, { plates } from "./Plate";
import UserForm from "./UserForm";

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

  // Helper function to check if a value is a decimal number
  function isDecimal(value) {
    return value.toString().includes(".");
  }

  // Runs everytime userInputs or availablePlates values are changed
  useEffect(() => {

    // Prevent decimal numbers
    if (
      isDecimal(userInputs.totalWeight) ||
      isDecimal(userInputs.barWeight)
    ) {
      return setError("No decimal please.");

    }

    if (userInputs.totalWeight - userInputs.barWeight < 0) {
      return setError("Target total weight must be higher than bar weight.");
    }

    calculatePlates();

  }, [userInputs.totalWeight, userInputs.barWeight, availablePlates]);

  // Run calculation to determine which plates the user needs to load to reach target total weight
  function calculatePlates() {
    const weightToUse = userInputs.totalWeight - userInputs.barWeight;

    // Init an array to store all the plates that needs to be loaded per side on the barbell
    const platesToUse = [];

    // Create a new array containing only available plates that are checked by the user
    const availableOnly = plates.filter(plate => availablePlates[plate.weight]);

    // Init a value to store the weight that needs to be loaded per side on the barbell
    let weightPerSide = weightToUse / 2;
    // While there still is some weight to load on a side of the barbell
    for (let i = 0; weightPerSide > 0; i++) {
      let plate = null;
      for (let j = 0; j < availableOnly.length; j++) {
        if (availableOnly[j].weight <= weightPerSide) {
          plate = availableOnly[j];
          break;
        }
      }
      if (!plate) {
        return;
      }
      // Add the plate to array
      platesToUse.push(plate);
      // Update weightPerSide to determine whats left to load on the next loop iteration
      weightPerSide -= plate.weight;
    }

    // Store calculated plates array into platesToUse
    setPlatesToUse(platesToUse);
    // Set calc state to true
    setCalculated(true);
  }

  // Updates userInputs state everytime a change is made to any of the inputs
  function handleChange(event) {
    // Reset calc state to false.
    setCalculated(false);
    const { value, name } = event.target;
    setUserInputs((previousValue) => ({ ...previousValue, [name]: value }));
  }

  function createPlates(platesArray) {
    return platesArray.map((plate) => (
      <Plate
        key={`plate-${uuidv4()}`}
        color={plate.color}
        height={plate.height}
        text={plate.text}
        weight={plate.weight}
      />
    ));
  }

  // Creates the right part of the barbell
  const rightPart = createPlates(platesToUse);

  // Creates the left part of the barbell
  const reversedPlatesToUse = [...platesToUse].reverse();
  const leftPart = createPlates(reversedPlatesToUse);

  // Puts everything together to render the page
  // Displays barbell only if calc was performed correctly
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
        <Barbell
          leftPlates={leftPart}
          rightPlates={rightPart}
          calculated={calculated}
        />
      ) : (
        <div className="result"></div>
      )}

      <Footer />
    </div>
  );
}

export default App;
