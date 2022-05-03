import InfiniteGridHelper from 'components/Canvas/components/InfiniteGridHelper';
import { useEffect, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Color, GridHelper, Mesh } from 'three';

const MAJOR_MARK = 5;

export const Grid = () => {
  const initialState = blueprintStore.getState();
  const infiniteGridRef = useRef<Mesh>(null);
  const gridRef = useRef<GridHelper>(null);

  useEffect(() => {
    const unsubscribe = blueprintStore.subscribe(
      (state) => state.center,
      (value) => {
        gridRef.current?.position.setX(value);
        infiniteGridRef.current?.position.setX(value % MAJOR_MARK);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <>
      <gridHelper
        ref={gridRef}
        position={[initialState.center, 0, 1]}
        args={[1e6, 2, 'hsl(270, 70%, 60%)']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <InfiniteGridHelper
        ref={infiniteGridRef}
        position={[initialState.center % MAJOR_MARK, 0, 0]}
        axes="xyz"
        size1={1}
        size2={MAJOR_MARK}
        distance={1e3}
        color={new Color('hsl(240, 20%, 65%)')}
      />
    </>
  );
};
