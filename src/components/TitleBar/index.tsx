import './index.scss';
import { FC, InputHTMLAttributes } from 'react';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div className="title-bar" {...props}>
    {children}
  </div>
);

export const TabsContainer: FC = ({ children }) => (
  <div className="tabs-container">{children}</div>
);

type TabProps = {
  selected?: boolean;
};
export const Tab: FC<TabProps> = ({ children, selected = false }) => (
  <button
    className={`
      tab
      ${selected ? 'selected' : ''}
    `}
  >
    {children}
  </button>
);
