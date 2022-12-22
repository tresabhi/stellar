import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { FC } from 'react';
import { styled, theme } from 'stitches.config';

const Container = styled(SelectPrimitive.Content, {
  zIndex: 2,
  overflow: 'hidden',
  backgroundColor: theme.colors.componentBackground,
  padding: theme.space.paddingMinor,
  border: theme.borderStyles.componentInteractive,
  borderRadius: theme.radii[4],
});
const ScrollUpButton = styled(SelectPrimitive.ScrollUpButton, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const ScrollDownButton = styled(SelectPrimitive.ScrollDownButton, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const UpIcon = styled(ChevronUpIcon, {
  color: theme.colors.textLowContrast,
});
const DownIcon = styled(ChevronDownIcon, {
  color: theme.colors.textLowContrast,
});

export const Content: FC<SelectPrimitive.SelectContentProps> = ({
  children,
  ...props
}) => (
  <SelectPrimitive.Portal>
    <Container {...props}>
      <SelectPrimitive.Viewport>
        <ScrollUpButton>
          <UpIcon />
        </ScrollUpButton>

        {children}

        <ScrollDownButton>
          <DownIcon />
        </ScrollDownButton>
      </SelectPrimitive.Viewport>
    </Container>
  </SelectPrimitive.Portal>
);
