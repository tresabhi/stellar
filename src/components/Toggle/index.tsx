import { FC, useState } from 'react';

import './index.scss';

interface IToggle {
  defaultOn: boolean;
}
const Toggle: FC<IToggle> = ({ defaultOn }) => {
  const [state, setState] = useState(defaultOn);

  return (
    <button
      className={`
        toggle
        ${state ? 'on' : 'off'}
      `}
    >
      <div className="toggle-dot" />
    </button>
  );
};

export default Toggle;
