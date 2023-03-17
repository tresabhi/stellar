import { VariantProps } from '@stitches/react';
import { HTMLAttributes, MouseEvent } from 'react';
import { styled, theme } from 'stitches.config';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof StyledDiv> {}

const StyledDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapUnrelatedRegular,
  borderRadius: theme.radii.regular,
  border: theme.borderStyles.nonInteractive,
  backgroundColor: theme.colors.appBackground2,

  variants: {
    width: {
      regular: {
        width: theme.sizes.promptWidth,
      },
    },

    padding: {
      regular: { padding: theme.space.paddingMajor },
      thin: { padding: theme.space.paddingRegular },
    },
  },

  defaultVariants: {
    width: 'regular',
    padding: 'regular',
  },
});

export function Root({ onClick, ...props }: ContainerProps) {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (onClick) onClick(event);
  };

  return <StyledDiv {...props} onClick={handleClick} />;
}
