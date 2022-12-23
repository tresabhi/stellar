import { Blueprint } from 'game/Blueprint';
import renameParts, {
  renamePartsDefaultOptions,
  RenamePartsOptions,
} from './renameParts';

export default function renamePart(
  id: string,
  name: string,
  options: RenamePartsOptions = renamePartsDefaultOptions,
  blueprint?: Blueprint,
) {
  renameParts([id], name, options, blueprint);
}
