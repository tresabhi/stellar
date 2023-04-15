import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import rename, {
  renamePartsDefaultOptions,
  RenamePartsOptions,
} from './rename';

export default function renameSelected(
  name: string,
  options: RenamePartsOptions = renamePartsDefaultOptions,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    rename(blueprint.part_selections, name, options, blueprint);
  } else {
    mutateBlueprint((draft) => {
      renameSelected(name, options, draft);
    });
  }
}
