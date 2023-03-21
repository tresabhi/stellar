import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { styled, theme } from 'stitches.config';

export const Root = styled(ToggleGroupPrimitive.Root, {
  display: 'flex',
  borderRadius: theme.radii.regular,
  border: theme.borderStyles.interactive,
});
