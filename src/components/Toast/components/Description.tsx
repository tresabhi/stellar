import * as ToastPrimitive from '@radix-ui/react-toast';
import { styled, theme } from 'stitches.config';

export const Description = styled(ToastPrimitive.Description, {
  fontSize: theme.fontSizes[12],
  color: theme.colors.textLowContrast,
});
