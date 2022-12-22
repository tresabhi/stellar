import { Part } from 'game/parts/Part';
import useBlueprint from 'stores/blueprint';
import { getPart } from './getPart';

export interface SubscribeToPartOptions<Slice> {
  fireInitially: boolean;
  equalityFn: (a: Slice, b: Slice) => boolean;
}
const subscribeToPartDefaultOptions: SubscribeToPartOptions<unknown> = {
  fireInitially: false,
  equalityFn: (a, b) => a === b,
};
export const subscribeToPart = <Type extends Part, Slice>(
  id: string,
  handler: (slice: Slice, prevSlice?: Slice) => void,
  slicer?: (part: Type) => Slice,
  options?: Partial<SubscribeToPartOptions<Slice>>,
) => {
  const mergedOptions = {
    ...subscribeToPartDefaultOptions,
    ...(options ?? {}),
  };
  let skipNextEvent = false;

  const unsubscribe = useBlueprint.subscribe<Slice | undefined>(
    (draft) => {
      const part = getPart<Type>(id, draft);

      if (part) {
        if (slicer) {
          return slicer(part);
        }
        return part as unknown as Slice;
      }
      skipNextEvent = true;
      unsubscribe();
    },
    (slice, prevSlice) => {
      if (!skipNextEvent && slice !== undefined) handler(slice, prevSlice);
    },
    {
      equalityFn: (a, b) => (a === undefined || b === undefined
        ? false
        : mergedOptions.equalityFn(a, b)),
    },
  );

  if (mergedOptions.fireInitially) {
    const part = getPart(id);

    if (slicer) {
      handler(slicer(part as Type));
    } else {
      handler(part as Slice);
    }
  }

  return unsubscribe;
};
