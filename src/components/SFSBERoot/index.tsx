import {ReactElement} from "react";

type SFSBERootProp = {
    children: ReactElement
}

const SFSBERoot = ({children}: SFSBERootProp) => {
    return (
        <div className="sfsbe-root">
            {children}
        </div>
    )
}

export default SFSBERoot;