import { CaretSortIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { styled, theme } from 'stitches.config';

const StyledTrigger = styled(SelectPrimitive.Trigger, {
  backgroundColor: theme.colors.componentInteractive,
  padding: theme.space.paddingMinor,
  gap: theme.space.gapRelatedRegular,
  border: theme.borderStyles.interactive,
  borderRadius: theme.radii.regular,
  cursor: 'pointer',
  fontSize: theme.fontSizes[12],
  color: theme.colors.textHighContrast,
  display: 'flex',
  textAlign: 'left',
  justifyContent: 'center',
  alignItems: 'center',

  '&[data-placeholder]': {
    color: theme.colors.textLowContrast,
  },

  '& > span:first-child': {
    flex: 1,
  },

  '& > span:last-child': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '&:hover': {
    backgroundColor: theme.colors.componentInteractiveHover,
  },
  '&:active': {
    backgroundColor: theme.colors.componentInteractiveActive,
  },
  '&:focus': {
    outline: theme.borderStyles.interactiveActive,
  },
});

const CaretIcon = styled(CaretSortIcon, {
  width: theme.sizes[12],
  height: theme.sizes[12],
});

export function Trigger(props: SelectPrimitive.SelectValueProps) {
  return (
    <StyledTrigger>
      <SelectPrimitive.Value {...props} />
      <SelectPrimitive.Icon>
        <CaretIcon />
      </SelectPrimitive.Icon>
    </StyledTrigger>
  );
}
Trigger.toString = StyledTrigger.toString;
