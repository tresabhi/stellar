import { useInterfaceMode } from 'hooks/useInterfaceMode';
import { styled } from 'stitches.config';
import { InterfaceMode } from 'stores/useSettings';
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
  const interfaceMode = useInterfaceMode();

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
