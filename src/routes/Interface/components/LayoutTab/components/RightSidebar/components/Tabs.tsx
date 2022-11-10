import {
  Component1Icon,
  MagnifyingGlassIcon,
  MixerVerticalIcon,
} from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import { mutateSettings } from 'core/app';
import { useTranslator } from 'hooks/useTranslator';
import { FC } from 'react';
import useSettings, { SidebarTab } from 'stores/settings';
import { TabLayoutProps } from '../../..';

export const Tabs: FC<TabLayoutProps> = ({ swapSecondTab }) => {
  const { t } = useTranslator();
  const rightSidebar = useSettings(
    (draft) => draft.interface.tabs.layout.rightSidebar,
  );
  const handleClick = (tab: SidebarTab) => {
    return () => {
      mutateSettings((draft) => {
        draft.interface.tabs.layout.rightSidebar.tab = tab;
      });
    };
  };

  return (
    <Sidebar.TabContainer>
      <Sidebar.Tab
        onClick={handleClick(SidebarTab.Left)}
        selected={rightSidebar.tab === SidebarTab.Left}
        icon={swapSecondTab ? <Component1Icon /> : <MixerVerticalIcon />}
      >
        {swapSecondTab
          ? t`tab.layout.left_sidebar.snippets`
          : t`tab.layout.right_sidebar.properties`}
      </Sidebar.Tab>
      <Sidebar.Tab
        onClick={handleClick(SidebarTab.Right)}
        selected={rightSidebar.tab === SidebarTab.Right}
        icon={<MagnifyingGlassIcon />}
      >
        {t`tab.layout.right_sidebar.inspect`}
      </Sidebar.Tab>
    </Sidebar.TabContainer>
  );
};
