import ContextMenuBar from "@components/ContextMenuBar";
import ContextMenuBarButton from "@components/ContextMenuBarButton";

function App() {
  return (
    <ContextMenuBar>
      <ContextMenuBarButton>File</ContextMenuBarButton>
      <ContextMenuBarButton>Edit</ContextMenuBarButton>
      <ContextMenuBarButton>Selection</ContextMenuBarButton>
      <ContextMenuBarButton>View</ContextMenuBarButton>
      <ContextMenuBarButton>Help</ContextMenuBarButton>
    </ContextMenuBar>
  );
}

export default App;