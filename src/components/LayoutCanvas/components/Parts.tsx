import HeadsUpDisplay from 'components/HeadsUpDisplay';
import PartCluster, { PartClusterProps } from 'components/PartCluster';
import {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import useBlueprint from 'stores/blueprint';
import { Group } from 'three';
import { Layer } from '..';

export type PartsProps = Omit<PartClusterProps, 'parentId'>;

const useOffset = (parts: RefObject<Group>) => {
  useEffect(() => {
    const unsubscribe = useBlueprint.subscribe(
      (state) => state.offset,
      (offset) => {
        parts.current?.position.set(offset.x, offset.y, 0);
      },
    );

    return unsubscribe;
  }, [parts]);
};

const Parts = forwardRef<Group, PartsProps>((props, ref) => {
  const initialState = useBlueprint.getState();
  const parts = useRef<Group>(null);

  useOffset(parts);
  useImperativeHandle(ref, () => parts.current as Group);

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
        ref={parts}
        parentId={null}
      />
    </HeadsUpDisplay>
  );
});
export default Parts;
