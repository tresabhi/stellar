import { Line } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import getPart from 'core/part/getPart';
import subscribeToPart from 'core/part/subscribeToPart';
import { Part } from 'game/parts/Part';
import { PartWithStage } from 'game/parts/PartWithStage';
import { memo, RefObject, useEffect, useRef } from 'react';
import useApp, { Tab } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import {
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector2Tuple,
} from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';

export const UNIT_POINTS: Vector2Tuple[] = [
  [-0.5, 0.5],
  [0.5, 0.5],
  [0.5, -0.5],
  [-0.5, -0.5],
  [-0.5, 0.5],
];
const unitPlane = new PlaneGeometry(1, 1);
const SELECTION_BOX_COLOR = 'hsl(270, 60%, 30%)';
const shadingMaterial = new MeshBasicMaterial({
  color: SELECTION_BOX_COLOR,
  transparent: true,
  opacity: 0.25,
});

export interface PartBoundProps {
  id: string;
}

const useVisibility = (
  id: string,
  wrapper: RefObject<Group>,
  resize: () => void,
) => {
  useEffect(() => {
    const isLayout = useApp.getState().interface.tab === Tab.Layout;
    let { stage, visible, selected } = getPart<Part & PartWithStage>(id);
    let stageSelection = useBlueprint.getState().stage_selection;
    let unsubscribes: (() => void)[] = [];

    function toggleVisibility() {
      if (wrapper.current) {
        if (isLayout) {
          wrapper.current.visible = visible && selected;
        } else {
          wrapper.current.visible = visible && stage === stageSelection;
        }
      }

      invalidate();
    }

    resize();
    toggleVisibility();

    if (isLayout) {
      unsubscribes = [
        subscribeToPart(
          id,
          (newSelected: boolean) => {
            selected = newSelected;
            toggleVisibility();
          },
          (newState) => newState.selected,
        ),
        subscribeToPart(
          id,
          (newVisible: boolean) => {
            visible = newVisible;
            toggleVisibility();
          },
          (newState) => newState.visible,
        ),
      ];
    } else {
      unsubscribes = [
        useBlueprint.subscribe(
          (state) => (state.parts[id] as PartWithStage).stage,
          (newStage) => {
            stage = newStage;
            toggleVisibility();
          },
        ),
        useBlueprint.subscribe(
          (state) => state.stage_selection,
          (newStageSelection) => {
            stageSelection = newStageSelection;
            toggleVisibility();
          },
        ),
      ];
    }

    window.addEventListener(`boundsupdated${id}`, resize);

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());

      window.removeEventListener(`boundsupdated${id}`, resize);
    };
  });
};

const PartBounds = memo(
  ({ id }: PartBoundProps) => {
    const outline = useRef<Line2>(null);
    const shading = useRef<Mesh>(null);
    const wrapper = useRef<Group>(null);

    const resize = () => {
      if (boundsStore[id]) {
        const { bounds } = boundsStore[id];

        wrapper.current?.position.set(bounds.x, bounds.y, 0);
        wrapper.current?.rotation.set(0, 0, bounds.rotation);
        wrapper.current?.scale.set(
          Math.abs(bounds.width),
          Math.abs(bounds.height),
          1,
        );
        invalidate();
      }
    };

    useVisibility(id, wrapper, resize);

    return (
      <group ref={wrapper}>
        <Line
          ref={outline}
          color="#9d5bd2"
          points={UNIT_POINTS}
          lineWidth={2}
        />
        <mesh ref={shading} material={shadingMaterial} geometry={unitPlane} />
      </group>
    );
  },
  (prevProps, nextProps) => prevProps.id === nextProps.id,
);
export default PartBounds;
