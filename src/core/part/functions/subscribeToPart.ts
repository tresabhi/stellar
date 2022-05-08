import { Part } from 'game/parts/Part';
import blueprintStore from 'hooks/useBlueprint';
import { UUID } from 'types/Parts';
import { getPart } from './getPart';

interface SubscribeToPartOptions {
  fireInitially: boolean;
}
const subscribeToPartDefaultOptions = {
  fireInitially: false,
};
export const subscribeToPart = <Type extends Part, Slice extends any>(
  ID: UUID,
  handler: (slice: Slice) => void,
  slicer?: (part: Type) => Slice,
  options?: Partial<SubscribeToPartOptions>,
) => {
  const mergedOptions = {
    ...subscribeToPartDefaultOptions,
    ...(options ?? {}),
  };
  let avoidThisEvent = false;

  const unsubscribe = blueprintStore.subscribe(
    (state) => {
      const part = getPart(ID, state);

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
    const part = getPart(ID);

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
