import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import InfiniteGridHelper from 'components/InfiniteGridHelper';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import getPart from 'core/functions/getPart';
import * as RootPart from 'core/parts/Root';
import { FC, useRef } from 'react';
import { Color, MOUSE, TOUCH } from 'three';
import './index.scss';

// TODO: Add more renderers for simulation, rendering, debugging, etc.
// TODO: Allow parts to pull state individually for efficiency

interface EditingCanvasProps {
  data: RootBlueprint.Type;
}
/**
 * Renders the blueprint in a close-to-vanilla fashion.
 */
const VanillaRenderer: FC<EditingCanvasProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const partsJsx: JSX.Element[] = [];

  const insertPartComponents = (
    parts: RootPart.AnyPartType[],
    keyDepth: string,
  ) => {
    parts.forEach((part, index) => {
      if (part.identity.visible) {
        if (part.n === 'Group') {
          insertPartComponents(part.parts, `${keyDepth}-${index}`);
        } else {
          const PartComponent = getPart(part.n).LayoutComponent;

          if (PartComponent)
            partsJsx.push(
              <PartComponent key={`part-${keyDepth}-${index}`} data={part} />,
            );
        }
      }
    });
  };

  insertPartComponents(data.parts, '');

  return (
    <Canvas
      ref={canvasRef}
      mode="concurrent"
      frameloop="demand"
      orthographic
      camera={{ zoom: 16, position: [-data.center, 0, 100] }}
      className="editing-canvas"
    >
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
      />
      <gridHelper
        position={[data.center, 0, -100]}
        args={[1e5, 2, '#9952E0']}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <InfiniteGridHelper
        position={[data.center, 0, -100]}
        axes="xyz"
        size1={1}
        size2={5}
        distance={1e3}
        color={new Color('#52527A')}
      />

      <group position={[data.offset.x, data.offset.y, 0]}>{partsJsx}</group>
    </Canvas>
  );
};

export default VanillaRenderer;
