import "./index.css"

type EditingPanelProps = {
    children: object
}

const EditingPanel = ({children}: EditingPanelProps) => {
    return (
        <div className="editing-panel">
            {children}
        </div>
    )
}

export default EditingPanel;