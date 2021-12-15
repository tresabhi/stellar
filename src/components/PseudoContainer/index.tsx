import { FC } from 'react';

import './index.scss';

interface PseudoContainerProps {
  fullscreen?: boolean;
  flex?: boolean;
  occupyTitleBar?: boolean;
}
const PseudoContainer: FC<PseudoContainerProps> = ({
  children,
  fullscreen = false,
  flex = false,
  occupyTitleBar = false,
}) => (
  <div
    className={`pseudo-container ${fullscreen ? 'fullscreen' : ''} ${
      flex ? 'flex' : ''
    } ${occupyTitleBar ? 'occupyTitleBar' : ''}
    `}
  >
    {children}
  </div>
);

export default PseudoContainer;
