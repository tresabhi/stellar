import { FC } from 'react';
import './index.scss';

/**
 * A container that holds context menu buttons
 */
export const Container: FC = ({ children }) => (
  <div className="context-menu">{children}</div>
);

/**
 * A button that holds text that describes action of the context menu listing
 */
type ButtonProps = {
  disabled?: boolean;
};
export const Button: FC<ButtonProps> = ({ children, disabled = false }) => (
  <button
    className={`
      button
      ${disabled ? 'disabled' : 'enabled'}
    `}
  >
    {children}
  </button>
);

export const Separator = () => (
  <div className="separator">
    <div className="line" />
  </div>
);
