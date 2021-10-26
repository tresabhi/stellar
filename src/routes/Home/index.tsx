import { isDesktop, isMobile } from 'react-device-detect';

import PseudoContainer from '../../components/PseudoContainer';
import DevicePicker from '../../components/DevicePicker';

import { ReactComponent as DesktopIcon } from '../../assets/icons/desktop.svg';
import { ReactComponent as MobileIcon } from '../../assets/icons/mobile.svg';

const Home = () => {
  return (
    <PseudoContainer>
      <DevicePicker.Container>
        <DevicePicker.Title>Which Device Are You On?</DevicePicker.Title>
        <DevicePicker.List>
          <DevicePicker.Card
            recommended={isDesktop}
            to="/desktop"
            text="Desktop"
          >
            <DesktopIcon />
          </DevicePicker.Card>
          <DevicePicker.Card recommended={isMobile} to="/mobile" text="Mobile">
            <MobileIcon />
          </DevicePicker.Card>
        </DevicePicker.List>
        <DevicePicker.Build />
      </DevicePicker.Container>
    </PseudoContainer>
  );
};

export default Home;
