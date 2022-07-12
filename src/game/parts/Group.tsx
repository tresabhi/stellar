import { TransformIcon as Icon } from '@radix-ui/react-icons';
import PartCluster from 'components/Canvas/components/PartCluster';
import { partExportify, removePartMetaData } from 'core/part';
import PART_CATEGORY from 'hooks/constants/partCategory';
import useDragControls from 'hooks/useDragControls';
import { PartExportifier, PartRegistryFragment } from 'hooks/usePartRegistry';
import usePartWithBounds from 'hooks/usePartWithBounds';
import useSelectionControl from 'hooks/useSelectionControl';
import { isArray } from 'lodash';
import { FC, useRef } from 'react';
import { Group as ThreeGroup } from 'three';
import { AnyVanillaPart, PartComponentProps } from 'types/Parts';
import { Part, PartData } from './Part';

export interface Group extends Part {
  readonly n: 'Group';
  expanded: boolean;
  partOrder: string[];
}

export const GroupData: Group = {
  ...PartData,

  n: 'Group',
  label: 'Group',
  expanded: false,
  partOrder: [],
};

export const GroupLayoutComponent: FC<PartComponentProps> = ({ id }) => {
  const group = useRef<ThreeGroup>(null!);
  const handleClick = useSelectionControl(id);
  const handlePointerDown = useDragControls(id);

  usePartWithBounds(id, group);

  return (
    <PartCluster
      ref={group}
      parentId={id}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
    />
  );
};

export const GroupIcon = Icon;

export const groupExportify: PartExportifier<Group> = (part, draft) => {
  const exportedParts: AnyVanillaPart[] = [];
  const partWithoutMetaData = removePartMetaData(part) as Group;

  partWithoutMetaData.partOrder.forEach((id) => {
    const childPart = draft.parts.get(id);

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

export const GroupRegistry: PartRegistryFragment = [
  'Group',
  {
    category: PART_CATEGORY.ABSTRACT,

    vanillaData: null,
    data: GroupData,

    Icon: GroupIcon,
    Mesh: GroupLayoutComponent,

    exportify: groupExportify,
  },
];
