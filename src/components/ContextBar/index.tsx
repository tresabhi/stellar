import "./index.css";

const ContextBar = (
    {children}: {children: object}
) => {
    return (
        <div className="context-bar">
            {children}
        </div>
    )
}

export default ContextBar;