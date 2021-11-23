import { FC, useState } from 'react';

import './index.scss';

type ToggleProps = {
  defaultState: boolean;
};
const Toggle: FC<ToggleProps> = ({ defaultState }) => {
  const [state, setState] = useState(defaultState);

  const handleClick = () => setState((state) => !state);

  return (
    <button
      className={`
        toggle
        ${state ? 'on' : 'off'}
      `}
      onClick={handleClick}
    >
      <div className="dot" />
    </button>
  );
};

export default Toggle;
