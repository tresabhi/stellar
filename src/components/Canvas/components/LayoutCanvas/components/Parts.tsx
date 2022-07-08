import PartCluster from 'components/Canvas/components/PartCluster';
import HeadsUpDisplay from 'components/HeadsUpDisplay';
import useBlueprint from 'hooks/useBlueprint';
import { forwardRef, MutableRefObject, useEffect } from 'react';
import { Group } from 'three';
import { LAYER } from '../../../constants/layer';

export const Parts = forwardRef<Group>((props, ref) => {
  const initialState = useBlueprint.getState();

  useEffect(() => {
    const unsubscribe = useBlueprint.subscribe(
      (state) => state.offset,
      (offset) => {
        console.log('oh yeah baby');

        (ref as MutableRefObject<Group>).current.position.set(
          offset.x,
          offset.y,
          0,
        );
      },
    );

    return unsubscribe;
  }, []);

  return (
    <HeadsUpDisplay priority={LAYER.PART}>
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
