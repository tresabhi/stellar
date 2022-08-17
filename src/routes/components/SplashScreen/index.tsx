import getStellarContext from 'utilities/getStellarContext';
import { PulseLoader } from 'react-spinners';
import styles from './index.module.scss';

const SplashScreen = () => {
  const stellarContext = getStellarContext();

  return (
    <div className={styles['splash-screen']}>
      <stellarContext.Icon className={styles.icon} />
      <PulseLoader size={12} margin={4} color="hsl(270, 70%, 50%)" />
    </div>
  );
};

export default SplashScreen;
