import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';

export interface RenamePartsOptions {
  trim: boolean;
  skipLocked: boolean;
  suffix: boolean;
}

export const renamePartsDefaultOptions: RenamePartsOptions = {
  trim: true,
  skipLocked: true,
  suffix: true,
};

export const renameParts = (
  ids: string[],
  name: string,
  options: RenamePartsOptions = renamePartsDefaultOptions,
  draft?: Blueprint,
) => {
  const mergedOptions = { ...renamePartsDefaultOptions, ...options };

  if (mergedOptions.trim) name = name.trim();

  if (draft) {
    ids.forEach((id, index) => {
      const part = draft.parts.get(id);

      if (part && (mergedOptions.skipLocked ? !part.locked : true)) {
        part.label = `${name} ${mergedOptions.suffix ? index + 1 : ''}`.trim();
      }
    });
  } else {
    mutateBlueprint((draft) => {
      renameParts(ids, name, options, draft);
    });
  }
};
