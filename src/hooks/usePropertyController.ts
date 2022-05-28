import { mutateBlueprint } from 'core/blueprint';
import { getPart, mutateParts, subscribeToPart } from 'core/part';
import { Part } from 'game/parts/Part';
import { merge } from 'lodash';
import { useEffect, useRef } from 'react';
import DeepPartial from 'types/DeepPartial';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import useUnitInputController, {
  useUnitInputControllerDefaultOptions,
  UseUnitInputControllerOptions
} from './useUnitInputController';

const DEBOUNCE_TIME = 250;

export interface UsePropertyControllerOptions
  extends UseUnitInputControllerOptions {}

export const usePropertyControllerDefaultOptions: UsePropertyControllerOptions =
  {
    ...useUnitInputControllerDefaultOptions,
  };

const usePropertyController = <Type extends Part>(
  ids: string[],
  get: (state: Type) => number,
  set: (value: number) => DeepPartial<Type>,
  options?: Partial<UsePropertyControllerOptions>,
) => {
  const mergedControllerOptions = {
    ...usePropertyControllerDefaultOptions,
    ...options,
    onChange: (nextValue, prevValue) => {
      mutateBlueprint((draft) => {
        mutateParts(
          ids,
          (state) => {
            merge(state, set(nextValue));
          },
          draft,
        );
      });
      if (options?.onChange) {
        options.onChange(nextValue, prevValue);
      }
    },
  } as UseUnitInputControllerOptions;
  const inputRef = useRef<HTMLInputElement>(null!);
  const inputController = useUnitInputController(
    inputRef,
    undefined,
    mergedControllerOptions,
  );
  let unsubscribeFunctions: (() => void)[] = [];
  let values = new Map<string, number>();

  const initialize = () => {
    ids.forEach((id) => {
      const part = getPart(id);

      if (part) {
        const property = get(part as Type);
        values.set(id, property);

        const unsubscribe = subscribeToPart(
          id,
          (newValue) => update(id, newValue as number),
          (part) => get(part as Type),
        );

        unsubscribeFunctions.push(unsubscribe);
      }
    });

    rerender();
  };
  const rerender = () => {
    Array.from(values).some(([id, value], index) => {
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
  const debouncedRerender = fallingEdgeDebounce(rerender, DEBOUNCE_TIME);
  const update = (id: string, value: number) => {
    values.set(id, value);
    debouncedRerender();
  };

  initialize();

  useEffect(() => {
    return () => {
      unsubscribeFunctions.forEach((unsubscription) => unsubscription());
    };
  });

  return inputRef;
};
export default usePropertyController;
