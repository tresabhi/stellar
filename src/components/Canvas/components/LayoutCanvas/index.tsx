import { AdaptiveDpr } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { unselectAllParts } from 'core/part';
import { useEffect, useRef } from 'react';
import useApp, { TOOL } from 'stores/useApp';
import useBlueprint from 'stores/useBlueprint';
import useSettings from 'stores/useSettings';
import { Group } from 'three';
import styles from '../../index.module.scss';
import { PanControls } from '../PanControls';
import { Grid } from './components/Grid';
import { PartBounds } from './components/PartBounds';
import { Parts } from './components/Parts';

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
    const { selections } = useBlueprint.getState();
    if (selections.length > 0 && tool === TOOL.MOVE && !isPanning) {
      unselectAllParts();
    }
  };

  useEffect(() => {
    const unsubscribeTool = useApp.subscribe(
      (state) => state.tool,
      (tool) => {
        if (tool === TOOL.PAN) {
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
        } else if (useApp.getState().tool !== TOOL.PAN) {
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
        zoom: 32,
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
      <PartBounds />

      <Parts ref={parts} />
    </Canvas>
  );
};
export * from './components/Grid';
export * from './components/PartBounds';
export * from './components/Parts';
