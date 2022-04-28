import { css } from '@emotion/react';
import useStellarContext from 'hooks/useStellarContext';
import { PulseLoader } from 'react-spinners';
import styles from './index.module.scss';

const loaderStyles = css`
  border-radius: 4px;
`;

const SplashScreen = () => {
  const stellarContext = useStellarContext();

  return (
    <div className={styles['splash-screen']}>
      <stellarContext.Icon className={styles.icon} />
      <PulseLoader
        size={12}
        margin={4}
        color="hsl(270, 70%, 50%)"
        css={loaderStyles}
      />
    </div>
  );
};

export default SplashScreen;
