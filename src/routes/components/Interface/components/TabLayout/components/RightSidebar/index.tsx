import * as Sidebar from 'components/Sidebar';
import { mutateSettings } from 'core/app';
import { useInterfaceMode } from 'hooks/useInterfaceMode';
import { FC } from 'react';
import useSettings, { InterfaceMode, SidebarTab } from 'stores/useSettings';
import { TabLayoutProps } from '../..';
import { Properties } from './components/Properties';
import { Tabs } from './components/Tabs';

export const RightSidebar: FC<TabLayoutProps> = ({ swapSecondTab }) => {
  const rightSidebar = useSettings(
    (draft) => draft.interface.tabs.layout.rightSideBar,
  );
  const interfaceMode = useInterfaceMode();
  const handleCollapseClick = () => {
    mutateSettings((draft) => {
      if (interfaceMode === InterfaceMode.Compact) {
        draft.interface.tabs.layout.rightSideBar.visible.inCompactMode =
          !draft.interface.tabs.layout.rightSideBar.visible.inCompactMode;
      } else {
        draft.interface.tabs.layout.rightSideBar.visible.inComfortableMode =
          !draft.interface.tabs.layout.rightSideBar.visible.inComfortableMode;
      }
    });
  };
  const expanded =
    interfaceMode === InterfaceMode.Compact
      ? rightSidebar.visible.inCompactMode
      : rightSidebar.visible.inComfortableMode;

  return (
    <Sidebar.Container
      visible={
        interfaceMode === InterfaceMode.Compact
          ? rightSidebar.visible.inCompactMode
          : rightSidebar.visible.inComfortableMode
      }
      position="right"
    >
      <Tabs swapSecondTab={swapSecondTab} />
      {!swapSecondTab && rightSidebar.tab === SidebarTab.Left && <Properties />}

      <Sidebar.Collapse
        position="right"
        expanded={expanded}
        onClick={handleCollapseClick}
      />
    </Sidebar.Container>
  );
};
