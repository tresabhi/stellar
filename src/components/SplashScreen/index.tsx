import { ReactComponent as LoadingIcon } from 'assets/icons/loading.svg';
import IconProvider from 'components/IconProvider';
import useStellarName from 'core/hooks/useStellarName';
// import './index.scss';

const SplashScreen = () => (
  <div className="splash-screen">
    <IconProvider className="stellar-icon" />
    <p className="loading-text">
      Loading {useStellarName()}...
      <LoadingIcon className="loading-icon" />
    </p>
  </div>
);

export default SplashScreen;
