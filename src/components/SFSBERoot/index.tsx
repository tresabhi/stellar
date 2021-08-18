type SFSBERootProp = {
    children: object
}

const SFSBERoot = ({children}: SFSBERootProp) => {
    return (
        <div className="sfsbe-root">
            {children}
        </div>
    )
}

export default SFSBERoot;