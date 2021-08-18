import "./index.css"

type ContextMenuBarButtonProp = {
    children: string
}

const ContextMenuBarButton = ({children}: ContextMenuBarButtonProp) => {
    return (
        <button className="context-menu-bar-button general-font-size">
            {children}
        </button>
    )
}

export default ContextMenuBarButton