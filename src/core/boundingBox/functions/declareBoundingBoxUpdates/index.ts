import useApp from 'hooks/useApp';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import { COOLDOWN } from './constants/cooldown';

const debouncedReset = fallingEdgeDebounce(() => {
  useApp.setState({ areBoundingBoxesUpdating: false });
}, COOLDOWN);

export const declareBoundingBoxUpdates = () => {
  const { areBoundingBoxesUpdating } = useApp.getState();

  if (!areBoundingBoxesUpdating) {
    useApp.setState({ areBoundingBoxesUpdating: true });
  }

  debouncedReset();
};

export * from './constants/cooldown';
