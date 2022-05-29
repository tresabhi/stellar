import useApp from 'hooks/useApp';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import { COOLDOWN } from '../constants/cooldown';
import { computeSelectionBound } from './computeSelectionBound';

const callback = fallingEdgeDebounce(() => {
  if (!useApp.getState().canBoundsBeUpdated) {
    useApp.setState({ canBoundsBeUpdated: true });
  }

  computeSelectionBound();
}, COOLDOWN);

export const requestComputeSelectionBound = () => {
  if (useApp.getState().canBoundsBeUpdated) {
    useApp.setState({ canBoundsBeUpdated: false });
  }

  callback();
};
