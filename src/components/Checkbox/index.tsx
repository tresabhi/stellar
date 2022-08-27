import { CheckIcon, DashIcon } from '@radix-ui/react-icons';
import { Button } from 'components/Button';
import { forwardRef, InputHTMLAttributes, MouseEvent, useState } from 'react';
import { styled, theme } from 'stitches.config';

export type CheckboxValue = boolean | null;

export interface CheckboxProps
  extends Omit<
    Omit<InputHTMLAttributes<HTMLButtonElement>, 'defaultValue'>,
    'onChange'
  > {
  /**
   * `true`: checked
   * `false`: unchecked
   * `null`: indeterminate
   */
  defaultValue?: CheckboxValue;
  onChange?: (
    event: MouseEvent<HTMLButtonElement> & { value: CheckboxValue },
  ) => void;
}

const Trigger = styled(Button, {
  width: theme.sizes.inputSizeMinor,
  height: theme.sizes.inputSizeMinor,
  borderRadius: theme.radii[4],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& > svg': {
    width: theme.sizes[12],
    height: theme.sizes[12],
  },

  variants: {
    selected: {
      false: {
        backgroundColor: 'transparent !important',
      },
    },

    color: {},
    priority: {},
    border: { true: {} },
  },

  defaultVariants: {
    color: 'accent',
    priority: 'solid',
    border: true,
  },
});

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ defaultValue = false, onChange, onClick, ...props }, ref) => {
    const [value, setValue] = useState(defaultValue);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setValue((state) => !state);

      if (onClick) onClick(event);
      if (onChange) onChange({ ...event, value: !value });
    };

    return (
      // @ts-ignore
      <Trigger
        {...props}
        ref={ref}
        onClick={handleClick}
        selected={value !== false}
      >
        {value === true && <CheckIcon />}
        {value === null && <DashIcon />}
      </Trigger>
    );
  },
);
