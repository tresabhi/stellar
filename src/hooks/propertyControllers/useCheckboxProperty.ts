import { CheckboxRef } from 'components/Checkbox';
import { CheckboxProps } from 'components/Properties';
import { mutateParts, subscribeToPart } from 'core/part';
import { Part } from 'game/parts/Part';
import { Ref, useCallback, useEffect, useRef } from 'react';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import { getMutualProperty } from 'utilities/getMutualProperty';
import { COMMIT_DEBOUNCE } from './useSliderProperty';

export const useCheckboxProperty = <
  Type extends Part,
  Value extends boolean = boolean,
>(
  ids: string[],
  slice: (state: Type) => Value,
  mutate: (draft: Type, value: Value) => void,
) => {
  const checkbox = useRef<CheckboxRef>(null!);
  let value = useRef(getMutualProperty<Type, Value>(ids, slice));
  const firstRender = useRef(true);

  const commit = fallingEdgeDebounce((value: Value) => {
    mutateParts<Type>(ids, (draft) => {
      mutate(draft, value);
    });
  }, COMMIT_DEBOUNCE);
  const recomputeAndRerender = useCallback(() => {
    value.current = getMutualProperty<Type, Value>(ids, slice);

    if (value.current === undefined) {
      checkbox.current.setValue(false);
      checkbox.current.setIndeterminate(true);
    } else {
      checkbox.current.setValue(value.current);
      checkbox.current.setIndeterminate(false);
    }
  }, [ids, slice]);

  const onChange = ({ value: newValue }: { value: boolean }) => {
    value.current = newValue as Value;
    commit(newValue as Value);
  };

  useEffect(() => {
    const unsubscribes = ids.map((id) => {
      return subscribeToPart(id, recomputeAndRerender, slice);
    });

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [ids, recomputeAndRerender, slice]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      recomputeAndRerender();
    }
  });

  const hook: Partial<CheckboxProps & { ref: Ref<CheckboxRef> }> = {
    ref: checkbox,
    defaultValue: value.current,
    indeterminate: value === undefined,
    onChange,
  };

  return hook;
};
