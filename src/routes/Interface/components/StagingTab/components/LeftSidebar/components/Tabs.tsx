import { LayersIcon, TextAlignBottomIcon } from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
import useTouchscreenMode from 'hooks/useTouchscreenMode';
import useTranslator from 'hooks/useTranslator';
import useSettings, { SidebarTab } from 'stores/settings';

export default function Tabs() {
  const { t } = useTranslator();
  const visibleTab = useSettings(
    (state) => state.interface.tabs.staging.leftSidebar.tab,
  );
  const handleClick = (tab: SidebarTab) => () => {
    mutateSettings((draft) => {
      draft.interface.tabs.staging.leftSidebar.tab = tab;
    });
  };
  const touchscreenMode = useTouchscreenMode();

  return (
    <Sidebar.TabContainer>
      <Sidebar.Tab
        readonly={!touchscreenMode}
        onClick={handleClick(SidebarTab.Left)}
        selected={touchscreenMode ? visibleTab === SidebarTab.Left : true}
        icon={<TextAlignBottomIcon />}
      >
        {t`tabs.staging.left_sidebar.stages`}
      </Sidebar.Tab>
      {touchscreenMode && (
        <Sidebar.Tab
          onClick={handleClick(SidebarTab.Right)}
          selected={visibleTab === SidebarTab.Right}
          icon={<LayersIcon />}
        >
          {t`tabs.layout.left_sidebar.parts`}
        </Sidebar.Tab>
      )}
    </Sidebar.TabContainer>
  );
}
