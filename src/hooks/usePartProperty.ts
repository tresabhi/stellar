import { subscribeToPart } from 'interfaces/blueprint';
import { AnyPart } from 'interfaces/part';
import { useEffect } from 'react';
import { UUID } from 'types/Parts';

const usePartProperty = <Type extends AnyPart, Slice extends any>(
  ID: UUID,
  slicer: (state: Type) => Slice,
  handler: (slice: Slice) => void,
) => {
  useEffect(() => {
    subscribeToPart(ID, handler, (part) => slicer(part as Type), {
      fireInitially: true,
    });
  }, [ID, handler, slicer]);
};
export default usePartProperty;
