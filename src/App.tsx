import SFSBERoot from "./components/SFSBERoot";
import ContextMenuBar from "./components/ContextMenuBar";
import ContextMenuBarButton from "./components/ContextMenuBarButton";
import EditingPanel from "./components/EditingPanel";
import EditingCanvas from "./components/EditingCanvas";

import fileContextMenu from "./assets/contextMenus/file.json";

function App() {
  return (
    <SFSBERoot>
      <ContextMenuBar>
        <ContextMenuBarButton contextMenu={fileContextMenu}>File</ContextMenuBarButton>
        <ContextMenuBarButton>Edit</ContextMenuBarButton>
        <ContextMenuBarButton>Selection</ContextMenuBarButton>
        <ContextMenuBarButton>View</ContextMenuBarButton>
        <ContextMenuBarButton>Help</ContextMenuBarButton>
      </ContextMenuBar>
      <EditingPanel>
        <EditingCanvas />
      </EditingPanel>
    </SFSBERoot>
  );
}

export default App;