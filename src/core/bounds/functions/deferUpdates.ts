import useBounds from 'hooks/useBounds';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';

export const BOUND_UPDATES_DEFER_TIME = 750;

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
