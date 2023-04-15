import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
import useSettings from 'stores/settings';
import Stages from './components/Stages';
import Tabs from './components/Tabs';

export default function LeftSidebar() {
  const visible = useSettings(
    (state) => state.interface.tabs.staging.leftSidebar.visible,
  );
  const handleCollapseClick = () => {
    mutateSettings((draft) => {
      const { leftSidebar } = draft.interface.tabs.staging;
      leftSidebar.visible = !leftSidebar.visible;
    });
  };

  return (
    <Sidebar.Root visible={visible} position="left">
      <Tabs />

      <Stages />

      <Sidebar.Collapse
        position="left"
        expanded={visible}
        onClick={handleCollapseClick}
      />
    </Sidebar.Root>
  );
}
