import { getPart, mutateParts, subscribeToPart } from 'core/part';
import { Part } from 'game/parts/Part';
import { merge } from 'lodash';
import { useEffect, useRef } from 'react';
import DeepPartial from 'types/DeepPartial';
import { UUID } from 'types/Parts';
import useUnitInputController, {
  UseUnitInputControllerOptions,
} from './useUnitInputController';

const usePropertyController = <Type extends Part>(
  IDs: UUID[],
  get: (state: Type) => number,
  set: (value: number) => DeepPartial<Type>,
  controllerOptions?: Partial<UseUnitInputControllerOptions>,
) => {
  const mergedControllerOptions = {
    ...useUnitInputController,
    ...controllerOptions,
    onChange: (value) => {
      mutateParts(IDs, (draft) => {
        merge(draft, set(value));
      });
    },
  } as UseUnitInputControllerOptions;
  const inputRef = useRef<HTMLInputElement>(null!);
  const inputController = useUnitInputController(
    inputRef,
    undefined,
    mergedControllerOptions,
  );
  let unsubscribes: (() => void)[] = [];
  let values = new Map<UUID, number>();

  const initialize = () => {
    IDs.forEach((ID) => {
      const part = getPart(ID);

      if (part) {
        const property = get(part as Type);
        values.set(ID, property);

        const unsubscribe = subscribeToPart(
          ID,
          (newValue) => update(ID, newValue as number),
          (part) => get(part as Type),
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
  const update = (ID: UUID, value: number) => {
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
