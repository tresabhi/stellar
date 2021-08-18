type ContextMenuBarProps = {
    children?: any
}

const ContextMenuBar = ({children}: ContextMenuBarProps) => {
    return (
        <div className="context-menu-bar">
            {children}
        </div>
    )
}

export default ContextMenuBar