import { LayoutCanvas } from 'components/Canvas';
import useApp, { TAB } from 'hooks/useApp';
import { styled } from 'stitches.config';
import Toolbar from '../Toolbar';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: '1',

  variants: {
    visible: {
      false: {
        display: 'none',
      },
    },
  },
});

export const Layout = () => {
  const tab = useApp((state) => state.tab);

  return (
    <Container visible={tab === TAB.LAYOUT}>
      <Toolbar />
      <LayoutCanvas />
    </Container>
  );
};
