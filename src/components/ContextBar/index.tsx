import "./index.css";

const Container = (
    {children}: {children: object}
) => {
    return (
        <div className="context-bar">
            {children}
        </div>
    )
}

const Button = (
    {children}: {children: string}
) => {
    return (
        <button className="context-bar-button general-font-size">
            {children}
        </button>
    )
}

export default Object.assign({
    Container: Container,
    Button: Button
});