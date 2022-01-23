import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";


// Returns the corresponding barbell calculated from user inputs
function Barbell(props) {
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
  }, [props.calculated]);

  return (
    <div className="result" ref={barRef}>
      <div className="plates left">{props.leftPart}</div>
      <div className="bar"></div>
      <div className="plates right">{props.rightPart}</div>
    </div>
  );
}

export default Barbell;
