const PageRoot = (
    {children}: {children: object | string}
) => {
    return (
        <div className="page-root">
            {children}
        </div>
    )
}

export default PageRoot;