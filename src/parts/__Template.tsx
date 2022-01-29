import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import { PartModule } from 'core/types/Parts';
import { memo } from 'react';
import { DefaultPart, DefaultPartData } from './Default';

//@ts-ignore
/* export */ interface Template extends DefaultPart {
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
const Template: PartModule = {
  //@ts-ignore
  data: TemplateData,

  Icon: TemplateIcon,
  LayoutComponent: TemplateLayoutComponent,

  isExportable: false,
};
/* export default Template */
