import { GroupIcon as Icon } from '@radix-ui/react-icons';
import PartCluster from 'components/Canvas/components/PartCluster';
import {
  partExportify,
  getPart,
  getPartRegistry,
  removePartMetaData,
} from 'core/part';
import { Blueprint } from 'game/Blueprint';
import { isArray } from 'lodash';
import { FC } from 'react';
import { BoundingBox } from 'stores/boundingBoxesCache';
import { BoundingBoxComputer } from 'stores/partRegistry';
import { AnyVanillaPart, PartComponentProps, UUID } from 'types/Parts';
import { Part, PartData } from './Part';

export interface Group extends Part {
  readonly n: 'Group';
  expanded: boolean;
  partOrder: UUID[];
}

export const GroupData: Group = {
  ...PartData,

  n: 'Group',
  label: 'Group',
  expanded: false,
  partOrder: [],
};

export const GroupLayoutComponent: FC<PartComponentProps> = ({ ID }) => {
  return <PartCluster parentID={ID} />;
};

export const GroupIcon = Icon;

export const GroupBoundingBoxComputer: BoundingBoxComputer<Group> = (state) => {
  let groupBoundingBox: BoundingBox;

  state.partOrder.forEach((ID, index) => {
    const part = getPart(ID);

    if (part) {
      const computeBoundingBox = getPartRegistry(part.n)?.computeBoundingBox;

      if (computeBoundingBox) {
        const boundingBox = computeBoundingBox(part);

        if (index === 1) {
          groupBoundingBox = boundingBox;
        } else {
          groupBoundingBox.min.x = Math.min(
            groupBoundingBox.min.x,
            boundingBox.min.x,
          );
          groupBoundingBox.min.y = Math.min(
            groupBoundingBox.min.y,
            boundingBox.min.y,
          );
          groupBoundingBox.max.x = Math.max(
            groupBoundingBox.max.x,
            boundingBox.max.x,
          );
          groupBoundingBox.max.y = Math.max(
            groupBoundingBox.max.y,
            boundingBox.max.y,
          );
        }
      }
    }
  });

  return groupBoundingBox!;
};

export const exportifyGroup = (part: Group, context: Blueprint) => {
  const exportedParts: AnyVanillaPart[] = [];
  const partWithoutMetaData = removePartMetaData(part) as Group;

  partWithoutMetaData.partOrder.forEach((ID) => {
    const childPart = getPart(ID, context);

    if (childPart) {
      const exportedPart = partExportify(childPart, context);

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
