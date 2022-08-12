import { LayoutCanvas } from 'components/Canvas';
import { css, styled } from 'stitches.config';
import Toolbar from '../components/Toolbar';

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Mobile = () => (
  <Container>
    <Toolbar />
    <LayoutCanvas />
  </Container>
);

export default Mobile;
