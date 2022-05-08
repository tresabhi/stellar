import { AdaptiveDpr } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import blueprintStore from 'hooks/useBlueprint';
import useSettings from 'hooks/useSettings';
import { useRef } from 'react';
import styles from '../index.module.scss';
import { Grid } from './Grid';
import { LayoutParts } from './LayoutParts';
import { PanControls } from './PanControls';
import { SelectionBoxes } from './SelectionBoxes';
import { SelectionControls } from './SelectionControls';

export const LayoutCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const regressAmount = useSettings(
    (state) => state.performance.regress_amount,
  );
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

      <PanControls />
      <SelectionControls />

      <Grid />
      <LayoutParts />
      <SelectionBoxes />
    </Canvas>
  );
};
