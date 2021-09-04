import { FC } from 'react';

import './index.scss';

interface IUnitTextBox {
  defaultValue: number | string;
  prefix?: string;
  suffix?: string;
}
const UnitTextBox: FC<IUnitTextBox> = ({ defaultValue, prefix = '', suffix = '' }) => {
  // functionality coming soon...
  return <input className="unit-text-feild" defaultValue={`${prefix}${defaultValue}${suffix}`} />;
};

export default UnitTextBox;
