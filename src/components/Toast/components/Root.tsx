import * as ToastPrimitive from '@radix-ui/react-toast';
import { styled, theme } from 'stitches.config';

export const Root = styled(ToastPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
  padding: theme.space.paddingMajor,
  gap: theme.space.gapRelatedMajor,
  backgroundColor: theme.colors.componentBackground,
  borderRadius: theme.radii[4],
  border: theme.borderStyles.componentInteractive,
  width: theme.sizes.toastWidth,
});
