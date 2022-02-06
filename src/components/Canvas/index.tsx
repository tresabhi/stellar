import { AdaptiveDpr, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import InfiniteGridHelper from 'components/InfiniteGridHelper';
import { getPartModule } from 'interfaces/part';
import { useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import settingsStore from 'stores/settings';
import { Color, Group, MOUSE, TOUCH } from 'three';
import styles from './index.module.scss';

export const LayoutRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const transformationMode = appStore((state) => state.transformationMode);
  const regressAmount = settingsStore(
    (state) => state.performance.regress_amount,
  );
  const initialData = blueprintStore.getState();
  const parts = blueprintStore((state) => state.parts).map((part, index) => {
    const PartComponent = getPartModule(part.n, true).LayoutComponent;

    return <PartComponent key={`part-${index}`} address={[index]} />;
  });
  const tempRef = useRef<Group>(null);

  // TODO: isolate JSX JSs with stores

  return (
    <Canvas
      ref={canvasRef}
      mode="concurrent"
      frameloop="demand"
      orthographic
      camera={{ zoom: 16, position: [-initialData.center, 0, 100] }}
      className={styles['editing-canvas']}
      performance={{ min: regressAmount }}
    >
      {regressAmount > 0 ? <AdaptiveDpr pixelated /> : undefined}
      <directionalLight position={[-20, 20, 100]} />
      <ambientLight intensity={0.5} />

      <OrbitControls
        maxZoom={1024}
        minZoom={2.2}
        mouseButtons={{
          LEFT: MOUSE.RIGHT,
          MIDDLE: MOUSE.MIDDLE,
          RIGHT: MOUSE.LEFT,
        }}
        touches={{
          ONE: TOUCH.PAN,
          TWO: TOUCH.DOLLY_PAN,
        }}
        enableRotate={false}
        enableDamping={false}
        regress={regressAmount > 0}
        makeDefault
      />

      <gridHelper
        position={[initialData.center, 0, -100]}
        args={[1e5, 2, '#9952E0']}
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

      {/* <TransformControls
        mode={transformationMode}
        space="local"
        showX={
          transformationMode === 'translate' || transformationMode === 'scale'
        }
        showY={
          transformationMode === 'translate' || transformationMode === 'scale'
        }
        showZ={
          transformationMode !== 'translate' && transformationMode !== 'scale'
        }
        translationSnap={1}
        rotationSnap={10 * (Math.PI / 180)}
        scaleSnap={1 / 8}
      /> */}
      <group
        ref={tempRef}
        position={[initialData.offset.x, initialData.offset.y, 0]}
      >
        {parts}
      </group>
    </Canvas>
  );
};
