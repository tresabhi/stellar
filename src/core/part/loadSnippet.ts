import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { SnippetListing } from 'stores/snippets';
import clone from './clone';
import create from './create';
import getParent from './getParent';
import selectConcurrent from './selectConcurrent';

export default function loadSnippet(
  snippetListing: SnippetListing,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    const group = create('Group') as Group;
    group.label = snippetListing.label;

    blueprint.parts[group.id] = group;
    Object.keys(snippetListing.snippet.parts).forEach((id) => {
      const [clonedPartId, clonedParts] = clone(id, snippetListing.snippet);

      group.part_order.push(clonedPartId);
      Object.keys(clonedParts).forEach((clonedPartChildId) => {
        const clonedPart = clonedParts[clonedPartChildId];
        blueprint.parts[clonedPartChildId] = clonedPart;
      });
    });

    if (blueprint.selections.length === 0) {
      blueprint.part_order.push(group.id);
    } else {
      const parent = getParent(blueprint.selections[0], blueprint) ?? blueprint;
      const index = parent.part_order.indexOf(blueprint.selections[0]);

      parent.part_order.splice(index + 1, 0, group.id);
    }

    selectConcurrent(group.id, blueprint);
  } else {
    mutateBlueprint((draft) => {
      loadSnippet(snippetListing, draft);
    });
  }
}
