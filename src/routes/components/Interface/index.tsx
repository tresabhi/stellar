import { useMemo } from 'react';
import { styled } from 'stitches.config';
import useSettings, { InterfaceMode } from 'stores/useSettings';
import { getInterfaceMode } from 'utilities/getInterfaceMode';
import { Popups } from './components/Popups';
import { TabCreate } from './components/TabCreate';
import { TabLayout } from './components/TabLayout';
import { Tabs } from './components/Tabs';

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

const Interface = () => {
  const mode = useSettings((state) => state.interface.mode);
  const interfaceMode = useMemo(() => getInterfaceMode(mode), [mode]);

  return (
    <DeviceVariantContainer>
      <Popups />

      <Tabs />
      <TabCreate />
      <TabLayout swapSecondTab={interfaceMode === InterfaceMode.Compact} />
    </DeviceVariantContainer>
  );
};

export default Interface;
