import { FC } from 'react';

import './index.css';

const EditingPanel: FC = ({ children }) => {
    return (
        <div className="editing-panel">
            {children}
        </div>
    )
}

export default EditingPanel;