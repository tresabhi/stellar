import useBounds, { PrimitiveBound } from 'hooks/useBounds';

export interface SubscribePartBoundOptions {
  unmountOnDisposal: boolean;
}

export const subscribePartBoundDefaultOptions: SubscribePartBoundOptions = {
  unmountOnDisposal: true,
};

export const subscribePartBound = (
  id: string,
  callback: (bound: PrimitiveBound) => void,
  options: Partial<SubscribePartBoundOptions> = subscribePartBoundDefaultOptions,
) => {
  options = {
    ...subscribePartBoundDefaultOptions,
    ...options,
  };

  let unsubscribe: Function | undefined;

  unsubscribe = useBounds.subscribe(
    (state) => {
      let bound = state.parts.get(id);

      if (!bound && options.unmountOnDisposal && unsubscribe) unsubscribe();

      return bound;
    },
    (bound) => {
      if (bound) callback(bound);
    },
  );

  return unsubscribe;
};
