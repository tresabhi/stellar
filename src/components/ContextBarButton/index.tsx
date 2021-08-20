import "./index.css"

const ContextBarButton = (
    {children}: {children: string, contextMenu?: object}
) => {

    const onClick = () => {
        
    }

    return (
        <button
            className="context-bar-button general-font-size"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default ContextBarButton;