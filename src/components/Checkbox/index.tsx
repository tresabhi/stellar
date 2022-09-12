import { CheckIcon, DashIcon } from '@radix-ui/react-icons';
import { Button } from 'components/Button';
import {
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { styled, theme } from 'stitches.config';

export interface CheckboxProps
  extends Omit<
    Omit<
      Omit<InputHTMLAttributes<HTMLButtonElement>, 'defaultValue'>,
      'onChange'
    >,
    'value'
  > {
  value?: boolean;
  defaultValue?: boolean;
  indeterminate?: boolean;
  onChange?: (
    event: MouseEvent<HTMLButtonElement> & {
      value: boolean;
      indeterminate: boolean;
    },
  ) => void;
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
    const trigger = useRef<HTMLButtonElement>(null!);

    const trueValue = () => givenValue ?? value;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setValue((state) => !state);
      setIndeterminate(false);

      onClick && onClick(event);
      onChange && onChange({ ...event, value: !value, indeterminate: false });
    };

    // eslint-disable-next-line
    useEffect(() => {
      (trigger.current as CheckboxRef).setValue = setValue;
      (trigger.current as CheckboxRef).setIndeterminate = setIndeterminate;
    });
    useImperativeHandle(ref, () => trigger.current as CheckboxRef);

    return (
      // @ts-ignore
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
