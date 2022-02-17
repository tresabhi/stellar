import { merge } from 'lodash';
import { simplify } from 'mathjs';
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

const UseUnitInputControllerDefaultOptions: UseUnitInputControllerOptions = {
  mixed: false,
  prefix: '',
  suffix: '',
  min: -Infinity,
  max: Infinity,
  modOnClamp: false,
};

export default function useUnitInputController(
  initialValue: number,
  options?: Partial<UseUnitInputControllerOptions>,
  onValueAccepted?: (newValue: number, oldValue: number) => void,
) {
  const mergedOptions = merge(UseUnitInputControllerDefaultOptions, options);
  const inputRef = useRef<HTMLInputElement>(null);
  let parent = useRef<HTMLDivElement>();
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
    parent.current = inputRef.current!.parentNode as HTMLDivElement;

    parent.current.addEventListener('click', () => {
      inputRef.current!.value = isMixed.current ? '' : `${value.current}`;
      inputRef.current?.select();
    });

    inputRef.current?.addEventListener('blur', () => {
      try {
        let newValue = simplify(inputRef.current!.value).evaluate();

        if (newValue !== Infinity && !isNaN(newValue)) {
          if (mergedOptions.min !== undefined)
            newValue = Math.max(mergedOptions.min, newValue);
          if (mergedOptions.modOnClamp) {
            newValue = newValue % mergedOptions.max;
          } else {
            newValue = Math.min(mergedOptions.max, newValue);
          }

          if (onValueAccepted) onValueAccepted(newValue, value.current);
          value.current = newValue;
          isMixed.current = false;
        }
      } catch {}

      hook.write();
    });

    inputRef.current?.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') inputRef.current?.blur();
    });
  });

  return hook;
}
