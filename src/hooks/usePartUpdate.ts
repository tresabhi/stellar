import { getPartByAddress } from 'interfaces/blueprint';
import { useEffect } from 'react';
import blueprintStore from 'stores/blueprint';
import { PartAddress } from 'types/Blueprint';

const usePartUpdate = <T>(
  address: PartAddress,
  initialState: T,
  ...handlers: ((state: T) => void)[]
) => {
  useEffect(() => {
    const handle = (state: T) => handlers.forEach((handler) => handler(state));

    handle(initialState);

    blueprintStore.subscribe(
      (state) => getPartByAddress(address, state) as T | undefined,
      (state) => {
        if (state) handle(state);
      },
    );
  }, [address, handlers, initialState]);
};
export default usePartUpdate;
