import { VariantProps } from '@stitches/react';
import { FC, HTMLAttributes, MouseEvent } from 'react';
import { styled, theme } from 'stitches.config';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof Primitive> {}

const Primitive = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapUnrelated,
  borderRadius: theme.radii[4],
  border: theme.borderStyles.componentNonInteractive,
  backgroundColor: theme.colors.appBackground2,
  padding: theme.space.padding,

  variants: {
    width: {
      regular: {
        width: theme.sizes.popupWidth,
      },
    },
  },

  defaultVariants: {
    width: 'regular',
  },
});

// TODO: rename to Root
export const Container: FC<ContainerProps> = ({ onClick, ...props }) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick && onClick(event);
  };

  return <Primitive {...props} onClick={handleClick} />;
};
