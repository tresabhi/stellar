/*import PropTypes from "prop-types";
import React from "react";

import "./index.css";

interface IContainer {
	children: object,
	maxWidth: boolean
}

const Container = (
	{children, maxWidth = true}: IContainer
) => {
  return (
		<div className={`
                context-bar
                ${maxWidth && maxWidth != undefined ? "max-width" : ""}
		`}>
			{children}
		</div>
	)
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
});*/

import { FC } from 'react';

interface IContainer {
	maxWidth: boolean
}

/*const Container: FC<IContainer> = ({ children, maxWidth }) => {
	return (
		<div className={`
			context-bar
			${(maxWidth ?? true) ? "max-width" : ""}
		`}>
			{ children }
		</div>
	)
}*/

const Container = () => {
	return <div></div>;
}

export default Object.assign({
	Container
})