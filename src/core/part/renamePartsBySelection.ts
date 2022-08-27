import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import {
  renameParts,
  renamePartsDefaultOptions,
  RenamePartsOptions,
} from './renameParts';

export const renamePartsBySelection = (
  name: string,
  options: RenamePartsOptions = renamePartsDefaultOptions,
  draft?: Blueprint,
) => {
  if (draft) {
    renameParts(draft.selections, name, options, draft);
  } else {
    mutateBlueprint((draft) => {
      renamePartsBySelection(name, options, draft);
    });
  }
};
