import { styled, theme } from 'stitches.config';
import useToasts from 'stores/toasts';

const Container = styled('div', {
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: `0 ${theme.space.paddingMajor} ${theme.space.paddingMajor} 0`,
  gap: theme.space.gapUnrelated,
  margin: 0,
  listStyle: 'none',
});

export const Viewport = () => {
  const toasts = useToasts((state) => state.toasts);
  const toastNodes = toasts.map(({ node }) => node);

  return <Container>{toastNodes}</Container>;
};
