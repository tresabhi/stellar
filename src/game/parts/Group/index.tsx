import { TransformIcon as Icon } from '@radix-ui/react-icons';
import PartCluster from 'components/PartCluster';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getBoundsFromParts from 'core/bounds/getBoundsFromParts';
import exportifyPart from 'core/part/exportifyPart';
import getPart from 'core/part/getPart';
import removeMetaData from 'core/part/removeMetaData';
import PartCategory from 'hooks/constants/partCategory';
import usePartCanvasControls from 'hooks/usePartCanvasControls';
import usePartVisibility from 'hooks/usePartVisibility';
import { isArray } from 'lodash';
import { useEffect, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import { PartExportifier, PartRegistryItem } from 'stores/partRegistry';
import { PartComponentProps } from 'types/Parts';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import { Part, VanillaPart, partData } from '../Part';

export interface Group extends Part {
  readonly n: 'Group';
  expanded: boolean;
  part_order: string[];
}

export const groupData: Group = {
  ...partData,

  n: 'Group',
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

function LayoutComponent({ id }: PartComponentProps) {
  const group = useRef<THREE.Group>(null);
  const partOrder = useBlueprint(
    (state) => getPart<Group>(id, state).part_order,
  );
  const props = usePartCanvasControls(id);

  usePartVisibility(id, group);
  useBoundsUpdated(partOrder, () => {
    const { bounds } = getBoundsFromParts(partOrder);
    boundsStore[id] = { bounds, needsRecomputation: false };

    declareBoundsUpdated(id);
  });

  return <PartCluster {...props} ref={group} parentId={id} />;
}

export const groupExportify: PartExportifier<Group> = (part, blueprint) => {
  const exportedParts: VanillaPart[] = [];
  const partWithoutMetaData = removeMetaData(part) as Group;

  partWithoutMetaData.part_order.forEach((id) => {
    const childPart = blueprint.parts[id];

    if (childPart) {
      const exportedPart = exportifyPart(childPart, blueprint);

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

export default {
  category: PartCategory.Abstract,
  vanillaData: null,
  data: groupData,
  label: 'group',

  Icon,
  LayoutComponent,

  exportify: groupExportify,
} as PartRegistryItem<Group>;
