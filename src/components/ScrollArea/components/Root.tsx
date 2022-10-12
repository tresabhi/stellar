import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { FC } from 'react';
import { styled } from 'stitches.config';

const StyledRoot = styled(ScrollAreaPrimitive.Root, {
  overflow: 'hidden',
});

export const Root: FC<ScrollAreaPrimitive.ScrollAreaProps> = (props) => (
  <StyledRoot type="scroll" {...props} />
);
