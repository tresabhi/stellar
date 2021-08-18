import SFSBERoot from "@components/SFSBERoot";
import ContextMenuBar from "@components/ContextMenuBar";
import ContextMenuBarButton from "@components/ContextMenuBarButton";
import EditingPanel from "@components/EditingPanel";
import EditingCanvas from "@components/EditingCanvas";

function App() {
  return (
    <SFSBERoot>
      <ContextMenuBar>
        <ContextMenuBarButton>File</ContextMenuBarButton>
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