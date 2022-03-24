import { GroupProps } from '@react-three/fiber';
import GroupPart from 'classes/Blueprint/parts/Group';
import { getPart } from 'interfaces/blueprint';
import { getPartClass } from 'interfaces/part';
import { forwardRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Group } from 'three';
import { PartID } from 'types/Parts';
import comparePartOrders from 'utilities/comparePartOrders';

interface PartClusterProps extends GroupProps {
  parentID?: PartID;
}
const PartCluster = forwardRef<Group, PartClusterProps>(
  ({ parentID, ...props }, ref) => {
    const state = blueprintStore(
      (state) =>
        (parentID ? (getPart(parentID, state) as GroupPart) : state).partOrder,
      comparePartOrders, // TODO: do we event need to compare if it fires only on mutation?
    );
    let partListing: JSX.Element[] = [];

    state.forEach((ID) => {
      const part = getPart(ID);
      if (part) {
        const partModule = getPartClass(part.n);
        partListing.push(
          <partModule.LayoutComponent ID={ID} key={`part-${ID}`} />,
        );
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
