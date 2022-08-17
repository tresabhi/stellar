import { LayoutCanvas } from 'components/Canvas';
import { TabContainer } from 'components/TabContainer';
import { Tab } from 'stores/useApp';
import Toolbar from './components/Toolbar';

export const TabLayout = () => (
  <TabContainer tab={Tab.Layout}>
    <Toolbar />
    <LayoutCanvas />
  </TabContainer>
);
