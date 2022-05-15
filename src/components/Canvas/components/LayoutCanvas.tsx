import { AdaptiveDpr } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import useSettings from 'hooks/useSettings';
import { useEffect, useRef } from 'react';
import styles from '../index.module.scss';
import { Grid } from './Grid';
import { LayoutParts } from './LayoutParts';
import { PanControls } from './PanControls';
import { SelectionBoxes } from './SelectionBoxes';
import { SelectionControls } from './SelectionControls';

export const LayoutCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const regressAmount = useSettings(
    (state) => state.performance.regress_amount,
  );
  const initialBlueprintState = useBlueprint.getState();

  useEffect(() => {
    useApp.subscribe(
      (state) => state.tool,
      (tool) => {
        if (tool === 'pan') {
          canvasRef.current.classList.add(styles.pan);
          console.log('pan');
        } else {
          canvasRef.current.classList.remove(styles.pan);
        }
      },
    );
  });

  return (
    <Canvas
      ref={canvasRef}
      orthographic
      camera={{
        zoom: 16,
        position: [initialBlueprintState.center, 0, 100],
        rotation: [0, 0, 0],
      }}
      className={styles['layout-canvas']}
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
