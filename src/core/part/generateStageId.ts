import { Stage } from 'game/Blueprint';
import { nanoid } from 'nanoid';
import useBlueprint from 'stores/blueprint';
import { ID_LENGTH } from './generatePartId';

export default function generateStageId(stages?: Stage[]): string {
  if (stages) {
    let id = '';

    while (id.length === 0) {
      const possibleId = nanoid(ID_LENGTH);
      if (stages.every((stage) => stage.id !== possibleId)) id = possibleId;
    }

    return id;
  }
  return generateStageId(useBlueprint.getState().stages);
}
