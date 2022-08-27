import { Blueprint } from 'game/Blueprint';
import {
  renameParts,
  renamePartsDefaultOptions,
  RenamePartsOptions,
} from './renameParts';

export const renamePart = (
  id: string,
  name: string,
  options: RenamePartsOptions = renamePartsDefaultOptions,
  draft?: Blueprint,
) => {
  renameParts([id], name, options, draft);
};
