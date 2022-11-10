import useBlueprint from 'stores/blueprint';
import { panToPart } from '.';

export const panToPartBySelection = () => {
  const lastSelection = useBlueprint.getState().selections[0];

  if (lastSelection) panToPart(lastSelection);
};
