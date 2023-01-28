import { CheckboxRef } from 'components/Checkbox';
import { CheckboxProps } from 'components/Properties';
import mutateParts from 'core/part/mutateParts';
import subscribeToPart from 'core/part/subscribeToPart';
import { Part } from 'game/parts/Part';
import { Ref, useCallback, useEffect, useRef } from 'react';
import getMutualProperty from 'utilities/getMutualProperty';

export default function useCheckboxProperty<
  Type extends Part,
  Value extends boolean = boolean,
>(
  ids: string[],
  slice: (state: Type) => Value,
  mutate: (draft: Type, value: Value) => void,
) {
  const checkbox = useRef<CheckboxRef>(null);
  const value = useRef(getMutualProperty<Type, Value>(ids, slice));
  const firstRender = useRef(true);

  const commit = (newValue: Value) => {
    mutateParts<Type>(ids, (draft) => {
      mutate(draft, newValue);
    });
  };
  const recomputeAndRerender = useCallback(() => {
    value.current = getMutualProperty<Type, Value>(ids, slice);

    if (value.current === undefined) {
      checkbox.current?.setValue(false);
      checkbox.current?.setIndeterminate(true);
    } else {
      checkbox.current?.setValue(value.current);
      checkbox.current?.setIndeterminate(false);
    }
  }, [ids, slice]);

  const onChange = (newValue: boolean) => {
    value.current = newValue as Value;
    checkbox.current?.setValue(newValue);
    checkbox.current?.setIndeterminate(false);
    commit(newValue as Value);
  };

  useEffect(() => {
    const unsubscribes = ids.map((id) =>
      subscribeToPart(id, recomputeAndRerender, slice),
    );

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
    indeterminate: value.current === undefined,
    onValueChange: onChange,
  };

  return hook;
}
