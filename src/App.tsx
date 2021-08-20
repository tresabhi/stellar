import SFSBERoot from "./components/SFSBERoot";
import ContextBar from "./components/ContextBar";
import ContextBarButton from "./components/ContextBarButton";
import ContextMenu from "components/ContextMenu";
import ContextMenuButton from "components/ContextMenuButton";
import EditingPanel from "./components/EditingPanel";
import EditingCanvas from "./components/EditingCanvas";

import fileContextMenu from "./assets/contextMenus/file.json";
import ContextMenuSeperator from "components/ContextMenuSeperator";

function App() {
  return (
    <SFSBERoot>
      <ContextBar>
        <ContextBarButton contextMenu={fileContextMenu}>File</ContextBarButton>
        <ContextBarButton>Edit</ContextBarButton>
        <ContextBarButton>Selection</ContextBarButton>
        <ContextBarButton>View</ContextBarButton>
        <ContextBarButton>Help</ContextBarButton>
      </ContextBar>
      <ContextMenu>
        <ContextMenuButton>Context 1</ContextMenuButton>
        <ContextMenuButton>Context 2</ContextMenuButton>
        <ContextMenuButton>Context 3</ContextMenuButton>
        <ContextMenuButton>Context 4</ContextMenuButton>
        <ContextMenuButton>Context 5</ContextMenuButton>
      </ContextMenu>
    </SFSBERoot>
  );
}

export default App;