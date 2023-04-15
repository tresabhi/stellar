import useBlueprint from 'stores/blueprint';
import createSnippet from './createSnippet';

export default function createSnippetSelected(
  blueprint = useBlueprint.getState(),
) {
  if (blueprint.part_selections.length > 0) {
    createSnippet(blueprint.part_selections, blueprint);
  }
}
