import React from "react";

import "./index.css";

interface ControlButton {
    text: string
}

const ControlButton: React.FC<ControlButton> = ({text}) => {
    return (
        <div className="control-button">
            {text}
        </div>
    )
}

export default ControlButton;