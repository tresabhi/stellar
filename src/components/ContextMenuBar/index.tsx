import "./index.css";

type ContextMenuBarProps = {
    children: object
}

const ContextMenuBar = ({children}: ContextMenuBarProps) => {
    return (
        <div className="context-menu-bar">
            {children}
        </div>
    )
}

export default ContextMenuBar;