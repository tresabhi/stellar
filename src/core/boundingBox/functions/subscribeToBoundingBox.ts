import useBoundingBoxes, { PrimitiveBox2 } from 'hooks/useBoundingBoxes';

export interface SubscribeToBoundingBoxOptions {
  unmountOnDisposal: boolean;
}

export const subscribeToBoundingBoxDefaultOptions: SubscribeToBoundingBoxOptions =
  {
    unmountOnDisposal: true,
  };

export const subscribeToBoundingBox = (
  id: string,
  callback: (boundingBox: PrimitiveBox2) => void,
  options: Partial<SubscribeToBoundingBoxOptions> = subscribeToBoundingBoxDefaultOptions,
) => {
  options = {
    ...subscribeToBoundingBoxDefaultOptions,
    ...options,
  };

  let unsubscribe = useBoundingBoxes.subscribe((state) => {
    let boundingBox = state.partBounds.get(id);

    if (!boundingBox && options.unmountOnDisposal) unsubscribe();

    return boundingBox!;
  }, callback);

  return unsubscribe;
};
