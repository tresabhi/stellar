import Scroller from 'components/Scroller';
import { FC, InputHTMLAttributes } from 'react';
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
export const Scrollable: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <Scroller className="side-bar-scrollable-scroller" {...props}>
    {children}
  </Scroller>
);
