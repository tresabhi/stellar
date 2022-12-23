import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import mutateParts from './mutateParts';

export default function selectPartsOnly(
  ids: string[],
  blueprint?: Blueprint,
  expandGroups?: boolean,
) {
  if (blueprint) {
    mutateParts(
      blueprint.selections,
      (draft) => {
        draft.selected = false;
      },
      false,
      blueprint,
    );
    mutateParts(
      ids,
      (draft) => {
        draft.selected = true;
        if (expandGroups && draft.n === 'Group') {
          (draft as Group).expanded = true;
        }
      },
      false,
      blueprint,
    );

    blueprint.selections = ids;
  } else {
    mutateBlueprint((draft) => {
      selectPartsOnly(ids, draft);
    });
  }
}
