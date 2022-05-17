import { TransformIcon as Icon } from '@radix-ui/react-icons';
import PartCluster from 'components/Canvas/components/PartCluster';
import { getPart, partExportify, removePartMetaData } from 'core/part';
import { PartExportifier } from 'hooks/usePartRegistry';
import useSelection from 'hooks/useSelection';
import { isArray } from 'lodash';
import { FC } from 'react';
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
  const handleClick = useSelection(ID);

  return <PartCluster parentID={ID} onClick={handleClick} />;
};

export const GroupIcon = Icon;

export const groupExportify: PartExportifier<Group> = (part, context) => {
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
