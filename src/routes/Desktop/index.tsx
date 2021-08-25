import PageRoot from 'components/PageRoot';
import ContextBar from 'components/ContextBar';
import ToolBar from 'components/ToolBar';

import { ReactComponent as SaveIcon } from 'assets/icons/save.svg';
import { ReactComponent as UndoIcon } from 'assets/icons/undo.svg';
import { ReactComponent as RedoIcon } from 'assets/icons/redo.svg';
import { ReactComponent as ZoomInIcon } from 'assets/icons/zoom-in.svg';
import { ReactComponent as ZoomOutIcon } from 'assets/icons/zoom-out.svg';

function Desktop() {
    return (
        <PageRoot>
            <ContextBar.Container>
                <ContextBar.Button>File</ContextBar.Button>
                <ContextBar.Button>Edit</ContextBar.Button>
                <ContextBar.Button>Selection</ContextBar.Button>
                <ContextBar.Button>View</ContextBar.Button>
                <ContextBar.Button>Help</ContextBar.Button>
            </ContextBar.Container>
            <ToolBar.Container>
                <ToolBar.Button><SaveIcon /></ToolBar.Button>
                <ToolBar.Button><UndoIcon /></ToolBar.Button>
                <ToolBar.Button><RedoIcon /></ToolBar.Button>
                
                <ToolBar.Seperator />
                <ToolBar.Button><ZoomInIcon /></ToolBar.Button>
                <ToolBar.Button><ZoomOutIcon /></ToolBar.Button>
                <ToolBar.TextFeild defaultValue="100%"></ToolBar.TextFeild>
            </ToolBar.Container>
        </PageRoot>
    );
}

export default Desktop;