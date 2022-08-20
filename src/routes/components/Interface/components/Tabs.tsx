import {
  ExitIcon,
  FilePlusIcon,
  ListBulletIcon,
  RulerHorizontalIcon,
} from '@radix-ui/react-icons';
import * as Tabbar from 'components/Tabbar';
import { mutateApp } from 'core/app/mutateApp';
import useApp, { Tab } from 'stores/useApp';

export const Tabs = () => {
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
    <Tabbar.Container>
      <Tabbar.Tab {...is(Tab.Create)} icon={<FilePlusIcon />}>
        Create
      </Tabbar.Tab>
      <Tabbar.Tab {...is(Tab.Layout)} icon={<RulerHorizontalIcon />}>
        Layout
      </Tabbar.Tab>
      <Tabbar.Tab {...is(Tab.Staging)} icon={<ListBulletIcon />}>
        Staging
      </Tabbar.Tab>
      <Tabbar.Tab {...is(Tab.Export)} icon={<ExitIcon />}>
        Export
      </Tabbar.Tab>
    </Tabbar.Container>
  );
};
