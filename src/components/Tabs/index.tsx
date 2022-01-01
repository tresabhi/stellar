import { FC, InputHTMLAttributes } from 'react';
import './index.scss';

/**
 * Holds tabs.
 */
export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div {...props} className={`tabs-container ${className}`}>
    {children}
  </div>
);

/**
 * A tab that usually gains functioanlity using the `onClick` prop.
 */
interface TabProps extends InputHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}
export const Tab: FC<TabProps> = ({ children, selected = false, ...props }) => (
  //@ts-ignore
  <button className={`tab ${selected ? 'selected' : ''}`} {...props}>
    {children}
  </button>
);
