import { subscribeToPart } from 'functions/part';
import { Part } from 'game/parts/Part';
import { useEffect } from 'react';
import { UUID } from 'types/Parts';

const usePartProperty = <Type extends Part, Slice extends any>(
  ID: UUID,
  slicer: (state: Type) => Slice,
  handler: (slice: Slice) => void,
) => {
  useEffect(() => {
    const unsubscribe = subscribeToPart(
      ID,
      handler,
      (part) => slicer(part as Type),
      {
        fireInitially: true,
      },
    );

    return () => unsubscribe();
  }, [ID, handler, slicer]);
};
export default usePartProperty;
