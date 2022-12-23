import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import renameParts, {
  renamePartsDefaultOptions,
  RenamePartsOptions,
} from './renameParts';

export default function renamePartsBySelection(
  name: string,
  options: RenamePartsOptions = renamePartsDefaultOptions,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    renameParts(blueprint.selections, name, options, blueprint);
  } else {
    mutateBlueprint((draft) => {
      renamePartsBySelection(name, options, draft);
    });
  }
}
