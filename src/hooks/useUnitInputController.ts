import { isUndefined, merge } from 'lodash';
import { simplify } from 'mathjs';
import { RefObject, useEffect } from 'react';

const MIXED_SYMBOL = '~';

export interface UseUnitInputControllerOptions {
  prefix: string;
  suffix: string;
  min: number;
  max: number;
  modOnClamp: boolean;
  focusOnParentClick: boolean;
  onChange: (nextValue: number, prevValue?: number) => void;
}

export const useUnitInputControllerDefaultOptions: UseUnitInputControllerOptions =
  {
    prefix: '',
    suffix: '',
    min: -Infinity,
    max: Infinity,
    modOnClamp: false,
    focusOnParentClick: false,
    onChange: () => {},
  };

const useUnitInputController = (
  input: RefObject<HTMLInputElement>,
  initialValue?: number,
  options?: Partial<UseUnitInputControllerOptions>,
) => {
  const mergedOptions = merge(
    {},
    useUnitInputControllerDefaultOptions,
    options,
  );

  const rerender = () => {
    if (input.current) {
      if (hook.value === undefined) {
        input.current.value = MIXED_SYMBOL;
      } else {
        input.current.value = `${mergedOptions?.prefix}${hook.value}${mergedOptions?.suffix}`;
      }
    }
  };
  const handleClick = () => {
    input.current?.focus();
    input.current?.select();
  };
  const handleFocus = () => {
    input.current!.value = isUndefined(hook.value) ? '' : `${hook.value}`;
  };
  const handleBlur = () => {
    let newValue: number;

    try {
      newValue = simplify(input.current!.value).evaluate();
    } catch {}

    if (
      typeof newValue! === 'number' &&
      newValue! !== Infinity &&
      newValue! !== -Infinity &&
      !isNaN(newValue)
    ) {
      newValue = Math.max(
        mergedOptions!.min!,
        Math.min(mergedOptions!.max!, newValue),
      );
      mergedOptions!.onChange!(newValue, hook.value);
      hook.value = newValue;

      rerender();
    } else {
      rerender();
    }
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      input.current?.blur();
    }
  };

  const hook = {
    rerender,
    value: initialValue,
  };

  useEffect(() => {
    const currentInput = input.current;
    rerender();

    currentInput?.addEventListener('click', handleClick);
    currentInput?.addEventListener('focus', handleFocus);
    currentInput?.addEventListener('blur', handleBlur);
    currentInput?.addEventListener('keypress', handleKeyPress);

    return () => {
      currentInput?.removeEventListener('click', handleClick);
      currentInput?.removeEventListener('focus', handleFocus);
      currentInput?.removeEventListener('blur', handleBlur);
      currentInput?.removeEventListener('keypress', handleKeyPress);
    };
  });

  return hook;
};
export default useUnitInputController;
