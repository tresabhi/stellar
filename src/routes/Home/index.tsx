import { BrowserView, MobileView } from 'react-device-detect';

import PseudoRoot from 'components/PseudoRoot';

const Home = () => {
  return (
    <PseudoRoot>
      <BrowserView>
        <a href="Desktop">Desktop</a>
        <br />
      </BrowserView>
      <MobileView>
        <a href="Mobile">Mobile</a>
      </MobileView>
    </PseudoRoot>
  );
};

export default Home;
