import { mutateBlueprint } from 'core/blueprint';
import { getPart, mutateParts, subscribeToPart } from 'core/part';
import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { merge } from 'lodash';
import { useEffect, useRef } from 'react';
import DeepPartial from 'types/DeepPartial';
import { UUID } from 'types/Parts';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import useUnitInputController, {
  useUnitInputControllerDefaultOptions,
  UseUnitInputControllerOptions,
} from './useUnitInputController';

const DEBOUNCE_TIME = 250;

export interface UsePropertyControllerOptions
  extends UseUnitInputControllerOptions {
  onChangeDuringMutation: (
    nextState: number,
    prevState: number | undefined,
    state: Blueprint,
  ) => void;
  onChangeDuringPartMutation: (
    nextState: number,
    prevState: number | undefined,
    ID: UUID,
    state: Blueprint,
  ) => void;
}

export const usePropertyControllerDefaultOptions: UsePropertyControllerOptions =
  {
    ...useUnitInputControllerDefaultOptions,
    onChangeDuringMutation: () => {},
    onChangeDuringPartMutation: () => {},
  };

const usePropertyController = <Type extends Part>(
  IDs: UUID[],
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
          IDs,
          (state) => {
            if (options?.onChangeDuringPartMutation) {
              options.onChangeDuringPartMutation(
                nextValue,
                prevValue,
                state.ID,
                draft,
              );
            }
            merge(state, set(nextValue));
          },
          draft,
        );

        if (options?.onChangeDuringMutation) {
          options.onChangeDuringMutation(nextValue, prevValue, draft);
        }
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

        unsubscribeFunctions.push(unsubscribe);
      }
    });

    rerender();
  };
  const rerender = () => {
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
  const debouncedRerender = fallingEdgeDebounce(rerender, DEBOUNCE_TIME);
  const update = (ID: UUID, value: number) => {
    values.set(ID, value);
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
