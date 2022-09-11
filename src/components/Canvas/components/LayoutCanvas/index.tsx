import { AdaptiveDpr } from '@react-three/drei';
import { Canvas as CanvasPrimitive } from '@react-three/fiber';
import { unselectAllParts } from 'core/part';
import { useEffect, useRef } from 'react';
import { styled, theme } from 'stitches.config';
import useApp, { Tool } from 'stores/useApp';
import useBlueprint from 'stores/useBlueprint';
import useSettings from 'stores/useSettings';
import { Group } from 'three';
import { PanControls } from '../PanControls';
import { Grid } from './components/Grid';
import { PartBounds } from './components/PartBounds';
import { Parts } from './components/Parts';

const Canvas = styled(CanvasPrimitive, {
  backgroundColor: theme.colors.appBackground1,
  flex: 1,
  touchAction: 'none',
});

export const LayoutCanvas = () => {
  // TODO: all refs should not end with "ref"
  const canvas = useRef<HTMLCanvasElement>(null!);
  const parts = useRef<Group>(null!);
  const regressAmount = useSettings(
    (state) => state.performance.regress_amount,
  );
  const initialBlueprintState = useBlueprint.getState();

  const handlePointerMissed = () => {
    const {
      editor: { tool, isPanning },
    } = useApp.getState();
    const { selections } = useBlueprint.getState();
    if (selections.length > 0 && tool === Tool.Move && !isPanning) {
      unselectAllParts();
    }
  };

  useEffect(() => {
    const unsubscribeTool = useApp.subscribe(
      (state) => state.editor.tool,
      (tool) => {
        if (tool === Tool.Pan) {
          // canvas.current.classList.add(styles.pan);
        } else {
          // canvas.current.classList.remove(styles.pan);
        }
      },
    );
    const unsubscribeIsPanning = useApp.subscribe(
      (state) => state.editor.isPanning,
      (isPanning) => {
        if (isPanning) {
          // canvas.current.classList.add(styles.pan);
        } else if (useApp.getState().editor.tool !== Tool.Pan) {
          // canvas.current.classList.remove(styles.pan);
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
