import PartCluster from 'components/Canvas/components/PartCluster';
import { useEffect, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Group } from 'three';
import { LAYER } from '..';

export const LayoutParts = () => {
  const initialState = blueprintStore.getState();
  const meshRef = useRef<Group>(null);

  useEffect(() => {
    const unsubscribe = blueprintStore.subscribe(
      (state) => state.offset,
      (offset) => {
        meshRef.current?.position.setX(offset.x);
        meshRef.current?.position.setY(offset.y);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <PartCluster
      position={[initialState.offset.x, initialState.offset.y, LAYER.PART]}
      ref={meshRef}
      onBeforeRender={(renderer) => renderer.clearDepth()}
      parentID={null}
    />
  );
};
