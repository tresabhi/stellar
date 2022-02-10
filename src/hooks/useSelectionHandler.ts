import { ThreeEvent } from '@react-three/fiber';
import {
  selectPartOnly,
  selectPartsFromOnly,
  togglePartSelection,
} from 'interfaces/selection';
import { MouseEvent as ReactMouseEvent } from 'react';
import selectionStore from 'stores/selection';
import { PartAddress } from 'types/Blueprint';

const useSelectionHandler = (address: PartAddress) => {
  return (event: ReactMouseEvent<HTMLDivElement> | ThreeEvent<MouseEvent>) => {
    if (event.nativeEvent) {
      // part selection through canvas
      event = event as ThreeEvent<MouseEvent>;

      if (event.nativeEvent.shiftKey) {
        togglePartSelection(address);
      } else {
        selectPartOnly(address);
      }
    } else {
      // part selection through explorer
      event = event as ReactMouseEvent<HTMLDivElement>;

      if (event.ctrlKey) {
        if (event.shiftKey) {
          // ctrl + shift
          // selectPartsFrom();
        } else {
          // ctrl
          togglePartSelection(address);
        }
      } else if (event.shiftKey) {
        // shift
        const selectionState = selectionStore.getState();

        if (selectionState.lastSelection) {
          selectPartsFromOnly(selectionState.lastSelection, address);
        } else {
          selectPartOnly(address);
        }
      } else {
        // no modifier
        selectPartOnly(address);
      }
    }
  };
};
export default useSelectionHandler;
