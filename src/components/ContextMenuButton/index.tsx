import { FC } from 'react';

import './index.css';

const ContextMenuButton: FC = ({ children }) => {
    return (
        <button className="context-menu-button">
            {children}
        </button>
    )
}

export default ContextMenuButton;