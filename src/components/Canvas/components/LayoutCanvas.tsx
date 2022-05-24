import { AdaptiveDpr } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { unselectAllParts } from 'core/part';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import useSettings from 'hooks/useSettings';
import { useEffect, useRef } from 'react';
import styles from '../index.module.scss';
import { Grid } from './Grid';
import { LayoutParts } from './LayoutParts';
import { PanControls } from './PanControls';
import { SelectionBoxes } from './SelectionBoxes';

export const LayoutCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const regressAmount = useSettings(
    (state) => state.performance.regress_amount,
  );
  const initialBlueprintState = useBlueprint.getState();

  const handlePointerMissed = () => {
    const { tool, isPanning } = useApp.getState();
    if (tool === 'transform' && !isPanning) unselectAllParts();
  };

  useEffect(() => {
    const unsubscribeTool = useApp.subscribe(
      (state) => state.tool,
      (tool) => {
        if (tool === 'pan') {
          canvasRef.current.classList.add(styles.pan);
        } else {
          canvasRef.current.classList.remove(styles.pan);
        }
      },
    );
    const unsubscribeIsPanning = useApp.subscribe(
      (state) => state.isPanning,
      (isPanning) => {
        if (isPanning) {
          canvasRef.current.classList.add(styles.pan);
        } else if (useApp.getState().tool !== 'pan') {
          canvasRef.current.classList.remove(styles.pan);
        }
      },
    );

    return () => {
      unsubscribeTool();
      unsubscribeIsPanning();
    };
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
      onPointerMissed={handlePointerMissed}
    >
      {regressAmount > 0 ? <AdaptiveDpr pixelated /> : undefined}

      <PanControls />

      <Grid />
      <LayoutParts />
      <SelectionBoxes />
    </Canvas>
  );
};
