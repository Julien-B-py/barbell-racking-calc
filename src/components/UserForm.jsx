import { gsap } from 'gsap';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import UserInput from './UserInput';

function UserForm({
  calculated,
  error,
  totalWeight,
  barWeight,
  platesOptions,
  availablePlates,
  onChange,
  onEditPlates,
}) {
  useEffect(() => {
    const form = document.querySelector('.user-form');
    const inputs = document.querySelectorAll('.input-row');
    const platesOptions = document.querySelector('.plates-options');
    const errors = document.querySelectorAll('.error');

    const timeline = gsap.timeline({ defaults: { ease: 'Bounce.easeOut' } });
    timeline
      .from(form, { autoAlpha: 0, y: '50px', ease: 'Expo.easeOut' })
      .from(inputs, { x: '-50px', autoAlpha: 0, stagger: 0.25 })
      .from(platesOptions, { autoAlpha: 0, y: '50px' })
      .from(errors, { autoAlpha: 0, ease: 'Power0.easeNone' });

    return () => timeline.kill();
  }, []);

  return (
    <form className="user-form">
      <h2>Determine how you need to load your barbell</h2>
      {!calculated && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      <UserInput
        label="Target total weight (kg)"
        name="totalWeight"
        id="total-weight"
        onChange={onChange}
        value={totalWeight}
      />
      <UserInput
        label="Bar weight (kg)"
        name="barWeight"
        id="bar-weight"
        onChange={onChange}
        value={barWeight}
      />
      <label className="input-row">Available plates (kg)</label>
      <div className="plates-options">
        {platesOptions.map((plate) => (
          <div key={uuidv4()} className="plate-option">
            <input
              type="checkbox"
              onChange={onEditPlates}
              id={`plate-${plate}`}
              name={plate}
              checked={availablePlates[plate]}
            />
            <label htmlFor={`plate-${plate}`}>{plate}</label>
          </div>
        ))}
      </div>
    </form>
  );
}

export default UserForm;