import { getPartByAddress, setPartsByAddresses } from 'interfaces/blueprint';
import { useRef } from 'react';
import { PartAddress } from 'types/Blueprint';
import DeepPartial from 'types/DeepPartial';
import getMutualSlice from 'utilities/getMutualSlice';
import useUnitInputController, {
  useUnitInputControllerDefaultOptions,
  UseUnitInputControllerOptions,
} from './useUnitInputController';

const usePropertyController = <S>(
  addresses: PartAddress[],
  get: (state: S) => number,
  set: (value: number) => DeepPartial<S>,
  controllerOptions?: Partial<UseUnitInputControllerOptions>,
) => {
  const mergedControllerOptions = {
    ...useUnitInputControllerDefaultOptions,
    ...controllerOptions,
  };

  const inputRef = useRef<HTMLInputElement>(null!);
  const { property } = getMutualSlice(
    (data) => {
      return {
        property: get(data),
      };
    },
    addresses.map((address) => getPartByAddress(address) as unknown as S),
  );

  useUnitInputController(inputRef, property, {
    ...controllerOptions,
    onChange: (value) => {
      setPartsByAddresses(addresses, set(value));
      mergedControllerOptions.onChange(value);
    },
  });

  return inputRef;
};
export default usePropertyController;
