import { InputProps, InputRef } from 'components/Properties';
import { mutateParts, subscribeToPart } from 'core/part';
import { Part } from 'game/parts/Part';
import { ChangeEvent, Ref, useEffect, useRef } from 'react';
import { evaluateExpression } from 'utilities/evaluateExpression';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import { getMutualProperty } from 'utilities/getMutualProperty';
import { RERENDER_DEBOUNCE } from './useSliderProperty';

export const MIXED_VALUE_PLACEHOLDER = '~';

export const useNumericalInputProperty = <
  Type extends Part,
  Value extends number = number,
>(
  ids: string[],
  slice: (state: Type) => Value,
  mutate: (draft: Type, value: Value) => void,
) => {
  const input = useRef<InputRef>(null!);
  let value: Value | undefined = getMutualProperty(ids, slice);

  const setInputValue = (value?: number) => {
    input.current.value = `${value ?? MIXED_VALUE_PLACEHOLDER}`;
    input.current.resize();
  };
  const commit = (value: Value) => {
    mutateParts<Type>(ids, (draft) => {
      mutate(draft, value);
    });
  };
  const recomputeAndRerender = fallingEdgeDebounce(() => {
    value = getMutualProperty(ids, slice);
    setInputValue(value);
  }, RERENDER_DEBOUNCE);

  const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const evaluated = evaluateExpression(event.target.value) as Value;

    if (isNaN(evaluated)) {
      setInputValue(value);
    } else {
      setInputValue(evaluated);
      value = evaluated;
      commit(evaluated);
    }
  };

  useEffect(() => {
    setInputValue(value);
  });

  useEffect(() => {
    const unsubscribes = ids.map((id) => {
      return subscribeToPart(id, recomputeAndRerender, slice);
    });

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [ids, recomputeAndRerender, slice]);

  const hook: Partial<InputProps & { ref: Ref<InputRef> }> = {
    defaultValue: value,
    onBlur,
    ref: input,
  };

  return hook;
};
