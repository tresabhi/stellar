import { AdaptiveDpr, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import DesktopCanvasControls from 'components/DesktopCanvasControls';
import PartSelectionControls from 'components/PartSelectionControls';
import { useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import settingsStore from 'stores/settings';
import Grid from './components/Grid';
import Parts from './components/Parts';
import styles from './index.module.scss';

export enum LAYER {
  GRID,
  ALWAYS_ON_BOTTOM_PART,
  PART,
  ALWAYS_ON_TOP_PART,
  TOOL,
}

export const LayoutRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const regressAmount = settingsStore(
    (state) => state.performance.regress_amount,
  );
  const allAxisControls = settingsStore((state) => state.debug.orbit_controls);
  const initialState = blueprintStore.getState();

  return (
    <Canvas
      ref={canvasRef}
      orthographic
      camera={{
        zoom: 16,
        position: [initialState.center, 0, 100],
        rotation: [0, 0, 0],
      }}
      className={styles['editing-canvas']}
      performance={{ min: regressAmount }}
    >
      {regressAmount > 0 ? <AdaptiveDpr pixelated /> : undefined}
      <directionalLight position={[0, 0, 100]} />
      <ambientLight intensity={0.5} />
      {allAxisControls ? <OrbitControls /> : <DesktopCanvasControls />}
      <PartSelectionControls />

      <Grid />
      <Parts />
    </Canvas>
  );
};
