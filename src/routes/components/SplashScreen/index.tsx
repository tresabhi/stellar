import { BarLoader } from 'react-spinners';
import getContext from 'utilities/getContext';

function SplashScreen() {
  const { Icon } = getContext();

  return (
    <div
      style={{
        backgroundColor: 'hsl(246, 6.0%, 9.0%)',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <Icon style={{ width: '4rem', height: '4rem' }} />
      <BarLoader color="hsl(275, 80.0%, 71.0%)" />
    </div>
  );
}

export default SplashScreen;
