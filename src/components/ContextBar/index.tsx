import { FC } from "react";

import "./index.css";

interface IContainer {
	maxWidth?: boolean
}

const Container: FC<IContainer> = ({ children, maxWidth = true }) => {
  return (
		<div className={`
                context-bar
                ${maxWidth ? "max-width" : ""}
		`}>
		  {children}
		</div>
	)
}

const Button: FC = ({ children }) => {
    return (
        <button className="context-bar-button">
            {children}
        </button>
    )
}

export default Object.assign({
    Container,
    Button
});