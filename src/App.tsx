import SFSBERoot from "./components/SFSBERoot";
import ContextBar from "./components/ContextBar";
import ContextBarButton from "./components/ContextBarButton";
import EditingPanel from "./components/EditingPanel";
import EditingCanvas from "./components/EditingCanvas";

import fileContextMenu from "./assets/contextMenus/file.json";

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
      <EditingPanel>
        <EditingCanvas />
      </EditingPanel>
    </SFSBERoot>
  );
}

export default App;