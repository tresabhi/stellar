import "./index.css"

const EditingPanel = (
    {children}: {children: object}
) => {
    return (
        <div className="editing-panel">
            {children}
        </div>
    )
}

export default EditingPanel;