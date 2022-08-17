import PartCluster from 'components/Canvas/components/PartCluster';
import HeadsUpDisplay from 'components/HeadsUpDisplay';
import { deferUpdates, translateAllBoundingBoxes } from 'core/bounds';
import { forwardRef, MutableRefObject, useEffect } from 'react';
import useBlueprint from 'stores/useBlueprint';
import { Group } from 'three';
import { Layer } from '../../../constants/layer';

export const Parts = forwardRef<Group>((props, ref) => {
  const initialState = useBlueprint.getState();

  useEffect(() => {
    const unsubscribe = useBlueprint.subscribe(
      (state) => state.offset,
      (offset, previousOffset) => {
        const deltaX = offset.x - previousOffset.x;
        const deltaY = offset.y - previousOffset.y;

        (ref as MutableRefObject<Group>).current.position.set(
          offset.x,
          offset.y,
          0,
        );

        translateAllBoundingBoxes(deltaX, deltaY);
        deferUpdates();
      },
    );

    return unsubscribe;
  }, [ref]);

  return (
    <HeadsUpDisplay priority={Layer.PartRenderBetween}>
      {/**
       * Temporary lighting solution for fuel tanks before we figure out the
       * texturing issue
       */}
      <directionalLight position={[0, 0, 100]} intensity={0.8} />
      <ambientLight intensity={0.2} />

      <PartCluster
        position={[initialState.offset.x, initialState.offset.y, 0]}
        ref={ref}
        parentId={null}
      />
    </HeadsUpDisplay>
  );
});
