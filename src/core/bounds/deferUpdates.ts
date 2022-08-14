import useBounds from 'stores/useBounds';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';

/**
 * 1 extra millisecond to avoid rendering unnecessarily when arrow keys are
 * held down
 */
export const BOUND_UPDATES_DEFER_TIME = 501;

const allowUpdates = fallingEdgeDebounce(() => {
  useBounds.setState({
    deferUpdates: false,
  });
}, BOUND_UPDATES_DEFER_TIME);

export const deferUpdates = () => {
  useBounds.setState({
    deferUpdates: true,
  });
  allowUpdates();
};
