import * as PropertiesExplorer from 'components/PropertiesExplorer';
import {
  declareBoundingBoxUpdates,
  translateBoundingBox,
} from 'core/boundingBox';
import { getPart } from 'core/part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import usePropertyController from 'hooks/usePropertyController';
import { FC } from 'react';
import { Vector2 } from 'three';
import { AnyPart, PartPropertyComponentProps } from 'types/Parts';

const TransformationProperties: FC<PartPropertyComponentProps> = ({ IDs }) => {
  const xPos = usePropertyController<PartWithTransformations>(
    IDs,
    (state) => state.p.x,
    (value) => ({ p: { x: value } }),
    {
      suffix: 'm',
      onChangeDuringPartMutation: (
        nextValue,
        prevValue,
        ID,
        blueprintDraft,
      ) => {
        const part = getPart<AnyPart>(ID, blueprintDraft);

        if (part) {
          const prevX = part?.p?.x ?? prevValue ?? 0;

          translateBoundingBox(
            ID,
            new Vector2(nextValue - prevX, 0),
            blueprintDraft,
          );
          declareBoundingBoxUpdates();
        }
      },
    },
  );
  const yPos = usePropertyController<PartWithTransformations>(
    IDs,
    (state) => state.p.y,
    (value) => ({ p: { y: value } }),
    {
      suffix: 'm',
      onChangeDuringPartMutation: (
        nextValue,
        prevValue,
        ID,
        blueprintDraft,
      ) => {
        const part = getPart<AnyPart>(ID, blueprintDraft);

        if (part) {
          const prevY = part?.p?.y ?? prevValue ?? 0;

          translateBoundingBox(
            ID,
            new Vector2(0, nextValue - prevY),
            blueprintDraft,
          );
          declareBoundingBoxUpdates();
        }
      },
    },
  );
  const rot = usePropertyController<PartWithTransformations>(
    IDs,
    (state) => state.o.z,
    (value) => ({ o: { z: value } }),
    {
      modOnClamp: true,
      max: 360,
      suffix: '°',
      onChange: declareBoundingBoxUpdates,
    },
  );
  const xScale = usePropertyController<PartWithTransformations>(
    IDs,
    (state) => state.o.x,
    (value) => ({ o: { x: value } }),
    { suffix: 'x', onChange: declareBoundingBoxUpdates },
  );
  const yScale = usePropertyController<PartWithTransformations>(
    IDs,
    (state) => state.o.y,
    (value) => ({ o: { y: value } }),
    { suffix: 'x', onChange: declareBoundingBoxUpdates },
  );

  return (
    <PropertiesExplorer.Group>
      <PropertiesExplorer.Title>Transformations</PropertiesExplorer.Title>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.Input ref={xPos} label="Position X" />
        <PropertiesExplorer.Input ref={yPos} label="Position Y" />
        <PropertiesExplorer.Input ref={rot} label="Rotation" />
      </PropertiesExplorer.Row>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.Input ref={xScale} label="Scale X" />
        <PropertiesExplorer.Input ref={yScale} label="Scale Y" />
      </PropertiesExplorer.Row>
    </PropertiesExplorer.Group>
  );
};
export default TransformationProperties;
