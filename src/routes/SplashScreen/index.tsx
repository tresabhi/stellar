import { ReactComponent as LoadingIcon } from 'assets/icons/loading.svg';
import IconProvider from 'components/IconProvider';
import useStellarContext from 'hooks/useStellarContext';
import './index.scss';

const SplashScreen = () => {
  const stellarContext = useStellarContext();

  return (
    <div className="splash-screen">
      <IconProvider className="stellar-icon" />
      <p className="loading-text">
        {stellarContext.title}
        <LoadingIcon className="loading-icon" />
      </p>
    </div>
  );
};

export default SplashScreen;
