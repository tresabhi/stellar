import { Part } from 'game/parts/Part';
import useBlueprint from 'hooks/useBlueprint';
import { getPart } from './getPart';

interface SubscribeToPartOptions {
  fireInitially: boolean;
}
const subscribeToPartDefaultOptions = {
  fireInitially: false,
};
export const subscribeToPart = <Type extends Part, Slice extends any>(
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
    (state) => {
      const part = getPart(id, state);

      if (part) {
        if (slicer) {
          return slicer(part as Type);
        } else {
          return part as Slice;
        }
      } else {
        avoidThisEvent = true;
        unsubscribe();
      }
    },
    (slice) => {
      if (!avoidThisEvent) handler(slice!);
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
