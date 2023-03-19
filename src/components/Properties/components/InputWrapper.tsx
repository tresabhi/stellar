import { ReactNode } from 'react';
import { styled, theme } from 'stitches.config';

export interface InputWithLabelProps {
  label: string;
}

export interface InputWrapperProps extends InputWithLabelProps {
  children: ReactNode;
  horizontal?: boolean;
}

const Wrapper = styled('div', {
  display: 'flex',
  flex: 1,
  gap: theme.space.gapRelatedRegular,

  variants: {
    horizontal: {
      false: { flexDirection: 'column' },
      true: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
    },
  },

  defaultVariants: {
    horizontal: true,
  },
});
const Label = styled('span', {
  color: theme.colors.textLowContrast,
  fontSize: theme.fontSizes[10],
});
const Children = styled('div', {
  display: 'flex',
});

export function InputWrapper({
  label,
  horizontal,
  children,
}: InputWrapperProps) {
  return (
    <Wrapper horizontal={horizontal}>
      <Label>{label}</Label>
      <Children>{children}</Children>
    </Wrapper>
  );
}
