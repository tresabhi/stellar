import { FC, InputHTMLAttributes } from 'react';
import './index.scss';

/**
 * A container that holds partition buttons.
 */
export const Container: FC = ({ children }) => (
  <div className="partition">{children}</div>
);

interface OptionProps extends InputHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}
/**
 * A button that lets uses switch between different partitions.
 */
export const Option: FC<OptionProps> = ({
  children,
  selected = false,
  ...props
}) => (
  //@ts-ignore
  <button
    className={`partition-option ${selected ? 'selected' : ''}`}
    {...props}
  >
    {children}
  </button>
);

export const Separator: FC = () => <div className="partition-separator" />;
