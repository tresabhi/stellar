import * as Popup from 'components/Popup';
import * as Toast from 'components/Toast';
import { popup } from 'core/interface';
import { useInterfaceMode } from 'hooks/useInterfaceMode';
import { WelcomePopup } from 'routes/components/WelcomePopup';
import { styled } from 'stitches.config';
import useApp, { Tab } from 'stores/app';
import useSettings, { InterfaceMode } from 'stores/settings';
import { CreateTab } from './components/CreateTab';
import { ExportTab } from './components/ExportTab';
import { LayoutTab } from './components/LayoutTab';
import { StagingTab } from './components/StagingTab';
import { Tabs } from './components/Tabs';

export interface SidebarTabProps {
  selected: boolean;
  onClick: () => void;
}

export const Container = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const Interface = () => {
  const zenMode = useApp((state) => state.interface.zenMode);
  const interfaceMode = useInterfaceMode();
  const tab = useApp((state) => state.interface.tab);

  useWelcomePopup();

  return (
    <Container>
      {!zenMode && <Tabs />}

      {tab === Tab.Create && <CreateTab />}
      {tab === Tab.Layout && (
        <LayoutTab swapSecondTab={interfaceMode === InterfaceMode.Compact} />
      )}
      {tab === Tab.Staging && <StagingTab />}
      {tab === Tab.Export && <ExportTab />}

      <Popup.Viewport />
      <Toast.Viewport />
    </Container>
  );
};

const useWelcomePopup = () => {
  const { welcomePromptCompleted } = useSettings.getState().interface;

  if (!welcomePromptCompleted) {
    popup(WelcomePopup, false, 'welcome-popup');
  }
};

export default Interface;
