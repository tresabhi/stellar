import { Part } from 'game/parts/Part';
import useBlueprint from 'stores/useBlueprint';
import { getPart } from './getPart';

interface SubscribeToPartOptions {
  fireInitially: boolean;
}
const subscribeToPartDefaultOptions = {
  fireInitially: false,
};
export const subscribeToPart = <Type extends Part, Slice>(
  id: string,
  handler: (slice: Slice) => void,
  slicer?: (part: Type) => Slice,
  options?: Partial<SubscribeToPartOptions>,
) => {
  const mergedOptions = {
    ...subscribeToPartDefaultOptions,
    ...(options ?? {}),
  };
  let avoidThisEvent = false;

  const unsubscribe = useBlueprint.subscribe(
    (draft) => {
      const part = getPart<Type>(id, draft);

      if (part) {
        if (slicer) {
          return slicer(part);
        } else {
          return part as unknown as Slice;
        }
      } else {
        avoidThisEvent = true;
        unsubscribe();
      }
    },
    (slice) => {
      if (!avoidThisEvent && slice) handler(slice);
    },
  );

  if (mergedOptions.fireInitially) {
    const part = getPart(id);

    if (part) {
      if (slicer) {
        handler(slicer(part as Type));
      } else {
        handler(part as Slice);
      }
    }
  }

  return unsubscribe;
};
