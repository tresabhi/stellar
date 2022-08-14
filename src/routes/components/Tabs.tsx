import {
  ExitIcon,
  FilePlusIcon,
  ListBulletIcon,
  RulerHorizontalIcon,
} from '@radix-ui/react-icons';
import * as Tabbar from 'components/Tabbar';
import useApp, { TAB } from 'stores/useApp';

export const Tabs = () => {
  const tab = useApp((state) => state.tab);
  const is = (target: TAB) => {
    return {
      selected: tab === target,
      onClick: () => useApp.setState({ tab: target }),
    };
  };

  return (
    <Tabbar.Container>
      <Tabbar.Tab {...is(TAB.CREATE)} icon={<FilePlusIcon />}>
        Create
      </Tabbar.Tab>
      <Tabbar.Tab {...is(TAB.LAYOUT)} icon={<RulerHorizontalIcon />}>
        Layout
      </Tabbar.Tab>
      <Tabbar.Tab {...is(TAB.STAGING)} icon={<ListBulletIcon />}>
        Staging
      </Tabbar.Tab>
      <Tabbar.Tab {...is(TAB.EXPORT)} icon={<ExitIcon />}>
        Export
      </Tabbar.Tab>
    </Tabbar.Container>
  );
};
