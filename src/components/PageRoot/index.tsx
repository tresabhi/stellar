import { FC } from 'react';

const PageRoot: FC = ({ children }) => {
    return (
        <div className="page-root">
            {children}
        </div>
    )
}

export default PageRoot;