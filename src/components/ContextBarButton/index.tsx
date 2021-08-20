import "./index.css"

const ContextBarButton = (
    {children}: {children: string}
) => {

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

export default ContextBarButton;