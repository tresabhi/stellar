import * as ToastPrimitive from '@radix-ui/react-toast';
import { styled, theme } from 'stitches.config';

export const Viewport = styled(ToastPrimitive.Viewport, {
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

console.log(Viewport.className);
