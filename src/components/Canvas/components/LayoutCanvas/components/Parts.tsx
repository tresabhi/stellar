import PartCluster, {
  PartClusterProps,
} from 'components/Canvas/components/PartCluster';
import HeadsUpDisplay from 'components/HeadsUpDisplay';
import { deferUpdates, translateAllBoundingBoxes } from 'core/bounds';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import useBlueprint from 'stores/useBlueprint';
import { Group } from 'three';
import { Layer } from '../../../constants/layer';

export type PartsProps = Omit<PartClusterProps, 'parentId'>;

export const Parts = forwardRef<Group, PartsProps>((props, ref) => {
  const initialState = useBlueprint.getState();
  const partsCluster = useRef<Group>(null);

  useEffect(() => {
    const unsubscribe = useBlueprint.subscribe(
      (state) => state.offset,
      (offset, previousOffset) => {
        const deltaX = offset.x - previousOffset.x;
        const deltaY = offset.y - previousOffset.y;

        partsCluster.current?.position.set(offset.x, offset.y, 0);

        translateAllBoundingBoxes(deltaX, deltaY);
        deferUpdates();
      },
    );

    return unsubscribe;
  }, [partsCluster]);

  useImperativeHandle(ref, () => partsCluster.current as Group);

  return (
    <HeadsUpDisplay priority={Layer.PartRenderBetween}>
      {/**
       * Temporary lighting solution for fuel tanks until we figure out the
       * texturing issue
       */}
      <directionalLight position={[0, 0, 100]} intensity={0.8} />
      <ambientLight intensity={0.2} />

      <PartCluster
        {...props}
        position={[initialState.offset.x, initialState.offset.y, 0]}
        ref={partsCluster}
        parentId={null}
      />
    </HeadsUpDisplay>
  );
});
