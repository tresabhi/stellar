import { AdaptiveDpr, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import DesktopCanvasControls from 'components/DesktopCanvasControls';
import InfiniteGridHelper from 'components/InfiniteGridHelper';
import { getPart } from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
import { unselectAllParts } from 'interfaces/selection';
import { useEffect, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import settingsStore from 'stores/settings';
import { Color, GridHelper, Group, Mesh } from 'three';
import compareIDArrays from 'utilities/compareIDArrays';
import styles from './index.module.scss';

const MAJOR_MARK = 5;

export const LayoutRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const infiniteGridRef = useRef<Mesh>(null!);
  const gridRef = useRef<GridHelper>(null!);
  const regressAmount = settingsStore(
    (state) => state.performance.regress_amount,
  );
  const allAxisControls = settingsStore((state) => state.debug.orbit_controls);
  const initialState = blueprintStore.getState();
  const tempRef = useRef<Group>(null);
  const state = blueprintStore((state) => state.partOrder, compareIDArrays);
  let partMeshes: JSX.Element[] = [];

  state.forEach((ID) => {
    const part = getPart(ID);
    if (part) {
      const partModule = getPartModule(part.n);
      if (partModule) {
        partMeshes.push(
          <partModule.LayoutComponent key={`part-${ID}`} ID={ID} />,
        );
      }
    }
  });

  useEffect(() => {
    blueprintStore.subscribe(
      (state) => state.center,
      (value) => {
        gridRef.current.position.setX(value);
        infiniteGridRef.current.position.setX(value % MAJOR_MARK);
      },
    );
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      mode="concurrent"
      orthographic
      camera={{
        zoom: 16,
        position: [initialState.center, 0, 100],
        rotation: [0, 0, 0],
      }}
      className={styles['editing-canvas']}
      performance={{ min: regressAmount }}
      onPointerMissed={unselectAllParts}
    >
      {regressAmount > 0 ? <AdaptiveDpr pixelated /> : undefined}
      <directionalLight position={[0, 0, 100]} />
      <ambientLight intensity={0.5} />

      {allAxisControls ? <OrbitControls /> : <DesktopCanvasControls />}

      <gridHelper
        ref={gridRef}
        position={[initialState.center, 0, -100]}
        args={[1e10, 2, '#9952E0']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <InfiniteGridHelper
        ref={infiniteGridRef}
        position={[initialState.center % MAJOR_MARK, 0, -101]}
        axes="xyz"
        size1={1}
        size2={MAJOR_MARK}
        distance={1e3}
        color={new Color('#52527A')}
      />

      <group
        ref={tempRef}
        position={[initialState.offset.x, initialState.offset.y, 0]}
      >
        {partMeshes}
      </group>
    </Canvas>
  );
};
