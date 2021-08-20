import "./index.css";

const ContextBar = (
    {children}: {children: object}
) => {
    return (
        <div className="context-menu-bar">
            {children}
        </div>
    )
}

export default ContextBar;