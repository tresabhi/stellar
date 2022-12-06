import { AdaptiveDpr } from '@react-three/drei';
import {
  Canvas as CanvasPrimitive,
  Props as CanvasPrimitiveProps,
} from '@react-three/fiber';
import { unselectAllParts } from 'core/part';
import { FC, RefObject, useEffect, useRef } from 'react';
import { css, styled, theme } from 'stitches.config';
import useApp, { Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import useSettings from 'stores/settings';
import { Group } from 'three';
import { PanControls } from '../PanControls';
import { Expose } from './components/Expose';
import { Grid } from './components/Grid';
import { Outlines } from './components/Outlines';
import { Parts } from './components/Parts';

const Canvas = styled(CanvasPrimitive, {
  backgroundColor: theme.colors.appBackground1,
  flex: 1,
});

const panningStyles = css({
  cursor: 'grab',

  '&:active': {
    cursor: 'grabbing',
  },
});

export const LayoutCanvas: FC<Omit<CanvasPrimitiveProps, 'children'>> = (
  props,
) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const parts = useRef<Group>(null);
  const regressAmount = useSettings((state) => state.performance.regressAmount);
  const initialBlueprintState = useBlueprint.getState();

  const handlePointerMissed = () => {
    const {
      editor: { tool, isSpacePanning },
    } = useApp.getState();
    const { selections } = useBlueprint.getState();
    if (selections.length > 0 && tool === Tool.Move && !isSpacePanning) {
      unselectAllParts();
    }
  };

  useCursor(canvas);

  return (
    <Canvas
      {...props}
      ref={canvas}
      orthographic
      camera={{
        zoom: 32,
        position: [initialBlueprintState.center, 0, 100],
        rotation: [0, 0, 0],
      }}
      performance={{ min: regressAmount }}
      onPointerMissed={handlePointerMissed}
      frameloop="demand"
    >
      {regressAmount > 0 ? <AdaptiveDpr pixelated /> : undefined}
      <Expose />

      <PanControls />

      <Grid />
      <Outlines />

      <Parts ref={parts} />
    </Canvas>
  );
};

const useCursor = (canvas: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const unsubscribeTool = useApp.subscribe(
      (state) => (state.editor.isSpacePanning ? Tool.Pan : state.editor.tool),
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
};

export * from './components/Expose';
export * from './components/Grid';
export * from './components/Outlines';
export * from './components/Parts';
