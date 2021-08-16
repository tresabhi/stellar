import ContextMenuBarButton from "./components/ContextMenuBarButton";

import "./index.css"

type ContextMenuBarProps = {
    buttons?: object
}

const ContextMenuBar = ({buttons}: ContextMenuBarProps) => {
    return (
        <div className="context-menu-bar">
            <ContextMenuBarButton text="Asd" />
        </div>
    );
}

export default ContextMenuBar;