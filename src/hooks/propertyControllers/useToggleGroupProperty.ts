import { ToggleGroupSingleProps } from 'components/ToggleGroup';
import mutateParts from 'core/part/mutateParts';
import { Part } from 'game/parts/Part';
import { useEffect, useMemo, useReducer } from 'react';
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

  type Action = { type: 'SET_MUTUAL_VALUE'; value: Slice };

  function reducer(state: Slice | undefined, action: Action) {
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

  const hook: ToggleGroupSingleProps = {
    type: 'single',
    value: indeterminate ? undefined : state,
    onValueChange(newValue) {
      mutateParts<Type>(ids, (draft) => {
        mutate(draft, newValue as Slice);
        dispatch({ type: 'SET_MUTUAL_VALUE', value: newValue as Slice });
      });
    },
  };

  return hook;
}
