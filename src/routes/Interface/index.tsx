import * as Notification from 'components/Notification';
import * as Prompt from 'components/Prompt';
import dismissPrompt from 'core/interface/dismissPrompt';
import prompt from 'core/interface/prompt';
import useTouchscreenMode from 'hooks/useTouchscreenMode';
import { useEffect } from 'react';
import InstabilityWarningPrompt from 'routes/components/InstabilityWarningPrompt';
import WelcomePrompt from 'routes/components/WelcomePrompt';
import { styled } from 'stitches.config';
import useApp, { Tab } from 'stores/app';
import useSettings from 'stores/settings';
import getContext, { StellarName } from 'utilities/getContext';
import CreateTab from './components/CreateTab';
import ExportTab from './components/ExportTab';
import LayoutTab from './components/LayoutTab';
import StagingTab from './components/StagingTab';
import Tabs from './components/Tabs';

export const UNSTABLE_VERSIONS = [StellarName.Alpha, StellarName.Unknown];

export interface SidebarTabProps {
  selected: boolean;
  onClick: () => void;
}

const Container = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const useWelcomePopup = () => {
  const { welcomePromptCompleted } = useSettings.getState().interface;

  if (!welcomePromptCompleted) {
    prompt(WelcomePrompt, false, 'welcome-popup');
  }
};

const useAlphaWarning = () => {
  useEffect(() => {
    const { name } = getContext();
    const { showInstabilityWarning, welcomePromptCompleted } =
      useSettings.getState().interface;
    let id: string;

    if (
      showInstabilityWarning &&
      welcomePromptCompleted &&
      UNSTABLE_VERSIONS.includes(name)
    ) {
      id = prompt(InstabilityWarningPrompt, false);
    }

    return () => dismissPrompt(id);
  }, []);
};

function Interface() {
  const zenMode = useApp((state) => state.interface.focusMode);
  const touchscreenMode = useTouchscreenMode();
  const tab = useApp((state) => state.interface.tab);

  useAlphaWarning();
  useWelcomePopup();

  return (
    <Container>
      {!zenMode && <Tabs />}

      {tab === Tab.Create && <CreateTab />}
      {tab === Tab.Layout && <LayoutTab swapSecondTab={touchscreenMode} />}
      {tab === Tab.Staging && <StagingTab />}
      {tab === Tab.Export && <ExportTab />}

      <Prompt.Viewport />
      <Notification.Viewport />
    </Container>
  );
}

export default Interface;
