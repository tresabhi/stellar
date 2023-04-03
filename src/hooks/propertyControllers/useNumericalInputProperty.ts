import { InputProps, InputRef } from 'components/Properties';
import mutateParts from 'core/part/mutateParts';
import subscribeToPart from 'core/part/subscribeToPart';
import { Part } from 'game/parts/Part';
import { ChangeEvent, Ref, useEffect, useRef } from 'react';
import evaluateExpression from 'utilities/evaluateExpression';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import fixFloatRounding from 'utilities/fixFloatRounding';
import getMutualProperty from 'utilities/getMutualProperty';
import { RERENDER_DEBOUNCE } from './useSliderProperty';

export const MIXED_VALUE_PLACEHOLDER = '~';

export default function useNumericalInputProperty<
  Type extends Part,
  Value extends number = number,
>(
  ids: string[],
  slice: (state: Type) => Value,
  mutate: (draft: Type, newValue: Value, lastValue?: Value) => Value | void,
) {
  const input = useRef<InputRef>(null);
  // eslint-disable-next-line prefer-const
  let { mixed, value } = getMutualProperty<Type, Value>(ids, slice);

  const setInputValue = (newMixed: boolean, newValue: number) => {
    if (input.current) {
      input.current.value = `${
        newMixed ? MIXED_VALUE_PLACEHOLDER : fixFloatRounding(newValue)
      }`;
      input.current.resize();
    }
  };
  const commit = (newValue: Value, lastValue?: Value) => {
    mutateParts<Type>(ids, (draft) => {
      const returnValue = mutate(draft, newValue, lastValue);

      if (returnValue !== undefined) {
        value = returnValue;
        setInputValue(false, value);
      }
    });
  };
  const recomputeAndRerender = fallingEdgeDebounce(() => {
    const mutual = getMutualProperty(ids, slice);
    setInputValue(mutual.mixed, mutual.value);
  }, RERENDER_DEBOUNCE);

  const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const evaluated = evaluateExpression(event.target.value) as Value;

    if (Number.isNaN(evaluated)) {
      setInputValue(false, value);
    } else {
      setInputValue(false, evaluated);
      commit(evaluated, value);
      value = evaluated;
    }
  };

  useEffect(() => {
    setInputValue(mixed, value);
  });

  useEffect(() => {
    const unsubscribes = ids.map((id) =>
      subscribeToPart(id, recomputeAndRerender, slice),
    );

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
}
