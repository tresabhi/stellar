import PageRoot from "components/PageRoot";
import ContextBar from "components/ContextBar";

function Desktop() {
    return (
        <PageRoot>
            <ContextBar.Container>
                <ContextBar.Button maxWidth={true}>File</ContextBar.Button>
                <ContextBar.Button>Edit</ContextBar.Button>
                <ContextBar.Button>Selection</ContextBar.Button>
                <ContextBar.Button>View</ContextBar.Button>
                <ContextBar.Button>Help</ContextBar.Button>
            </ContextBar.Container>
        </PageRoot>
    );
}

export default Desktop;