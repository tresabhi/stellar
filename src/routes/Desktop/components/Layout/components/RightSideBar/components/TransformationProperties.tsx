import * as PropertiesExplorer from 'components/PropertiesExplorer';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import usePropertyController from 'hooks/usePropertyController';
import { FC } from 'react';
import { PartPropertyComponentProps } from 'types/Parts';

const TransformationProperties: FC<PartPropertyComponentProps> = ({ ids }) => {
  const xPos = usePropertyController<PartWithTransformations>(
    ids,
    (state) => state.p.x,
    (value) => ({ p: { x: value } }),
    { suffix: 'm' },
  );
  const yPos = usePropertyController<PartWithTransformations>(
    ids,
    (state) => state.p.y,
    (value) => ({ p: { y: value } }),
    { suffix: 'm' },
  );
  const rot = usePropertyController<PartWithTransformations>(
    ids,
    (state) => state.o.z,
    (value) => ({ o: { z: value } }),
    { modOnClamp: true, max: 360, suffix: '°' },
  );
  const xScale = usePropertyController<PartWithTransformations>(
    ids,
    (state) => state.o.x,
    (value) => ({ o: { x: value } }),
    { suffix: 'x' },
  );
  const yScale = usePropertyController<PartWithTransformations>(
    ids,
    (state) => state.o.y,
    (value) => ({ o: { y: value } }),
    { suffix: 'x' },
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
