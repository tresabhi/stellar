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
    <PartCluster
      {...props}
      position={[initialState.offset.x, initialState.offset.y, 0]}
      ref={parts}
      parentId={null}
    />
  );
});
export default Parts;
