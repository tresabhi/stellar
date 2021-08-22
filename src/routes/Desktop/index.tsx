import PageRoot from "components/PageRoot";
import ContextBar from "components/ContextBar";

import "index.css";

function Desktop() {
    return (
        <PageRoot>
            <ContextBar.Container>
                <ContextBar.Button>Hello</ContextBar.Button>
            </ContextBar.Container>
        </PageRoot>
    );
}

export default Desktop;