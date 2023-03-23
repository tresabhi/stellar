import { CheckboxProps } from 'components/Checkbox';
import mutateParts from 'core/part/mutateParts';
import { Part } from 'game/parts/Part';
import { useEffect, useMemo, useReducer } from 'react';
import useBlueprint from 'stores/blueprint';

interface Action {
  type: 'SET_MUTUAL_VALUE';
  value: boolean;
}

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

  function reducer(state: boolean, action: Action) {
    switch (action.type) {
      case 'SET_MUTUAL_VALUE':
        return action.value;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, mutualValue);

  useEffect(() => {
    dispatch({ type: 'SET_MUTUAL_VALUE', value: mutualValue });
  }, [mutualValue]);

  const hook: CheckboxProps = {
    checked: indeterminate ? 'indeterminate' : state,
    onCheckedChange(newChecked) {
      mutateParts<Type>(ids, (draft) => {
        const normalizedCheck = Boolean(newChecked);
        mutate(draft, normalizedCheck);
        dispatch({ type: 'SET_MUTUAL_VALUE', value: normalizedCheck });
      });
    },
  };

  return hook;
}
