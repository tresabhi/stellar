import { TransformIcon as Icon } from '@radix-ui/react-icons';
import PartCluster from 'components/PartCluster';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getBoundsFromParts from 'core/bounds/getBoundsFromParts';
import exportifyPart from 'core/part/exportifyPart';
import getPart from 'core/part/getPart';
import removeMetaData from 'core/part/removeMetaData';
import PartCategory from 'hooks/constants/partCategory';
import usePartVisibility from 'hooks/usePartVisibility';
import { isArray } from 'lodash';
import { useEffect, useRef } from 'react';
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
  const group = useRef<THREE.Group>(null);
  const partOrder = useBlueprint(
    (state) => getPart<Group>(id, state).part_order,
  );

  usePartVisibility(id, group);
  useBoundsUpdated(partOrder, () => {
    const { bounds } = getBoundsFromParts(partOrder);
    boundsStore[id] = { bounds, needsRecomputation: false };

    declareBoundsUpdated(id);
  });

  return <PartCluster ref={group} parentId={id} />;
}

export const GroupIcon = Icon;

export const groupExportify: PartExportifier<Group> = (part, draft) => {
  const exportedParts: VanillaPart[] = [];
  const partWithoutMetaData = removeMetaData(part) as Group;

  partWithoutMetaData.part_order.forEach((id) => {
    const childPart = draft.parts[id];

    if (childPart) {
      const exportedPart = exportifyPart(childPart, draft);

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
