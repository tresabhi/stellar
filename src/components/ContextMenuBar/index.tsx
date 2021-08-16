import ContextMenuBarButton from "./components/ContextMenuBarButton";

import "./index.css"

const ControlBar = () => {
    return (
        <div className="control-bar">
            <ContextMenuBarButton text="File"></ContextMenuBarButton>
        </div>
    );
}

export default ControlBar;