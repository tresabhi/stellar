import useBlueprint from 'stores/useBlueprint';
import { panToPart } from '.';

export const panToPartBySelection = () => {
  const lastSelection = useBlueprint.getState().selections[0];

  if (lastSelection) panToPart(lastSelection);
};
