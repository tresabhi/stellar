import { BrowserView, MobileView } from 'react-device-detect';

import PseudoRoot from 'components/PseudoRoot';

const Home = () => {
  return (
    <PseudoRoot>
      <a href="Desktop">Desktop</a>
      <br />
      <a href="Mobile">Mobile</a>
      <br />
      <br />
      <BrowserView>You're on a desktop</BrowserView>
      <MobileView>You're on a mobile</MobileView>
    </PseudoRoot>
  );
};

export default Home;
