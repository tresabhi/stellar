import subscribeToPart from 'core/part/subscribeToPart';
import { Part } from 'game/parts/Part';
import { useEffect, useState } from 'react';
import getMutualProperty from 'utilities/getMutualProperty';

export default function useMutualProperty<Type extends Part, Value>(
  ids: string[],
  slice: (state: Type) => Value,
) {
  const [, setState] = useState(false);

  useEffect(() => {
    const unsubscribes: (() => void)[] = [];

    ids.forEach((id) => {
      unsubscribes.push(
        subscribeToPart(id, () => setState((state) => !state), slice),
      );
    });

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  });

  return getMutualProperty(ids, slice);
}
