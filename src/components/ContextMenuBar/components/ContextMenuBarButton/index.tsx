type ContextMenuBarButtonProp = {
    text: string
}

const ContextMenuBarButton = ({text}: ContextMenuBarButtonProp) => {
    return (
        <button className="context-menu-button">
            {text}
        </button>
    )
}

export default ContextMenuBarButton;