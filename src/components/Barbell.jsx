import { gsap } from "gsap";
import { useEffect, useRef } from "react";

function animateBarbell(barRef) {
  const q = gsap.utils.selector(barRef);
  gsap.timeline()
    .from(q(".bar"), { autoAlpha: 0, scale: 0 })
    .from(q(".right .plate"), { xPercent: 200, stagger: 0.1 })
    .from(q(".left .plate"), { xPercent: -200, stagger: -0.1 }, "<");
}

function Barbell({ leftPlates, rightPlates, calculated }) {
  const barRef = useRef();

  useEffect(() => {
    animateBarbell(barRef.current);
  }, [calculated]);

  return (
    <div className="result" ref={barRef}>
      <div className="plates left">{leftPlates}</div>
      <div className="bar"></div>
      <div className="plates right">{rightPlates}</div>
    </div>
  );
}

export default Barbell;
