import { subscribeToPart } from 'core/part';
import { Part } from 'game/parts/Part';
import { useEffect } from 'react';

const usePartProperty = <Type extends Part, Slice>(
  id: string,
  slicer: (state: Type) => Slice,
  handler: (slice: Slice) => void,
) => {
  useEffect(() => {
    const unsubscribe = subscribeToPart(
      id,
      handler,
      (part) => slicer(part as Type),
      { fireInitially: true },
    );

    return () => unsubscribe();
  }, [id, handler, slicer]);
};
export default usePartProperty;
