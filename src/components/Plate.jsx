const plates = [
  { weight: 25, color: "red", width: 110 },
  { weight: 20, color: "blue", width: 100, text: "white" },
  { weight: 15, color: "yellow", width: 85 },
  { weight: 10, color: "black", width: 75, text: "white" },
  { weight: 5, color: "green", width: 60 },
  { weight: 2.5, color: "gray", width: 50 },
  { weight: 2, color: "gray", width: 48 },
  { weight: 1.5, color: "gray", width: 46 },
  { weight: 1, color: "gray", width: 44 },
  { weight: 0.5, color: "gray", width: 42 }
];

function Plate(props) {
  return     <div
        className="plate"
        style={{
          backgroundColor: props.color,
          width: props.width,
          color: props.text
        }}
      >
        <div>{props.weight}</div>
      </div>
}

export default Plate;
export {plates};
