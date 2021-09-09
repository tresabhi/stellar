import { FC, useState } from 'react';

import './index.scss';

interface IToggle {
  defaultOn: boolean;
}
const Toggle: FC<IToggle> = ({ defaultOn }) => {
  const [state, setState] = useState(defaultOn);

  return (
    <button className="toggle">
      <div
        className={`
          toggle-dot
          ${state ? 'on' : 'off'}
        `}
      />
    </button>
  );
};

export default Toggle;
