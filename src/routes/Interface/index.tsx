import { useInterfaceMode } from 'hooks/useInterfaceMode';
import { styled } from 'stitches.config';
import useApp, { Tab } from 'stores/useApp';
import { InterfaceMode } from 'stores/useSettings';
import { CreateTab } from './components/CreateTab';
import { ExportTab } from './components/ExportTab';
import { LayoutTab } from './components/LayoutTab';
import { Popups } from './components/Popups';
import { StagingTab } from './components/StagingTab';
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
  const tab = useApp((state) => state.interface.tab);

  return (
    <DeviceVariantContainer>
      <Popups />

      <Tabs />

      {tab === Tab.Create && <CreateTab />}
      {tab === Tab.Layout && (
        <LayoutTab swapSecondTab={interfaceMode === InterfaceMode.Compact} />
      )}
      {tab === Tab.Staging && <StagingTab />}
      {tab === Tab.Export && <ExportTab />}
    </DeviceVariantContainer>
  );
};

export default Interface;
