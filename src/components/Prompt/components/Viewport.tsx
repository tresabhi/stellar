import dismissPrompt from 'core/interface/dismissPrompt';
import { styled, theme } from 'stitches.config';
import usePrompts from 'stores/prompts';

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
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.popupBackground,
  padding: theme.sizes.promptPadding,
  boxSizing: 'border-box',
});

export function Viewport() {
  const prompts = usePrompts((state) => state.prompts);
  const popupNodes = prompts.map(({ id, dismissByBlur, node }) => {
    const handleClick = () => {
      if (dismissByBlur) dismissPrompt(id);
    };

    return (
      <Container onClick={handleClick} key={id}>
        {node}
      </Container>
    );
  });

  return <Wrapper>{popupNodes}</Wrapper>;
}
