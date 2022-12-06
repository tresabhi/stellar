import { dismissPopup } from 'core/interface/dismissPopup';
import { styled, theme } from 'stitches.config';
import usePopups from 'stores/popups';

const Wrapper = styled('div', {
  pointerEvents: 'none',
  zIndex: 2,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
});

const Container = styled('div', {
  pointerEvents: 'auto',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.popupBackground,
});

export const Viewport = () => {
  const popups = usePopups((state) => state.popups);
  const popupNodes = popups.map(({ id, node }) => {
    const handleClick = () => dismissPopup(id);

    return (
      <Container onClick={handleClick} key={id}>
        {node}
      </Container>
    );
  });

  return <Wrapper>{popupNodes}</Wrapper>;
};
