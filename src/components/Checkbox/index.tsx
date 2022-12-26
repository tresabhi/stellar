import { CheckIcon, DashIcon } from '@radix-ui/react-icons';
import Button from 'components/Button';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { styled, theme } from 'stitches.config';

export interface CheckboxProps
  extends Omit<
  ComponentPropsWithoutRef<typeof Trigger>,
  'value' | 'defaultValue' | 'onChange' | 'ref'
  > {
  value?: boolean;
  defaultValue?: boolean;
  indeterminate?: boolean;
  onChange?: (value: boolean) => void;
}

export interface CheckboxRef extends HTMLButtonElement {
  setValue: (newValue: boolean) => void;
  setIndeterminate: (newValue: boolean) => void;
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
    color: theme.colors.textHighContrast,
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

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  (
    {
      defaultValue = false,
      value: givenValue,
      indeterminate: givenIndeterminate = false,
      onChange,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState(defaultValue);
    const [indeterminate, setIndeterminate] = useState(givenIndeterminate);
    const trigger = useRef<HTMLButtonElement>(null);

    const trueValue = () => givenValue ?? value;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setValue((state) => !state);
      if (indeterminate) setIndeterminate(false);

      if (onClick) onClick(event);
      if (onChange) onChange(!value);
    };

    useEffect(() => {
      if (trigger.current) {
        (trigger.current as CheckboxRef).setValue = setValue;
        (trigger.current as CheckboxRef).setIndeterminate = setIndeterminate;
      }
    }, []);

    useImperativeHandle(ref, () => trigger.current as CheckboxRef);

    return (
      <Trigger
        {...props}
        ref={trigger}
        onClick={handleClick}
        selected={trueValue() || indeterminate}
      >
        {trueValue() && <CheckIcon />}
        {indeterminate && <DashIcon />}
      </Trigger>
    );
  },
);
