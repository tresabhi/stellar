import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { FocusEvent } from 'react';
import { styled, theme } from 'stitches.config';

export interface SliderProps
  extends Omit<
    SliderPrimitive.SliderProps,
    'value' | 'defaultValue' | 'onValueChange'
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

  '&[data-orientation="horizontal"]': {
    height: theme.sizes.sliderThumb,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: theme.sizes.sliderThumb,
  },
});

const Track = styled(SliderPrimitive.Track, {
  backgroundColor: theme.colors.borderInteractive,
  position: 'relative',
  flexGrow: 1,
  borderRadius: theme.radii[1],

  '&[data-orientation="horizontal"]': { height: theme.sizes.sliderTrackWidth },
  '&[data-orientation="vertical"]': { width: theme.sizes.sliderTrackWidth },
});

const Range = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: theme.colors.borderInteractive_accent,
  borderRadius: theme.radii[1],
  height: '100%',
});

const Thumb = styled(SliderPrimitive.Thumb, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: theme.borderStyles.interactive,
  cursor: 'grab',
  width: theme.sizes.sliderThumb,
  height: theme.sizes.sliderThumb,
  backgroundColor: theme.colors.componentInteractive,
  borderRadius: theme.radii[16],

  '&:hover': {
    backgroundColor: theme.colors.componentInteractiveHover,
    border: theme.borderStyles.interactiveHover,
  },
  '&:active': {
    cursor: 'grabbing',
    backgroundColor: theme.colors.componentInteractiveActive,
    border: theme.borderStyles.interactiveActive,
  },
  '&:focus': {
    outline: theme.borderStyles.interactiveActive,
  },
});

const Icon = styled(DragHandleDots2Icon, {
  color: theme.colors.textHighContrast,
  width: theme.sizes[10],
  height: theme.sizes[10],
});

export default function Slider({
  disabled,
  value,
  defaultValue,
  onValueChange,
  ...props
}: SliderProps) {
  const handleFocus = (event: FocusEvent<HTMLSpanElement>) => {
    if (disabled) event.target.blur();
  };
  const handleValueChange = ([newValue]: [number]) => {
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <Root
      {...props}
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
}
