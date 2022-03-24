import { getPart, mutateParts, subscribeToPart } from 'interfaces/blueprint';
import { merge } from 'lodash';
import { useEffect, useRef } from 'react';
import DeepPartial from 'types/DeepPartial';
import { PartID, PartIDs } from 'types/Parts';
import useUnitInputController, {
  UseUnitInputControllerOptions,
} from './useUnitInputController';

const usePropertyController = <T>(
  IDs: PartIDs,
  get: (state: T) => number,
  set: (value: number) => DeepPartial<T>,
  controllerOptions?: Partial<UseUnitInputControllerOptions>,
) => {
  const mergedControllerOptions = {
    ...useUnitInputController,
    ...controllerOptions,
    onChange: (value) =>
      mutateParts(IDs, (draft) => {
        merge(draft, set(value));
      }),
  } as UseUnitInputControllerOptions;
  const inputRef = useRef<HTMLInputElement>(null!);
  const inputController = useUnitInputController(
    inputRef,
    undefined,
    mergedControllerOptions,
  );
  let unsubscribes: (() => void)[] = [];
  let values = new Map<PartID, number>();

  const initialize = () => {
    IDs.forEach((ID) => {
      const part = getPart(ID);

      if (part) {
        const property = get(part as unknown as T);
        values.set(ID, property);

        const unsubscribe = subscribeToPart(
          ID,
          (newValue) => update(ID, newValue),
          get,
        );

        unsubscribes.push(unsubscribe);
      }
    });

    computeAndRender();
  };
  const computeAndRender = () => {
    Array.from(values).some(([ID, value], index) => {
      if (index === 0) {
        inputController.value = value;
      } else {
        if (inputController.value !== value) {
          inputController.value = undefined;
          return true;
        }
      }

      return false;
    });

    inputController.rerender();
  };
  const update = (ID: PartID, value: number) => {
    values.set(ID, value);
    computeAndRender();
  };

  initialize();

  useEffect(() => () => {
    unsubscribes.forEach((unsubscription) => unsubscription());
  });

  return inputRef;
};
export default usePropertyController;
