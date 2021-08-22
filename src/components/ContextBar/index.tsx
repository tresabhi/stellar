import PropTypes from "prop-types";
import React from "react";

import "./index.css";

class Container extends React.Component {
    render () {
        return (
            <div className={`
                context-bar
                ${maxWidth && maxWidth != undefined ? "max-width" : ""}
            `}>
                {children}
            </div>
        )
    }
}

Container.propTypes = {
    children: PropTypes.object,
    maxWidth: PropTypes.bool
}

const Button = (
    {children}: {children: string}
) => {
    return (
        <button className="context-bar-button">
            {children}
        </button>
    )
}

export default Object.assign({
    Container: Container,
    Button: Button
});