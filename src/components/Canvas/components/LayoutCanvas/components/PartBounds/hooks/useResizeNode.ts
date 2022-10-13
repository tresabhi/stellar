import { ThreeEvent, useThree } from '@react-three/fiber';
import { mutateBlueprintVersionless } from 'core/blueprint';
import { mutateParts } from 'core/part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { DEFAULT_SNAP } from 'hooks/useDragControls';
import { Box3 } from 'three';

export const useResizeNode = (
  box3: Box3,
  getOppositeEdge: (box3: Box3) => [number, number],
  directionX: 1 | -1,
  directionY: 1 | -1,
) => {
  const { camera, invalidate } = useThree();

  let initialPositionX = 0;
  let initialPositionY = 0;
  let worldSpaceDeltaX = 0;
  let worldSpaceDeltaY = 0;
  let oppositeCornerX = 0;
  let oppositeCornerY = 0;
  let selectionWidth = 0;
  let selectionHeight = 0;

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    initialPositionX = event.nativeEvent.clientX;
    initialPositionY = event.nativeEvent.clientY;
    [oppositeCornerX, oppositeCornerY] = getOppositeEdge(box3);
    selectionWidth = box3.max.x - box3.min.x;
    selectionHeight = box3.max.y - box3.min.y;
    worldSpaceDeltaX = 0;
    worldSpaceDeltaY = 0;

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };
  const handlePointerMove = (event: PointerEvent) => {
    const pointerDeltaX = event.clientX - initialPositionX;
    const pointerDeltaY = event.clientY - initialPositionY;
    const newWorldSpaceDeltaX =
      Math.round(pointerDeltaX / camera.zoom / DEFAULT_SNAP) *
      DEFAULT_SNAP *
      directionX;
    const newWorldSpaceDeltaY =
      Math.round(pointerDeltaY / camera.zoom / DEFAULT_SNAP) *
      DEFAULT_SNAP *
      directionY;
    const deltaDiffX = newWorldSpaceDeltaX - worldSpaceDeltaX;
    const deltaDiffY = newWorldSpaceDeltaY - worldSpaceDeltaY;

    if (deltaDiffX !== 0 || deltaDiffY !== 0) {
      const scaleX = (selectionWidth + deltaDiffX) / selectionWidth;
      const scaleY = (selectionHeight + deltaDiffY) / selectionHeight;

      mutateBlueprintVersionless((draft) => {
        mutateParts<PartWithTransformations>(
          draft.selections,
          (partDraft) => {
            if (partDraft.p !== undefined && partDraft.o !== undefined) {
              const offsetX = partDraft.p.x - oppositeCornerX;
              const offsetY = partDraft.p.y - oppositeCornerY;
              const scaledOffsetX = offsetX * scaleX;
              const scaledOffsetY = offsetY * scaleY;

              partDraft.o.x *= scaleX;
              partDraft.o.y *= scaleY;
              partDraft.p.x = scaledOffsetX + oppositeCornerX;
              partDraft.p.y = scaledOffsetY + oppositeCornerY;
            }
          },
          draft,
        );
      });

      selectionWidth *= scaleX;
      selectionHeight *= scaleY;
      worldSpaceDeltaX = newWorldSpaceDeltaX;
      worldSpaceDeltaY = newWorldSpaceDeltaY;

      invalidate();
    }
  };
  const handlePointerUp = () => {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  return handlePointerDown;
};
