import { FC } from 'react';

import './index.scss';

type IPseudoContainer = {
  fullscreen?: boolean;
  flex?: boolean;
};
const PseudoContainer: FC<IPseudoContainer> = ({
  children,
  fullscreen = false,
  flex = false,
}) => (
  <div
    className={`
      pseudo-container
      ${fullscreen ? 'fullscreen' : ''}
      ${flex ? 'flex' : ''}
    `}
  >
    {children}
  </div>
);

export default PseudoContainer;
