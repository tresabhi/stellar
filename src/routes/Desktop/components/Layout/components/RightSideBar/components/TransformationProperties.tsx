import * as PropertiesExplorer from 'components/PropertiesExplorer';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import usePropertyController from 'hooks/usePropertyController';
import useTranslator from 'hooks/useTranslator';
import { FC } from 'react';
import { PartPropertyComponentProps } from 'types/Parts';

const TransformationProperties: FC<PartPropertyComponentProps> = ({ ids }) => {
  const { t } = useTranslator();
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
      <PropertiesExplorer.Title>{t`properties_explorer.properties.transformations`}</PropertiesExplorer.Title>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.Input
          ref={xPos}
          label={t`properties_explorer.properties.transformations.position_x`}
        />
        <PropertiesExplorer.Input
          ref={yPos}
          label={t`properties_explorer.properties.transformations.position_y`}
        />
        <PropertiesExplorer.Input
          ref={rot}
          label={t`properties_explorer.properties.transformations.rotation`}
        />
      </PropertiesExplorer.Row>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.Input
          ref={xScale}
          label={t`properties_explorer.properties.transformations.scale_x`}
        />
        <PropertiesExplorer.Input
          ref={yScale}
          label={t`properties_explorer.properties.transformations.scale_y`}
        />
      </PropertiesExplorer.Row>
    </PropertiesExplorer.Group>
  );
};
export default TransformationProperties;
