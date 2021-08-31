import { isDesktop, isMobile } from 'react-device-detect';

import PseudoContainer from 'components/PseudoContainer';
import DeviceChooser from 'components/DeviceChooser';

import { ReactComponent as DesktopIcon } from 'assets/icons/desktop.svg';
import { ReactComponent as MobileIcon } from 'assets/icons/mobile.svg';

const Home = () => {
  return (
    <PseudoContainer>
      <DeviceChooser.Container>
        <DeviceChooser.Title>Choose Your Device</DeviceChooser.Title>
        <DeviceChooser.List>
          <DeviceChooser.Card href="Desktop" text="Desktop">
            <DesktopIcon />
          </DeviceChooser.Card>
          <DeviceChooser.Card href="Mobile" text="Mobile">
            <MobileIcon />
          </DeviceChooser.Card>
        </DeviceChooser.List>
      </DeviceChooser.Container>
    </PseudoContainer>
  );
};

export default Home;
