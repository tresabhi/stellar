import { GroupProps } from '@react-three/fiber';
import { getPart, getPartRegistry } from 'core/part';
import { Group as GroupPart } from 'game/parts/Group';
import useBlueprint from 'hooks/useBlueprint';
import { forwardRef } from 'react';
import { Group } from 'three';
import { ParentID } from 'types/Parts';
import compareStringArrays from 'utilities/compareStringArrays';

interface PartClusterProps extends GroupProps {
  parentID: ParentID;
}
const PartCluster = forwardRef<Group, PartClusterProps>(
  ({ parentID, ...props }, ref) => {
    const state = useBlueprint(
      (state) =>
        (parentID ? (getPart(parentID, state) as GroupPart) : state).partOrder,
      compareStringArrays,
    );
    let partListing: JSX.Element[] = [];

    state.forEach((ID) => {
      const part = getPart(ID);

      if (part) {
        const LayoutComponent = getPartRegistry(part.n)?.layoutComponent;

        if (LayoutComponent) {
          partListing.push(<LayoutComponent ID={ID} key={`part-${ID}`} />);
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
