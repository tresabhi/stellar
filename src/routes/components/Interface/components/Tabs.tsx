import {
  ExitIcon,
  FilePlusIcon,
  ListBulletIcon,
  RulerHorizontalIcon,
} from '@radix-ui/react-icons';
import * as TabBar from 'components/TabBar';
import { mutateApp } from 'core/app/mutateApp';
import { useTranslator } from 'hooks/useTranslator';
import useApp, { Tab } from 'stores/useApp';

export const Tabs = () => {
  const { t } = useTranslator();
  const tab = useApp((state) => state.interface.tab);
  const is = (targetTab: Tab) => {
    return {
      selected: tab === targetTab,
      onClick: () =>
        mutateApp((draft) => {
          draft.interface.tab = targetTab;
        }),
    };
  };

  return (
    <TabBar.Container>
      <TabBar.Tab {...is(Tab.Create)} icon={<FilePlusIcon />}>
        {t`tab.create`}
      </TabBar.Tab>
      <TabBar.Tab {...is(Tab.Layout)} icon={<RulerHorizontalIcon />}>
        {t`tab.layout`}
      </TabBar.Tab>
      <TabBar.Tab {...is(Tab.Staging)} icon={<ListBulletIcon />}>
        {t`tab.staging`}
      </TabBar.Tab>
      <TabBar.Tab {...is(Tab.Export)} icon={<ExitIcon />}>
        {t`tab.export`}
      </TabBar.Tab>
    </TabBar.Container>
  );
};
