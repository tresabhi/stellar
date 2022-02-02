import { AdaptiveDpr, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import InfiniteGridHelper from 'components/InfiniteGridHelper';
import { getPartModule } from 'interfaces/part';
import { useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Color, MOUSE, TOUCH } from 'three';
import './index.scss';

export const LayoutRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialData = blueprintStore.getState();
  const parts = blueprintStore((state) => state.parts).map((part, index) => {
    const PartComponent = getPartModule(part.n, true).LayoutComponent;

    return <PartComponent key={`part-${index}`} address={[index]} />;
  });

  return (
    <Canvas
      ref={canvasRef}
      mode="concurrent"
      frameloop="demand"
      orthographic
      camera={{ zoom: 16, position: [-initialData.center, 0, 100] }}
      className="editing-canvas"
      performance={{ min: 0.75 }}
    >
      <directionalLight position={[-20, 20, 100]} />
      <ambientLight intensity={0.5} />

      <AdaptiveDpr pixelated />
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
        regress
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

      <group position={[initialData.offset.x, initialData.offset.y, 0]}>
        {parts}
      </group>
    </Canvas>
  );
};
