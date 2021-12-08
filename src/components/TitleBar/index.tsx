import './index.scss';
import { FC } from 'react';

export const Container: FC = ({ children }) => (
  <div className="title-bar">{children}</div>
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
