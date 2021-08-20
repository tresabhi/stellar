import "./index.css";

const ContextMenu = (
    {children}: {children: object}
) => {
    return (
        <div className="context-menu">
            {children}
        </div>
    )
}

export default ContextMenu;