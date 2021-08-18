type ContextMenuBarButtonProp = {
    children: string
}

const ContextMenuBarButton = ({children}: ContextMenuBarButtonProp) => {
    return (
        <div className="context-menu-bar-button">
            {children}
        </div>
    )
}

export default ContextMenuBarButton