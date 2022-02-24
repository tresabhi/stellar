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
    if (initialState)
      blueprintStore.subscribe(
        (state) => getPartByAddress(address, state) as T | undefined,
        (state) => {
          if (state) {
            handlers.forEach((handler) => handler(state));
          }
        },
      );
  });
};
export default usePartUpdate;
