import { GroupProps } from '@react-three/fiber';
import { getPart, getPartRegistry } from 'core/part';
import { Group as GroupPart } from 'game/parts/Group';
import { forwardRef } from 'react';
import useBlueprint from 'stores/blueprint';
import { Group } from 'three';
import { ParentId } from 'types/Parts';

export interface PartClusterProps extends GroupProps {
  parentId: ParentId;
}

const PartCluster = forwardRef<Group, PartClusterProps>(
  ({ parentId, ...props }, ref) => {
    const partOrder = useBlueprint(
      (state) => (parentId ? (state.parts[parentId] as GroupPart) : state).part_order,
    );
    const partListing: JSX.Element[] = [];

    partOrder.forEach((Id) => {
      const part = getPart(Id);
      const LayoutComponent = getPartRegistry(part.n)?.Mesh;

      if (LayoutComponent) {
        partListing.push(<LayoutComponent id={Id} key={`part-${Id}`} />);
      }
    });

    return (
      <group {...props} ref={ref}>
        {partListing}
      </group>
    );
  },
);
export default PartCluster;
