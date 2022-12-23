import * as Sidebar from 'components/Sidebar';
import { mutateSettings } from 'core/app';
import { useInterfaceMode } from 'hooks/useInterfaceMode';
import useSettings, { InterfaceMode, SidebarTab } from 'stores/settings';
import { TabLayoutProps } from '../..';
import { Snippets } from '../LeftSidebar/components/Snippets';
import { Inspect } from './components/Inspect';
import Properties from './components/Properties';
import Tabs from './components/Tabs';

export default function RightSidebar({ swapSecondTab }: TabLayoutProps) {
  const rightSidebar = useSettings(
    (draft) => draft.interface.tabs.layout.rightSidebar,
  );
  const interfaceMode = useInterfaceMode();
  const handleCollapseClick = () => {
    mutateSettings((draft) => {
      if (interfaceMode === InterfaceMode.Compact) {
        const { visible } = draft.interface.tabs.layout.rightSidebar;
        visible.inCompactMode = !visible.inCompactMode;
      } else {
        const { visible } = draft.interface.tabs.layout.rightSidebar;
        visible.inComfortableMode = !visible.inComfortableMode;
      }
    });
  };
  const expanded = interfaceMode === InterfaceMode.Compact
    ? rightSidebar.visible.inCompactMode
    : rightSidebar.visible.inComfortableMode;

  return (
    <Sidebar.Container visible={expanded} position="right">
      {expanded && (
        <>
          <Tabs swapSecondTab={swapSecondTab} />
          {!swapSecondTab && rightSidebar.tab === SidebarTab.Left && (
            <Properties />
          )}
          {swapSecondTab && rightSidebar.tab === SidebarTab.Left && (
            <Snippets />
          )}
          {rightSidebar.tab === SidebarTab.Right && <Inspect />}
        </>
      )}

      <Sidebar.Collapse
        position="right"
        expanded={expanded}
        onClick={handleCollapseClick}
      />
    </Sidebar.Container>
  );
}
