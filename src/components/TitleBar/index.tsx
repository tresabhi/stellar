import './index.scss';
import { FC } from 'react';

export const Container: FC = ({ children }) => (
  <div className="title-bar">{children}</div>
);

export const ControlMenuContainer: FC = ({ children }) => (
  <div className="context-bar">{children}</div>
);

export const ControlMenuButton: FC = ({ children }) => (
  <button className="button">{children}</button>
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
