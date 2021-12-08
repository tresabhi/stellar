import * as TitleBar from 'components/TitleBar';
import { FC } from 'react';

const ToolBarTop: FC = () => (
  <TitleBar.Container>
    <TitleBar.ControlMenuContainer>
      <TitleBar.ControlMenuButton>File</TitleBar.ControlMenuButton>
      <TitleBar.ControlMenuButton>Edit</TitleBar.ControlMenuButton>
      <TitleBar.ControlMenuButton>View</TitleBar.ControlMenuButton>
      <TitleBar.ControlMenuButton>Part</TitleBar.ControlMenuButton>
      <TitleBar.ControlMenuButton>Help</TitleBar.ControlMenuButton>
    </TitleBar.ControlMenuContainer>

    <TitleBar.TabsContainer>
      <TitleBar.Tab selected>Layout</TitleBar.Tab>
      <TitleBar.Tab>Staging</TitleBar.Tab>
      <TitleBar.Tab>Simulation</TitleBar.Tab>
      <TitleBar.Tab>Rendering</TitleBar.Tab>
    </TitleBar.TabsContainer>
  </TitleBar.Container>
);
export default ToolBarTop;
