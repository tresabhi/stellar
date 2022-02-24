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

type ListingEvent = ReactMouseEvent<HTMLDivElement>;
type MeshEvent = ThreeEvent<MouseEvent>;

function useSelectionHandler(address: PartAddress) {
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

  return (event: ListingEvent | MeshEvent) => {
    if (event.nativeEvent) {
      // mesh

      if (event.nativeEvent.shiftKey) {
        toggle();
      } else {
        only();
      }
    } else {
      // listing

      if ((event as ListingEvent).ctrlKey) {
        if ((event as ListingEvent).shiftKey) {
          fromLast();
        } else {
          toggle();
        }
      } else {
        if ((event as ListingEvent).shiftKey) {
          fromLastOnly();
        } else {
          only();
        }
      }
    }
  };
}

export default useSelectionHandler;
