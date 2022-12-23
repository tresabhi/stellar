import { TransformIcon as Icon } from '@radix-ui/react-icons';
import PartCluster from 'components/PartCluster';
import { declareBoundsUpdated, getBoundsFromParts } from 'core/bounds';
import { getPart, partExportify, removePartMetaData } from 'core/part';
import PartCategory from 'hooks/constants/partCategory';
import { isArray } from 'lodash';
import { useEffect } from 'react';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import { PartExportifier, PartRegistryItem } from 'stores/partRegistry';
import { PartComponentProps } from 'types/Parts';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import { Part, PartData, VanillaPart } from './Part';

export interface Group extends Part {
  readonly n: 'Group';
  expanded: boolean;
  part_order: string[];
}

export const GroupData: Group = {
  ...PartData,

  n: 'Group',
  label: 'Group',
  expanded: false,
  part_order: [],
};

const useBoundsUpdated = (ids: string[], callback: () => void) => {
  const debouncedCallback = fallingEdgeDebounce(callback, 0);

  useEffect(() => {
    callback();

    ids.forEach((id) => {
      window.addEventListener(`boundsupdated${id}`, debouncedCallback);
    });

    return () => {
      ids.forEach((id) => {
        window.removeEventListener(`boundsupdated${id}`, debouncedCallback);
      });
    };
  });
};

export function GroupLayoutComponent({ id }: PartComponentProps) {
  const partOrder = useBlueprint(
    (state) => getPart<Group>(id, state).part_order,
  );

  useBoundsUpdated(partOrder, () => {
    const { bounds } = getBoundsFromParts(partOrder);
    boundsStore[id] = { bounds, needsRecomputation: false };

    declareBoundsUpdated(id);
  });

  return <PartCluster parentId={id} />;
}

export const GroupIcon = Icon;

export const groupExportify: PartExportifier<Group> = (part, draft) => {
  const exportedParts: VanillaPart[] = [];
  const partWithoutMetaData = removePartMetaData(part) as Group;

  partWithoutMetaData.part_order.forEach((id) => {
    const childPart = draft.parts[id];

    if (childPart) {
      const exportedPart = partExportify(childPart, draft);

      if (exportedPart) {
        if (isArray(exportedPart)) {
          exportedParts.push(...exportedPart);
        } else {
          exportedParts.push(exportedPart);
        }
      }
    }
  });

  return exportedParts;
};

export const registry: PartRegistryItem<Group> = {
  category: PartCategory.Abstract,
  vanillaData: null,
  data: GroupData,

  Icon: GroupIcon,
  PropertyEditor: undefined,
  Mesh: GroupLayoutComponent,

  exportify: groupExportify,
};
