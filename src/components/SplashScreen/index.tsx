import './index.scss';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar.svg';
import { ReactComponent as LoadingIcon } from 'assets/icons/loading.svg';

const SplashScreen = () => (
  <div className="splash-screen">
    <StellarIcon className="stellar-icon" />
    <p className="loading-text">
      Loading Stellar... <LoadingIcon className="loading-icon" />
    </p>
  </div>
);

export default SplashScreen;
