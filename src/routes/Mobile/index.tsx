import { LayoutCanvas } from 'components/Canvas';
import { css } from 'stitches.config';
import Toolbar from '../components/Toolbar';

const mobileStyles = css({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Mobile = () => (
  <div className={mobileStyles()}>
    <Toolbar />
    <LayoutCanvas />
  </div>
);

export default Mobile;
