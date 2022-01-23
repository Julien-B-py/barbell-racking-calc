// Plates array containing predifined plate objects
const plates = [
  { weight: 25, color: "#931417", width: 110, text: "white" },
  { weight: 20, color: "#0d2b68", width: 100, text: "white" },
  { weight: 15, color: "#dab532", width: 85 },
  { weight: 10, color: "#237546", width: 75, text: "white" },
  { weight: 5, color: "white", width: 60 },
  { weight: 2.5, color: "#931417", width: 50, text: "white" },
  { weight: 2, color: "#0d2b68", width: 48, text: "white" },
  { weight: 1.5, color: "#dab532", width: 46 },
  { weight: 1, color: "#237546", width: 44, text: "white" },
  { weight: 0.5, color: "white", width: 42 }
];

// Return a plate component with specific style corresponding to his weight
function Plate(props) {
  return (
    <div
      className="plate"
      style={{
        backgroundColor: props.color,
        width: props.width,
        color: props.text
      }}
    >
      <div>{props.weight}</div>
    </div>
  );
}

export default Plate;
export { plates };
