import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
import useSettings from 'stores/settings';
import Tabs from './components/Tabs';

export default function RightSidebar() {
  const visible = useSettings(
    (state) => state.interface.tabs.staging.rightSidebar,
  );
  const handleCollapseClick = () => {
    mutateSettings((draft) => {
      const { staging } = draft.interface.tabs;
      staging.rightSidebar = !staging.rightSidebar;
    });
  };

  return (
    <Sidebar.Root visible={visible} position="right">
      <Tabs />

      <Sidebar.Collapse
        position="right"
        expanded={visible}
        onClick={handleCollapseClick}
      />
    </Sidebar.Root>
  );
}
