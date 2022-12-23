import {
  SliderWithInputProps,
  SliderWithInputRef,
} from 'components/Properties';
import { mutateParts, subscribeToPart } from 'core/part';
import { Part } from 'game/parts/Part';
import { Ref, useEffect, useRef } from 'react';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import getMutualProperty from 'utilities/getMutualProperty';

export const COMMIT_DEBOUNCE = 500;
export const RERENDER_DEBOUNCE = 500;

export default function useSliderProperty<
  Type extends Part,
  Value extends number = number,
>(
  ids: string[],
  slice: (state: Type) => Value,
  mutate: (draft: Type, value: Value) => void,
) {
  const slider = useRef<SliderWithInputRef>(null);
  let value = getMutualProperty<Type, Value>(ids, slice);
  const firstRender = useRef(true);

  const commit = fallingEdgeDebounce((newValue: Value) => {
    mutateParts<Type>(ids, (draft) => {
      mutate(draft, newValue);
    });
  }, COMMIT_DEBOUNCE);
  const recomputeAndRerender = () => {
    if (slider.current) {
      value = getMutualProperty<Type, Value>(ids, slice);

      if (value === undefined) {
        slider.current.setIndeterminate(true);
      } else {
        slider.current.setIndeterminate(false);
        slider.current.setValue(value);
      }
    }
  };
  const debouncedRecomputeAndRerender = fallingEdgeDebounce(
    recomputeAndRerender,
    RERENDER_DEBOUNCE,
  );

  const onValueChange = (newValue: number) => {
    value = newValue as Value;
    commit(newValue as Value);
  };

  useEffect(() => {
    const unsubscribes = ids.map((id) => subscribeToPart(id, debouncedRecomputeAndRerender, slice));

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [ids, debouncedRecomputeAndRerender, slice]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      recomputeAndRerender();
    }
  });

  const hook: Partial<SliderWithInputProps & { ref: Ref<SliderWithInputRef> }> = {
    ref: slider,
    defaultValue: value,
    indeterminate: value === undefined,
    onValueChange,
  };

  return hook;
}
