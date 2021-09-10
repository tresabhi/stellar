import { FC, useState } from 'react';

import './index.scss';

interface IToggle {
  defaultOn: boolean;
}
const Toggle: FC<IToggle> = ({ defaultOn }) => {
  const [state, setState] = useState(defaultOn);
  let trueState = defaultOn;

  const handleClick = () => {
    trueState = !trueState;
    setState(trueState);
  };

  return (
    <button
      className={`
        toggle
        ${state ? 'on' : 'off'}
      `}
      onClick={handleClick}
    >
      <div className="toggle-dot" />
    </button>
  );
};

export default Toggle;
