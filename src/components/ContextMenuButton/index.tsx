const ContextMenuButton = (
    {children}: {children: string}
    ) => {
    return (
        <button className="context-menu-button">
            {children}
        </button>
    )
}

export default ContextMenuButton;