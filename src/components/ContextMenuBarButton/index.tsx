import "./index.css"

type ContextMenuBarButtonProp = {
    children: string,
    contextMenu?: object
}

const ContextMenuBarButton = ({children, contextMenu}: ContextMenuBarButtonProp) => {
    const onClick = () => {
        
    }

    return (
        <button
            className="context-menu-bar-button general-font-size"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default ContextMenuBarButton