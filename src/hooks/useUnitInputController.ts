import { merge } from 'lodash';
import { simplify } from 'mathjs';
import { RefObject, useEffect, useRef } from 'react';

export const MIXED_SYMBOL = '~';

interface UseUnitInputControllerOptions {
  prefix: string;
  suffix: string;
  min: number;
  max: number;
  modOnClamp: boolean;
  onChange: (nextValue: number, prevValue?: number) => void;
}

const useUnitInputControllerDefaultOptions: UseUnitInputControllerOptions = {
  prefix: '',
  suffix: '',
  min: -Infinity,
  max: Infinity,
  modOnClamp: false,
  onChange: () => {},
};

const useUnitInputController = (
  input: RefObject<HTMLInputElement>,
  initialValue?: number,
  options?: Partial<UseUnitInputControllerOptions>,
) => {
  let parent = useRef<HTMLDivElement>();

  useEffect(() => {
    const inputRef = input;
    const mergedOptions = merge(
      {},
      useUnitInputControllerDefaultOptions,
      options,
    );
    let value = initialValue;

    const render = () => {
      if (value === undefined) {
        inputRef.current!.value = MIXED_SYMBOL;
      } else {
        inputRef.current!.value = `${mergedOptions?.prefix}${value}${mergedOptions?.suffix}`;
      }
    };

    const handleParentClick = () => {
      inputRef.current?.focus();
      inputRef.current?.select();
    };
    const handleFocus = () => {
      inputRef.current!.value = value === undefined ? '' : `${value}`;
    };
    const handleBlur = () => {
      let newValue: number;

      try {
        newValue = simplify(inputRef.current!.value).evaluate();
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
        mergedOptions!.onChange!(newValue, value);
        console.log('old', value);
        console.log('new', newValue);
        value = newValue;

        render();
      } else {
        render();
      }
    };
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape') {
        inputRef.current?.blur();
      }
    };

    parent.current = inputRef.current?.parentNode as HTMLDivElement;

    parent.current.addEventListener('click', handleParentClick);
    inputRef.current?.addEventListener('focus', handleFocus);
    inputRef.current?.addEventListener('blur', handleBlur);
    inputRef.current?.addEventListener('keypress', handleKeyPress);

    render();

    return () => {
      parent.current!.removeEventListener('click', handleParentClick);
      inputRef.current?.removeEventListener('focus', handleFocus);
      inputRef.current?.removeEventListener('blur', handleBlur);
      inputRef.current?.removeEventListener('keypress', handleKeyPress);
    };
  }, [initialValue, input, options]);
};
export default useUnitInputController;
