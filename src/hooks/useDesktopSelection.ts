import { ThreeEvent } from '@react-three/fiber';
import {
  selectPartOnly,
  selectPartsFrom,
  selectPartsFromOnly,
  togglePartSelection,
} from 'interfaces/selection';
import { MouseEvent as ReactMouseEvent } from 'react';
import selectionStore from 'stores/selection';
import { PartAddress } from 'types/Blueprint';

export type UseSelectionHandlerType = 'listing' | 'mesh';

export type UseListingSelectionHandler = (
  event: ReactMouseEvent<HTMLDivElement>,
) => void;
export type UseMeshSelectionHandler = (event: ThreeEvent<MouseEvent>) => void;

function useSelectionHandler(
  address: PartAddress,
  type: UseSelectionHandlerType,
) {
  const toggle = () => togglePartSelection(address);
  const only = () => selectPartOnly(address);
  const fromLast = () => {
    const selectionState = selectionStore.getState();

    if (selectionState.lastSelection) {
      selectPartsFrom(selectionState.lastSelection, address);
    } else {
      only();
    }
  };
  const fromLastOnly = () => {
    const selectionState = selectionStore.getState();

    if (selectionState.lastSelection) {
      selectPartsFromOnly(selectionState.lastSelection, address);
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
}

export default useSelectionHandler;
