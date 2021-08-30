import { isDesktop, isMobile } from 'react-device-detect';

import PseudoRoot from 'components/PseudoRoot';
import DeviceChooser from 'components/DeviceChooser';

const Home = () => {
  return (
    <PseudoRoot>
      <DeviceChooser.Container>
        <DeviceChooser.Title>Choose Your Device</DeviceChooser.Title>
        <DeviceChooser.List>
          <DeviceChooser.Card href="Desktop" text="Desktop"></DeviceChooser.Card>
          <DeviceChooser.Card href="Mobile" text="Mobile"></DeviceChooser.Card>
        </DeviceChooser.List>
      </DeviceChooser.Container>
    </PseudoRoot>
  );
};

export default Home;
