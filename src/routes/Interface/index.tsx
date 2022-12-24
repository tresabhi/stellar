import * as Notification from 'components/Notification';
import * as Prompt from 'components/Prompt';
import prompt from 'core/interface/prompt';
import useInterfaceMode from 'hooks/useInterfaceMode';
import WelcomePopup from 'routes/components/WelcomePopup';
import { styled } from 'stitches.config';
import useApp, { Tab } from 'stores/app';
import useSettings, { InterfaceMode } from 'stores/settings';
import CreateTab from './components/CreateTab';
import ExportTab from './components/ExportTab';
import LayoutTab from './components/LayoutTab';
import StagingTab from './components/StagingTab';
import Tabs from './components/Tabs';

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

const useWelcomePopup = () => {
  const { welcomePromptCompleted } = useSettings.getState().interface;

  if (!welcomePromptCompleted) {
    prompt(WelcomePopup, false, 'welcome-popup');
  }
};

function Interface() {
  const zenMode = useApp((state) => state.interface.focusMode);
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

      <Prompt.Viewport />
      <Notification.Viewport />
    </Container>
  );
}

export default Interface;
