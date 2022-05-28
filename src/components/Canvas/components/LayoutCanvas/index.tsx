import { AdaptiveDpr } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { unselectAllParts } from 'core/part';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import useSettings from 'hooks/useSettings';
import { useEffect, useRef } from 'react';
import { Group } from 'three';
import styles from '../../index.module.scss';
import { PanControls } from '../PanControls';
import { FullSelectionOutline } from './components/FullSelectionOutline';
import { Grid } from './components/Grid';
import { Parts } from './components/Parts';
import { SelectionBoxes } from './components/SelectionBoxes';

export const LayoutCanvas = () => {
  // TODO: all refs should not end with "ref"
  const canvas = useRef<HTMLCanvasElement>(null!);
  const parts = useRef<Group>(null!);
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
          canvas.current.classList.add(styles.pan);
        } else {
          canvas.current.classList.remove(styles.pan);
        }
      },
    );
    const unsubscribeIsPanning = useApp.subscribe(
      (state) => state.isPanning,
      (isPanning) => {
        if (isPanning) {
          canvas.current.classList.add(styles.pan);
        } else if (useApp.getState().tool !== 'pan') {
          canvas.current.classList.remove(styles.pan);
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
      ref={canvas}
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
      <Parts ref={parts} />
      <SelectionBoxes />

      <FullSelectionOutline />
    </Canvas>
  );
};

export * from './components/FullSelectionOutline';
export * from './components/Grid';
export * from './components/Parts';
