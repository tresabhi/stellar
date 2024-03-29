import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { styled, theme } from 'stitches.config';

const Container = styled(SelectPrimitive.Content, {
  zIndex: 2,
  overflow: 'hidden',
  backgroundColor: theme.colors.componentInteractive,
  padding: theme.space.paddingMinor,
  border: theme.borderStyles.interactive,
  borderRadius: theme.radii.regular,
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

export function Content({
  children,
  ...props
}: SelectPrimitive.SelectContentProps) {
  return (
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
}
