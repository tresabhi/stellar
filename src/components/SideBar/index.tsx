import { FC } from 'react';
import './index.scss';

/**
 * Holds everything within the side bar with responsive CSS
 */
export const Container: FC = ({ children }) => (
  <div className="side-bar">{children}</div>
);

/**
 * Holds list of components that can be scroll
 */
export const Scrollable: FC = ({ children }) => (
  <div className="side-bar-scrollable">{children}</div>
);
