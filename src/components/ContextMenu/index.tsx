import { FC } from 'react';

import './index.css';

const ContextMenu: FC = ({ children }) => {
    return (
        <div className="context-menu">
            {children}
        </div>
    )
}

export default ContextMenu;