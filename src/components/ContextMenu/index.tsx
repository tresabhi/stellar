import "./index.css";

type ControlButtonProps = {
    text: string
}

const ControlButton = ({text}: ControlButtonProps) => {
    return (
        <button className="context-menu-button">
            {text}
        </button>
    )
}

export default ControlButton;