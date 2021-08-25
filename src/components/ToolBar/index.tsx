import { FC } from 'react';

import './index.css';

const Container: FC = ({ children }) => {
    return (
        <div className="tool-bar">
            {children}
        </div>
    )
}

const Button: FC = ({ children }) => {
    return (
        <button className="tool-bar-button">
            {children}
        </button>
    )
}

const Seperator = () => {
    return (
        <div className="tool-bar-seperator" />
    )
}

export default Object.assign({
    Container,
    Button,
    Seperator
});