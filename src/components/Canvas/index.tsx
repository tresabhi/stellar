import {
  Canvas as CanvasPrimitive,
  Props as CanvasPrimitiveProps,
} from '@react-three/fiber';
import HeadsUpDisplay from 'components/HeadsUpDisplay';
import PanControls from 'components/PanControls';
import unselectAll from 'core/part/unselectAll';
import { RefObject, useEffect, useRef } from 'react';
import { css, styled, theme } from 'stitches.config';
import useApp, { Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import { Group } from 'three';
import Centers from './components/Centers';
import EditControls from './components/EditControls';
import Expose from './components/Expose';
import Grid from './components/Grid';
import Parts from './components/Parts';
import PartsBounds from './components/PartsBounds';
import SelectBox from './components/SelectBox';
import TransformControls from './components/TransformControls';

const StyledCanvas = styled(CanvasPrimitive, {
  backgroundColor: theme.colors.appBackground1,
  flex: 1,
  position: 'absolute',
  touchAction: 'none',
});

const panningStyles = css({
  cursor: 'grab',

  '&:active': {
    cursor: 'grabbing',
  },
});

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

export default function Canvas(props: Omit<CanvasPrimitiveProps, 'children'>) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const parts = useRef<Group>(null);

  const handlePointerMissed = () => {
    const { tool, isSpacePanning } = useApp.getState().editor;
    const { part_selections: selections } = useBlueprint.getState();
    if (selections.length > 0 && tool === Tool.Transform && !isSpacePanning) {
      unselectAll();
    }
  };

  useCursor(canvas);

  return (
    <StyledCanvas
      {...props}
      ref={canvas}
      gl={{ preserveDrawingBuffer: true }}
      orthographic
      camera={{
        zoom: 32,
        position: [0, 0, 1e3],
        rotation: [0, 0, 0],
      }}
      onPointerMissed={handlePointerMissed}
      frameloop="demand"
    >
      <Expose />
      <PanControls />

      {/* priority 0 */}
      <Grid />

      <HeadsUpDisplay priority={1}>
        <Parts ref={parts} />
      </HeadsUpDisplay>

      <HeadsUpDisplay priority={2}>
        <PartsBounds />
        <TransformControls />
        <EditControls />
        <SelectBox />
        <Centers />
      </HeadsUpDisplay>
    </StyledCanvas>
  );
}
