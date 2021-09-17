import { isDesktop, isMobile } from 'react-device-detect';

import PseudoContainer from '../../components/PseudoContainer';
import DevicePicker from '../../components/DevicePicker';

import { ReactComponent as DesktopIcon } from '../../assets/icons/desktop.svg';
import { ReactComponent as MobileIcon } from '../../assets/icons/mobile.svg';

const Home = () => {
  return (
    <PseudoContainer>
      <DevicePicker.Container>
        <DevicePicker.Title>Choose Your Editor Version</DevicePicker.Title>
        <DevicePicker.List>
          <DevicePicker.Card recomended={isDesktop} href="desktop" text="Desktop">
            <DesktopIcon />
          </DevicePicker.Card>
          <DevicePicker.Card recomended={isMobile} href="mobile" text="Mobile">
            <MobileIcon />
          </DevicePicker.Card>
        </DevicePicker.List>
        <DevicePicker.Build />
      </DevicePicker.Container>
    </PseudoContainer>
  );
};

export default Home;
