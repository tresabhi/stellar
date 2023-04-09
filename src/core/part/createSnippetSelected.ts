import useBlueprint from 'stores/blueprint';
import createSnippet from './createSnippet';

export default function createSnippetSelected(
  blueprint = useBlueprint.getState(),
) {
  if (blueprint.selections.length > 0) {
    createSnippet(blueprint.selections, blueprint);
  }
}
