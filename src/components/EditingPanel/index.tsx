import { FC } from 'react';

import './index.scss';

const EditingPanel: FC = ({ children }) => {
  return <div className="editing-panel">{children}</div>;
};

export default EditingPanel;
