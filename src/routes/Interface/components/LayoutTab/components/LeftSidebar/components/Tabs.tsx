import {
  Component1Icon,
  LayersIcon,
  MixerVerticalIcon,
} from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
import useTouchscreenMode from 'hooks/useTouchscreenMode';
import useTranslator from 'hooks/useTranslator';
import useSettings, { SidebarTab } from 'stores/settings';

export default function Tabs() {
  const { t } = useTranslator();
  const leftSidebar = useSettings(
    (state) => state.interface.tabs.layout.leftSidebar,
  );
  const handleClick = (tab: SidebarTab) => () => {
    mutateSettings((draft) => {
      draft.interface.tabs.layout.leftSidebar.tab = tab;
    });
  };
  const touchscreenMode = useTouchscreenMode();

  return (
    <Sidebar.TabContainer>
      <Sidebar.Tab
        onClick={handleClick(SidebarTab.Left)}
        selected={leftSidebar.tab === SidebarTab.Left}
        icon={<LayersIcon />}
      >
        {t`tabs.layout.left_sidebar.parts`}
      </Sidebar.Tab>
      <Sidebar.Tab
        onClick={handleClick(SidebarTab.Right)}
        selected={leftSidebar.tab === SidebarTab.Right}
        icon={touchscreenMode ? <MixerVerticalIcon /> : <Component1Icon />}
      >
        {touchscreenMode
          ? t`tabs.layout.right_sidebar.properties`
          : t`tabs.layout.left_sidebar.snippets`}
      </Sidebar.Tab>
    </Sidebar.TabContainer>
  );
}
