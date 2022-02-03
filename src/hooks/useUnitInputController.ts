import nerdamer from 'nerdamer';
import { useLayoutEffect, useRef } from 'react';

const MIXED_SYMBOL = '~';

interface UseUnitInputControllerOptions {
  mixed: boolean;
  prefix: string;
  suffix: string;
  min: number;
  max: number;
  modOnClamp: boolean;
}

export default function useUnitInputController(
  initialValue: number,
  options?: Partial<UseUnitInputControllerOptions>,
  onValueAccepted?: (newValue: number, oldValue: number) => void,
) {
  const inputRef = useRef<HTMLInputElement>(null);

  let value = useRef(initialValue);
  let isMixed = useRef(options?.mixed ?? false);

  const hook = {
    ref: inputRef,

    write: () => {
      inputRef.current!.value = isMixed.current
        ? MIXED_SYMBOL
        : `${options?.prefix ?? ''}${value.current}${options?.suffix ?? ''}`;
    },
  };

  useLayoutEffect(() => {
    hook.write();

    inputRef.current?.addEventListener('focus', () => {
      inputRef.current!.value = isMixed.current ? '' : `${value.current}`;
    });

    inputRef.current?.addEventListener('blur', () => {
      let newValue = Number(
        nerdamer(inputRef.current!.value).evaluate().toString(),
      );

      if (typeof newValue === 'number' && value.current !== newValue) {
        if (options?.min !== undefined)
          newValue = Math.max(options.min, newValue);
        if (options?.max !== undefined) {
          if (options.modOnClamp !== undefined) {
            newValue = newValue % options.max;
          } else {
            newValue = Math.min(options.max, newValue);
          }
        }

        if (onValueAccepted) onValueAccepted(newValue, value.current);
        value.current = newValue;
        isMixed.current = false;
      }

      hook.write();
    });

    inputRef.current?.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') inputRef.current?.blur();
    });
  });

  return hook;
}
