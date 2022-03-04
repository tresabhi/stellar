import { AdaptiveDpr, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import DesktopCanvasControls from 'components/DesktopCanvasControls';
import InfiniteGridHelper from 'components/InfiniteGridHelper';
import { getPartByID } from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
import { unselectAllParts } from 'interfaces/selection';
import { useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import settingsStore from 'stores/settings';
import { Color, Group } from 'three';
import compareIDArrays from 'utilities/compareIDArrays';
import styles from './index.module.scss';

export const LayoutRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const regressAmount = settingsStore(
    (state) => state.performance.regress_amount,
  );
  const allAxisControls = settingsStore(
    (state) => state.debug.enabled_orbit_controls,
  );
  const initialData = blueprintStore.getState();
  const tempRef = useRef<Group>(null);
  const state = blueprintStore((state) => state.partOrder, compareIDArrays);
  let partMeshes: JSX.Element[] = [];

  state.forEach((ID) => {
    const part = getPartByID(ID);
    if (part) {
      const partModule = getPartModule(part.n);
      if (partModule) {
        partMeshes.push(
          <partModule.LayoutComponent key={`part-${ID}`} ID={ID} />,
        );
      }
    }
  });

  return (
    <Canvas
      ref={canvasRef}
      mode="concurrent"
      orthographic
      camera={{ zoom: 16, position: [-initialData.center, 0, 100] }}
      className={styles['editing-canvas']}
      performance={{ min: regressAmount }}
      onPointerMissed={unselectAllParts}
    >
      {regressAmount > 0 ? <AdaptiveDpr pixelated /> : undefined}
      <directionalLight position={[0, 0, 100]} />
      <ambientLight intensity={0.5} />

      {allAxisControls ? <OrbitControls /> : <DesktopCanvasControls />}

      <gridHelper
        position={[initialData.center, 0, -99]}
        args={[1e4, 2, '#9952E0']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <InfiniteGridHelper
        position={[initialData.center, 0, -100]}
        axes="xyz"
        size1={1}
        size2={5}
        distance={1e3}
        color={new Color('#52527A')}
      />

      <group
        ref={tempRef}
        position={[initialData.offset.x, initialData.offset.y, 0]}
      >
        {partMeshes}
      </group>
    </Canvas>
  );
};
