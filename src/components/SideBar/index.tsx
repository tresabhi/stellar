import Scroller from 'components/ScrollableContainer';
import { FC, InputHTMLAttributes } from 'react';
import './index.scss';

/**
 * Holds various components that usually appear on the sides.
 */
export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div {...props} className={`${props.className || ''} side-bar`}>
    {children}
  </div>
);

/**
 * Holds components that usually needed to be scrolled through.
 */
export const Scrollable: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <Scroller className="side-bar-scrollable-scroller" {...props}>
    {children}
  </Scroller>
);
