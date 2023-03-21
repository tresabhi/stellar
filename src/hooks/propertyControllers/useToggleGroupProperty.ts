import { ToggleGroupSingleProps } from 'components/ToggleGroup';
import mutateParts from 'core/part/mutateParts';
import { Part } from 'game/parts/Part';
import { useEffect, useMemo, useState } from 'react';
import useBlueprint from 'stores/blueprint';

export default function useToggleGroupProperty<
  Type extends Part,
  Slice extends string,
>(
  ids: string[],
  slice: (state: Type) => Slice,
  mutate: (draft: Type, value: Slice) => void,
) {
  const { parts } = useBlueprint.getState();
  const mutualValue = slice(parts[ids[0]] as Type);
  const indeterminate = useMemo(
    () => ids.some((id) => slice(parts[id] as Type) !== mutualValue),
    [ids, mutualValue, parts, slice],
  );
  const [state, setState] = useState(mutualValue);

  useEffect(() => {
    setState(mutualValue);
  }, [mutualValue]);

  const hook: ToggleGroupSingleProps = {
    type: 'single',
    value: indeterminate ? undefined : state,
    onValueChange(newValue: Slice) {
      mutateParts<Type>(ids, (draft) => {
        mutate(draft, newValue);
        setState(newValue);
      });
    },
  };

  return hook;
}
