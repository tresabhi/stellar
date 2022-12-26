import useBlueprint from 'stores/blueprint';
import panTo from './panTo';

// TODO: get bounds for all selections and then figure out camera zoom and position
export default function panToSelected() {
  const lastSelection = useBlueprint.getState().selections[0];
  if (lastSelection) panTo(lastSelection);
}
