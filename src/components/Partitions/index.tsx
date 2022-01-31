import { FC, InputHTMLAttributes } from 'react';
import './index.scss';

export const Container: FC = ({ children }) => (
  <div className="partition">{children}</div>
);

interface OptionProps extends InputHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}
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
