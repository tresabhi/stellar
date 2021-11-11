import './index.scss';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar.svg';
import { ReactComponent as LoadingIcon } from 'assets/icons/loading.svg';

const SplashScreen = () => (
  <div className="splash-screen">
    <StellarIcon className="stellar-icon" />
    <LoadingIcon className="loading-icon"/>
  </div>
);

export default SplashScreen;
