import {ReactElement} from "react";
import "./index.css";

type ContextMenuBarProps = {
    children: ReactElement
}

const ContextMenuBar = ({children}: ContextMenuBarProps) => {
    return (
        <div className="context-menu-bar">
            {children}
        </div>
    )
}

export default ContextMenuBar;