import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import { memo } from 'react';
import { PartModule } from 'types/Parts';
import { DefaultPartData, PartWithTranslations } from './Default';

/* export */ interface Template extends PartWithTranslations {
  A: { b: number };
  C: boolean;
}

/* export */ const TemplateData: Template = {
  ...DefaultPartData,

  meta: {
    ...DefaultPartData.meta,

    label: 'Template',
  },
  A: { b: 0 },
  C: true,
};

/* export */ const TemplateLayoutComponent = memo(() => <mesh />);

/* export */ const TemplateIcon = Icon;

/* export */ const TemplatePropertyComponent = () => (
  <PropertiesExplorer.Group>
    <PropertiesExplorer.Title>Template</PropertiesExplorer.Title>
    <PropertiesExplorer.Row>
      <PropertiesExplorer.NamedInput
        label="Name"
        type="wide"
        defaultValue="Template"
      ></PropertiesExplorer.NamedInput>
    </PropertiesExplorer.Row>
  </PropertiesExplorer.Group>
);

//@ts-ignore
const TemplatePart: PartModule = {
  isExportable: false,

  Icon: TemplateIcon,

  PropertyComponent: TemplatePropertyComponent,
  LayoutComponent: TemplateLayoutComponent,

  //@ts-ignore
  data: TemplateData,
};
/* export default Template */
