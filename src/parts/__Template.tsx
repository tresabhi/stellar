import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import { memo } from 'react';
import { PartModule } from 'types/Parts';
import { PartWithTranslations, DefaultPartData } from './Default';

//@ts-ignore
/* export */ interface Template extends PartWithTranslations {
  A: { b: number };
  C: boolean;
}

//@ts-ignore
/* export */ const TemplateData: Template = {
  ...DefaultPartData,

  meta: {
    ...DefaultPartData.meta,

    label: 'Template',
  },
  A: { b: 0 },
  C: true,
};

//@ts-ignore
/* export */ const TemplateLayoutComponent = memo(() => <mesh />);

//@ts-ignore
/* export */ const TemplateIcon = Icon;

//@ts-ignore
const TemplatePart: PartModule = {
  //@ts-ignore
  data: TemplateData,

  Icon: TemplateIcon,
  LayoutComponent: TemplateLayoutComponent,

  isExportable: false,
};
/* export default Template */
