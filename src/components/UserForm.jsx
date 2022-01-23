import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function UserForm(props) {

  // Targeting elements
  const formRef = useRef();
  // Targeting descendant elements
  const q = gsap.utils.selector(formRef);
  // Store the timeline in a ref
  const tl = useRef();

  // Animate userform on first render
  useLayoutEffect(() => {
    tl.current = gsap
      .timeline({ defaults: { ease: "Bounce.easeOut" }})
      .from(formRef.current, { autoAlpha: 0, y: "50px", ease: "Expo.easeOut" })
      .from(q("h2"), { y: "-50px", autoAlpha: 0 })
      // Target ALL descendants with the class of .input-row
      .from(q(".input-row"), { x: "-50px", autoAlpha: 0, stagger: 0.25 })
      .from(q(".plates-options"), { autoAlpha: 0, y: "50px" })
      .from(q(".error"), { autoAlpha: 0, ease: "Power0.easeNone" });
  }, []);

  // Returns an HTML form
  // Displays error message if calculation couldn't be performed
  // Displays 2 controlled inputs whose values are stored in App state.
  // Displays a certain amount of controlled checkboxes based on platesOptions array.
  return (
    <form ref={formRef}>
      <h2>Determine how you need to load your barbell</h2>
      {!props.calculated && (
        <div className="error">
          <p>{props.error}</p>
        </div>
      )}
      <div className="input input-row">
        <label htmlFor="total-weight">Target total weight (kg)</label>
        <input
          name="totalWeight"
          id="total-weight"
          type="number"
          onChange={props.onChange}
          value={props.totalWeight}
        ></input>
      </div>
      <div className="input input-row">
        <label htmlFor="bar-weight">Bar weight (kg)</label>
        <input
          name="barWeight"
          id="bar-weight"
          type="number"
          onChange={props.onChange}
          value={props.barWeight}
        ></input>
      </div>
      <label className="input input-row">Available plates (kg)</label>
      <div className="plates-options">
        {props.platesOptions.map((number) => (
          <div key={uuidv4()} className="plate-option">
            <input
              type="checkbox"
              onChange={props.onEditPlates}
              id={"plate-" + number}
              name={number}
              checked={props.availablePlates[number]}
            ></input>
            <label htmlFor={"plate-" + number}>{number}</label>
          </div>
        ))}
      </div>
    </form>
  );
}

export default UserForm;
