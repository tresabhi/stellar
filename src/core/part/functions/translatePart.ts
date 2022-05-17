import useBlueprint from 'hooks/useBlueprint';
import { UUID } from 'types/Parts';
import { translateParts } from './translateParts';

export const translatePart = (
  ID: UUID,
  x: number,
  y: number,
  state = useBlueprint.getState(),
) => {
  if (state) {
    translateParts([ID], x, y, state);
  } else {
    translatePart(ID, x, y, state);
  }
};
