import { AdaptiveDpr } from '@react-three/drei';
import { Canvas as CanvasPrimitive } from '@react-three/fiber';
import { unselectAllParts } from 'core/part';
import { useEffect, useRef } from 'react';
import { css, styled, theme } from 'stitches.config';
import useApp, { Tool } from 'stores/useApp';
import useBlueprint from 'stores/useBlueprint';
import useSettings from 'stores/useSettings';
import { Group } from 'three';
import { PanControls } from '../PanControls';
import { Expose } from './components/Expose';
import { Grid } from './components/Grid';
import { PartBounds } from './components/PartBounds';
import { Parts } from './components/Parts';

const Canvas = styled(CanvasPrimitive, {
  backgroundColor: theme.colors.appBackground1,
  flex: 1,
  touchAction: 'none',
});

const panningStyles = css({
  cursor: 'grab',

  '&:active': {
    cursor: 'grabbing',
  },
});

export const LayoutCanvas = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const parts = useRef<Group>(null);
  const regressAmount = useSettings((state) => state.performance.regressAmount);
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
      (state) => (state.editor.isPanning ? Tool.Pan : state.editor.tool),
      (tool) => {
        if (canvas.current) {
          if (tool === Tool.Pan) {
            canvas.current.classList.add(panningStyles());
          } else {
            canvas.current.classList.remove(panningStyles());
          }
        }
      },
    );

    return unsubscribeTool;
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
      <Expose />

      <PanControls />

      <Grid />
      <PartBounds />

      <Parts ref={parts} />
    </Canvas>
  );
};

export * from './components/Expose';
export * from './components/Grid';
export * from './components/PartBounds';
export * from './components/Parts';
