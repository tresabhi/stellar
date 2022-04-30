import PartCluster from 'components/PartCluster';
import { useEffect, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Group } from 'three';
import { LAYER } from '..';

const Parts = () => {
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
      // TODO: This is a temporary way to get them to render in the right order
      position={[initialState.offset.x, initialState.offset.y, LAYER.PART]}
      ref={meshRef}
      onBeforeRender={(renderer) => renderer.clearDepth()}
      parentID={null}
    />
  );
};
export default Parts;
