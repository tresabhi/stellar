import { subscribeToPart, SubscribeToPartOptions } from 'core/part';
import { Part } from 'game/parts/Part';
import { useEffect } from 'react';
import useBlueprint from 'stores/blueprint';

const usePartProperty = <Type extends Part, Slice>(
  id: string,
  slicer: (state: Type) => Slice,
  handler: (slice: Slice, prevState: Slice) => void,
  options?: Partial<SubscribeToPartOptions<Slice>>,
) => {
  let lastState = slicer(useBlueprint.getState().parts[id] as Type);

  useEffect(() => {
    const unsubscribe = subscribeToPart(
      id,
      (slice: Slice) => {
        handler(slice, lastState);
        lastState = slicer(useBlueprint.getState().parts[id] as Type);
      },
      (part) => slicer(part as Type),
      { fireInitially: true, ...options },
    );

    return () => unsubscribe();
  }, [id, handler, slicer]);
};
export default usePartProperty;
