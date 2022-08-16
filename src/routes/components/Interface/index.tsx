import { FC } from 'react';
import { styled } from 'stitches.config';
import { Popups } from './components/Popups';
import { TabCreate } from './components/TabCreate';
import { TabLayout } from './components/TabLayout';
import { Tabs } from './components/Tabs';

export const DeviceVariantContainer = styled('div', {
  width: '100vw',
  height: '100vh',
  maxWidth: '100vw',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

export interface InterfaceProps {}

const Interface: FC<InterfaceProps> = () => (
  <DeviceVariantContainer>
    <Popups />

    <Tabs />
    <TabCreate />
    <TabLayout />
  </DeviceVariantContainer>
);

export default Interface;
