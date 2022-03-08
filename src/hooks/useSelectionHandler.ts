import { ThreeEvent } from '@react-three/fiber';
import {
  selectPartOnly,
  selectPartsFrom,
  selectPartsFromOnly,
  togglePartSelection,
} from 'interfaces/selection';
import { MouseEvent as ReactMouseEvent } from 'react';
import blueprintStore from 'stores/blueprint';
import { PartID } from 'types/Parts';

export type UseSelectionHandlerType = 'listing' | 'mesh';

export type UseListingSelectionHandler = (
  event: ReactMouseEvent<HTMLDivElement>,
) => void;
export type UseMeshSelectionHandler = (event: ThreeEvent<MouseEvent>) => void;

// TODO: move this into the only component that uses it
const useSelectionHandler = (ID: PartID, type: UseSelectionHandlerType) => {
  const toggle = () => togglePartSelection(ID);
  const only = () => selectPartOnly(ID);
  const fromLast = () => {
    const selectionState = blueprintStore.getState().selections;

    if (selectionState.last) {
      selectPartsFrom(selectionState.last, ID);
    } else {
      only();
    }
  };
  const fromLastOnly = () => {
    const selectionState = blueprintStore.getState().selections;

    if (selectionState.last) {
      selectPartsFromOnly(selectionState.last, ID);
    } else {
      only();
    }
  };

  if (type === 'listing') {
    return (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.ctrlKey) {
        if (event.shiftKey) {
          fromLast();
        } else {
          toggle();
        }
      } else {
        if (event.shiftKey) {
          fromLastOnly();
        } else {
          only();
        }
      }
    };
  } else if (type === 'mesh') {
    return (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();

      if (event.nativeEvent.shiftKey) {
        toggle();
      } else {
        only();
      }
    };
  }
};

export default useSelectionHandler;
