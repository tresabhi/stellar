import { TextAlignBottomIcon } from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
import useTranslator from 'hooks/useTranslator';
import { SidebarTab } from 'stores/settings';

export default function Tabs() {
  const { t } = useTranslator();
  const handleClick = (tab: SidebarTab) => () => {
    mutateSettings((draft) => {
      draft.interface.tabs.staging.leftSidebar.tab = tab;
    });
  };

  return (
    <Sidebar.TabContainer>
      <Sidebar.Tab
        readonly
        onClick={handleClick(SidebarTab.Left)}
        selected
        icon={<TextAlignBottomIcon />}
      >
        {t`tabs.layout.left_sidebar.parts`}
      </Sidebar.Tab>
    </Sidebar.TabContainer>
  );
}
