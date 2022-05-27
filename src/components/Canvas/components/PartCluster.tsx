import { GroupProps } from '@react-three/fiber';
import { getPart, getPartRegistry } from 'core/part';
import { Group as GroupPart } from 'game/parts/Group';
import useBlueprint from 'hooks/useBlueprint';
import { forwardRef } from 'react';
import { Group } from 'three';
import { ParentId } from 'types/Parts';
import compareStringArrays from 'utilities/compareStringArrays';

interface PartClusterProps extends GroupProps {
  parentId: ParentId;
}
const PartCluster = forwardRef<Group, PartClusterProps>(
  ({ parentId, ...props }, ref) => {
    const state = useBlueprint(
      (state) =>
        (parentId ? (getPart(parentId, state) as GroupPart) : state).partOrder,
      compareStringArrays,
    );
    let partListing: JSX.Element[] = [];

    state.forEach((Id) => {
      const part = getPart(Id);

      if (part) {
        const LayoutComponent = getPartRegistry(part.n)?.layoutComponent;

        if (LayoutComponent) {
          partListing.push(<LayoutComponent id={Id} key={`part-${Id}`} />);
        }
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
