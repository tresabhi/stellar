import { CaretSortIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { FC } from 'react';
import { styled, theme } from 'stitches.config';

const Primitive = styled(SelectPrimitive.Trigger, {
  backgroundColor: theme.colors.componentBackground,
  padding: theme.space.paddingMinor,
  gap: theme.space.gapRelated,
  border: theme.borderStyles.componentInteractive,
  borderRadius: theme.radii[4],
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
    backgroundColor: theme.colors.componentBackgroundHover,
  },
  '&:active': {
    backgroundColor: theme.colors.componentBackgroundActive,
  },
  '&:focus': {
    outline: theme.borderStyles.componentInteractiveActive,
  },
});

const CaretIcon = styled(CaretSortIcon, {
  width: theme.sizes[12],
  height: theme.sizes[12],
});

export const Trigger: FC<SelectPrimitive.SelectValueProps> = (props) => (
  <Primitive>
    <SelectPrimitive.Value {...props} />
    <SelectPrimitive.Icon>
      <CaretIcon />
    </SelectPrimitive.Icon>
  </Primitive>
);
