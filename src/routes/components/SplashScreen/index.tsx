import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import getStellarContext from 'utilities/getStellarContext';
import styles from './index.module.scss';

interface SplashScreenProps {
  navigateTo?: string;
}

const SplashScreen: FC<SplashScreenProps> = ({ navigateTo }) => {
  const stellarContext = getStellarContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (navigateTo) navigate('/interface');
  });

  return (
    <div className={styles['splash-screen']}>
      <stellarContext.Icon className={styles.icon} />
      <PulseLoader size={12} margin={4} color="hsl(270, 70%, 50%)" />
    </div>
  );
};

export default SplashScreen;
