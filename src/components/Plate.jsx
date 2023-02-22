// Plates array containing predifined plate objects
const plates = [
  { weight: 25, color: "#931417", height: 135, text: "white" },
  { weight: 20, color: "#0d2b68", height: 135, text: "white" },
  { weight: 15, color: "#dab532", height: 135 },
  { weight: 10, color: "#237546", height: 135, text: "white" },
  { weight: 5, color: "white", height: 135 },
  { weight: 2.5, color: "#931417", height: 63, text: "white" },
  { weight: 2, color: "#0d2b68", height: 57, text: "white" },
  { weight: 1.5, color: "#dab532", height: 53 },
  { weight: 1, color: "#237546", height: 48, text: "white" },
  { weight: 0.5, color: "white", height: 41 }
];

// Return a plate component with specific style corresponding to his weight
function Plate({ weight, color, height, text }) {
  return (
    <div
      className="plate"
      style={{
        backgroundColor: color,
        height: height,
        color: text
      }}
    >
      <div>{weight}</div>
    </div>
  );
}

export default Plate;
export { plates };
