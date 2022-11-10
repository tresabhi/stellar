import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';

export const getParentId = (
  id: string,
  draft: Blueprint = useBlueprint.getState(),
) => draft.parts.get(id)?.parentId;
