import { styled, theme } from 'stitches.config';
import useNotifications from 'stores/notifications';

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

export function Viewport() {
  const toasts = useNotifications((state) => state.notifications);
  const toastNodes = toasts.map(({ node }) => node);

  return <Container>{toastNodes}</Container>;
}
