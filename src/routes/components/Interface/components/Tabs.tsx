import {
  ExitIcon,
  FilePlusIcon,
  ListBulletIcon,
  RulerHorizontalIcon,
} from '@radix-ui/react-icons';
import * as Tabbar from 'components/Tabbar';
import { FC, ReactNode } from 'react';
import { styled } from 'stitches.config';
import useApp, { Tab } from 'stores/useApp';

export const Tabs = () => {
  const tab = useApp((state) => state.tab);
  const is = (target: Tab) => {
    return {
      selected: tab === target,
      onClick: () => useApp.setState({ tab: target }),
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
