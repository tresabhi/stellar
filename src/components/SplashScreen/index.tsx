import { ReactComponent as LoadingIcon } from 'assets/icons/loading.svg';
import IconProvider from 'components/IconProvider';
import useStellarContext from 'core/hooks/useStellarContext';
// import './index.scss';

const SplashScreen = () => (
  <div className="splash-screen">
    <IconProvider className="stellar-icon" />
    <p className="loading-text">
      Loading {useStellarContext().title}...
      <LoadingIcon className="loading-icon" />
    </p>
  </div>
);

export default SplashScreen;
