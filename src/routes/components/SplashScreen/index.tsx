import { BarLoader } from 'react-spinners';
import { styled, theme, themeDark } from 'stitches.config';
import { getContext } from 'utilities/getContext';

const Container = styled('div', {
  backgroundColor: theme.colors.appBackground1,
  height: '100vh',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapUnrelatedMajor,

  '& > svg': {
    width: theme.sizes[64],
    height: theme.sizes[64],
  },
});

const SplashScreen = () => {
  const { Icon } = getContext();

  return (
    <Container className={themeDark}>
      <Icon />

      <BarLoader
        color={theme.colors.componentSolidBackground_accent.toString()}
      />
    </Container>
  );
};

export default SplashScreen;
