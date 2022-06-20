import useBounds from 'hooks/useBounds';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';

export const BOUND_UPDATES_DEFER_TIME = 750;

const allowBoundUpdates = fallingEdgeDebounce(() => {
  useBounds.setState({
    deferBoundUpdates: false,
  });
}, BOUND_UPDATES_DEFER_TIME);

export const deferBoundUpdates = () => {
  useBounds.setState({
    deferBoundUpdates: true,
  });
  allowBoundUpdates();
};
