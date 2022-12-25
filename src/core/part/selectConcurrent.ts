import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';
import mutateParts from './mutateParts';

export default function selectConcurrent(
  ids: MethodIds,
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
      normalizeIds(ids),
      (draft) => {
        draft.selected = true;
        if (expandGroups && draft.n === 'Group') {
          (draft as Group).expanded = true;
        }
      },
      false,
      blueprint,
    );

    blueprint.selections = normalizeIds(ids);
  } else {
    mutateBlueprint((draft) => {
      selectConcurrent(ids, draft);
    });
  }
}
