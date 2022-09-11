import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { FocusEvent, forwardRef } from 'react';
import { styled, theme } from 'stitches.config';

export interface SliderProps
  extends Omit<
    Omit<Omit<SliderPrimitive.SliderProps, 'onValueChange'>, 'value'>,
    'defaultValue'
  > {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

const Root = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  userSelect: 'none',
  alignItems: 'center',
  touchAction: 'none',

  '&[data-orientation="horizontal"]': {
    height: theme.sizes.sliderThumb,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: theme.sizes.sliderThumb,
  },
});

const Track = styled(SliderPrimitive.Track, {
  backgroundColor: theme.colors.componentInteractiveBorder,
  position: 'relative',
  flexGrow: 1,
  borderRadius: theme.radii[1],

  '&[data-orientation="horizontal"]': { height: theme.sizes.sliderTrackWidth },
  '&[data-orientation="vertical"]': { width: theme.sizes.sliderTrackWidth },
});

const Range = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: theme.colors.componentInteractiveBorder_accent,
  borderRadius: theme.radii[1],
  height: '100%',
});

const Thumb = styled(SliderPrimitive.Thumb, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: theme.borderStyles.componentInteractive,
  cursor: 'grab',
  width: theme.sizes.sliderThumb,
  height: theme.sizes.sliderThumb,
  backgroundColor: theme.colors.componentBackground,
  borderRadius: theme.radii[16],

  '&:hover': {
    backgroundColor: theme.colors.componentBackgroundHover,
    border: theme.borderStyles.componentInteractiveHover,
  },
  '&:active': {
    cursor: 'grabbing',
    backgroundColor: theme.colors.componentBackgroundActive,
    border: theme.borderStyles.componentInteractiveActive,
  },
  '&:focus': {
    outline: theme.borderStyles.componentInteractiveActive,
  },
});

const Icon = styled(DragHandleDots2Icon, {
  color: theme.colors.textHighContrast,
  width: theme.sizes[10],
  height: theme.sizes[10],
});

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  ({ disabled, value, defaultValue, onValueChange, ...props }, ref) => {
    const handleFocus = (event: FocusEvent<HTMLSpanElement>) => {
      if (disabled) event.target.blur();
    };
    const handleValueChange = ([value]: [number]) => {
      onValueChange && onValueChange(value);
    };

    return (
      <Root
        {...props}
        ref={ref}
        value={value === undefined ? undefined : [value]}
        defaultValue={defaultValue === undefined ? undefined : [defaultValue]}
        onValueChange={handleValueChange}
      >
        <Track>
          <Range />
        </Track>

        <Thumb onFocus={handleFocus}>
          <Icon />
        </Thumb>
      </Root>
    );
  },
);
