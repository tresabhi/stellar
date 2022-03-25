import { subscribeToPart } from 'interfaces/blueprint';
import { useEffect } from 'react';
import { AnyPart, PartID } from 'types/Parts';

const usePartProperty = <T extends AnyPart, S extends any>(
  ID: PartID,
  slicer: (state: T) => S,
  handler: (slice: S) => void,
) => {
  useEffect(() => {
    subscribeToPart(ID, handler, slicer, {
      fireInitially: true,
    });
  }, [ID, handler, slicer]);
};
export default usePartProperty;
