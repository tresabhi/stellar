import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { getPartRegistry } from './getPartRegistry';

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

export default function renameParts(
  ids: string[],
  name: string,
  options: RenamePartsOptions = renamePartsDefaultOptions,
  blueprint?: Blueprint,
) {
  let newName = name;
  const mergedOptions = { ...renamePartsDefaultOptions, ...options };

  if (mergedOptions.trim) newName = newName.trim();

  if (blueprint) {
    ids.forEach((id, index) => {
      const part = blueprint.parts[id];
      const partRegistry = getPartRegistry(part.n);

      if (partRegistry && (mergedOptions.skipLocked ? !part.locked : true)) {
        part.label = `${
          newName.length === 0 ? partRegistry.data.label : newName
        } ${mergedOptions.suffix ? index + 1 : ''}`.trim();
      }
    });
  } else {
    mutateBlueprint((draft) => {
      renameParts(ids, newName, options, draft);
    });
  }
}
