import { CheckboxProps } from 'components/Checkbox';
import mutateParts from 'core/part/mutateParts';
import { Part } from 'game/parts/Part';
import { useMemo, useRef, useState } from 'react';
import useBlueprint from 'stores/blueprint';

export default function useCheckboxProperty<Type extends Part>(
  ids: string[],
  slice: (state: Type) => boolean,
  mutate: (draft: Type, value: boolean) => void,
) {
  const { parts } = useBlueprint.getState();
  const mutualValue = slice(parts[ids[0]] as Type);
  const indeterminate = useMemo(
    () => ids.some((id) => slice(parts[id] as Type) !== mutualValue),
    [ids, mutualValue, parts, slice],
  );
  const [checked, setChecked] = useState(mutualValue);
  const firstRun = useRef(true);
  const resolvedChecked = firstRun.current ? mutualValue : checked;

  const hook: CheckboxProps = {
    checked: indeterminate ? 'indeterminate' : resolvedChecked,
    onCheckedChange(newChecked) {
      mutateParts<Type>(ids, (draft) => {
        const normalizedCheck = Boolean(newChecked);
        firstRun.current = false;
        mutate(draft, normalizedCheck);
        setChecked(normalizedCheck);
      });
    },
  };

  return hook;
}
