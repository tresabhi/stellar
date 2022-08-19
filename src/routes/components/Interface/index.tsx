import { FC } from 'react';
import { styled } from 'stitches.config';
import { Popups } from './components/Popups';
import { TabCreate } from './components/TabCreate';
import { TabLayout } from './components/TabLayout';
import { Tabs } from './components/Tabs';

export enum InterfaceVariant {
  Comfortable,
  Compact,
}

export interface InterfaceProps {
  type: InterfaceVariant;
}

export interface SidebarTabProps {
  selected: boolean;
  onClick: () => void;
}

export const DeviceVariantContainer = styled('div', {
  width: '100vw',
  height: '100vh',
  maxWidth: '100vw',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Interface: FC<InterfaceProps> = ({ type }) => (
  <DeviceVariantContainer>
    <Popups />

    <Tabs />
    <TabCreate />
    <TabLayout swapSecondTab={type === InterfaceVariant.Compact} />
  </DeviceVariantContainer>
);

export default Interface;
