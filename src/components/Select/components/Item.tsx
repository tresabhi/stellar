import { CheckIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { forwardRef } from 'react';
import { styled, theme } from 'stitches.config';

const Trigger = styled(SelectPrimitive.Item, {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[12],
  padding: `${theme.space.paddingMinor} calc(${theme.space.paddingMinor} * 2 + ${theme.sizes[12]}) ${theme.space.paddingMinor} calc(${theme.space.paddingMinor} * 2 + ${theme.sizes[12]})`,
  cursor: 'pointer',
  borderRadius: theme.radii.regular,
  position: 'relative',

  '&[data-highlighted]': {
    backgroundColor: theme.colors.componentInteractiveHover,
  },
});
const ItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  paddingLeft: theme.space.paddingMinor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: 0,
  top: 0,
  height: '100%',
});
const Icon = styled(CheckIcon, {
  width: theme.sizes[12],
  height: theme.sizes[12],
});

export const Item = forwardRef<HTMLDivElement, SelectPrimitive.SelectItemProps>(
  ({ children, ...props }, ref) => (
    <Trigger {...props} ref={ref}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <ItemIndicator>
        <Icon />
      </ItemIndicator>
    </Trigger>
  ),
);
