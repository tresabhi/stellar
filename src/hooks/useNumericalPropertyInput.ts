import { getPart, mutateParts, subscribeToPart } from 'core/part';
import { Part } from 'game/parts/Part';
import { simplify } from 'mathjs';
import { useEffect, useRef } from 'react';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';

const MIXED_VALUE_PLACEHOLDER = '~';
const DEBOUNCE = 500;

export const useNumericalPropertyInput = <
  Type extends Part,
  Value extends number = number,
>(
  ids: string[],
  slice: (state: Type) => Value,
  mutate: (draft: Type, value: Value) => void,
) => {
  let value = useRef<Value | null>(null);
  const input = useRef<HTMLInputElement>(null!);
  const compute = () => {
    const part = getPart<Type>(ids[0]);

    if (part) {
      const initialValue = slice(part);
      const mixed = ids.some((id) => {
        const part = getPart<Type>(id);

        if (part) {
          const value = slice(part);

          return initialValue !== value;
        } else {
          return false;
        }
      });

      value.current = mixed ? null : initialValue;
    } else {
      value.current = null;
    }
  };
  const render = () => {
    input.current.value =
      value.current === null ? MIXED_VALUE_PLACEHOLDER : `${value.current}`;
  };
  const debouncedComputeAndRender = fallingEdgeDebounce(() => {
    compute();
    render();
  }, DEBOUNCE);

  useEffect(() => {
    const currentInput = input.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        input.current.blur();
      }
    };
    const handleBlur = () => {
      let newValue = value.current;

      try {
        newValue = simplify(input.current.value).evaluate();
      } catch {}

      if (
        typeof newValue === 'number' &&
        newValue !== Infinity &&
        newValue !== -Infinity &&
        !isNaN(newValue)
      ) {
        value.current = newValue;
        render();
        mutateParts<Type>(ids, (draft) => {
          mutate(draft, newValue as Value);
        });
      } else {
        render();
      }
    };

    const unsubscribeToParts = ids.map((id) => {
      return subscribeToPart(id, debouncedComputeAndRender, slice);
    });

    input.current.addEventListener('keydown', handleKeyDown);
    input.current.addEventListener('blur', handleBlur);
    compute();
    render();

    return () => {
      currentInput.removeEventListener('keydown', handleKeyDown);
      currentInput.removeEventListener('blur', handleBlur);
      unsubscribeToParts.forEach((unsubscribeToPart) => unsubscribeToPart());
    };
  });

  return input;
};
