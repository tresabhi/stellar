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
export const Button: FC = ({ children }) => (
  <button className="button">{children}</button>
);

// export const Separator: FC = ({ children }) => (
//   <button className="separator">{children}</button>
// );
