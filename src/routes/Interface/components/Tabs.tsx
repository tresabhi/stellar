import {
  ExitIcon,
  FilePlusIcon,
  ListBulletIcon,
  RulerHorizontalIcon,
} from '@radix-ui/react-icons';
import * as TabBar from 'components/TabBar';
import mutateApp from 'core/app/mutateApp';
import useTranslator from 'hooks/useTranslator';
import useApp, { Tab } from 'stores/app';

export default function Tabs() {
  const { t } = useTranslator();
  const tab = useApp((state) => state.interface.tab);
  const is = (targetTab: Tab) => ({
    selected: tab === targetTab,
    onClick: () =>
      mutateApp((draft) => {
        draft.interface.tab = targetTab;
      }),
  });

  return (
    <TabBar.Root>
      <TabBar.Tab {...is(Tab.Create)} icon={<FilePlusIcon />}>
        {t`tabs.create`}
      </TabBar.Tab>
      <TabBar.Tab {...is(Tab.Layout)} icon={<RulerHorizontalIcon />}>
        {t`tabs.layout`}
      </TabBar.Tab>
      <TabBar.Tab {...is(Tab.Staging)} icon={<ListBulletIcon />}>
        {t`tabs.staging`}
      </TabBar.Tab>
      <TabBar.Tab {...is(Tab.Export)} icon={<ExitIcon />}>
        {t`tabs.export`}
      </TabBar.Tab>
    </TabBar.Root>
  );
}
