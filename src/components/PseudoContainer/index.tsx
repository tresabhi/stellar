import { FC } from 'react';

import './index.scss';

type PseudoContainerProps = {
  fullscreen?: boolean;
  flex?: boolean;
};
const PseudoContainer: FC<PseudoContainerProps> = ({
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
