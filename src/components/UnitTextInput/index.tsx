import { FC } from 'react';

import './index.scss';

interface IUnitTextInput {
  defaultValue: number | string;
  prefix?: string;
  suffix?: string;
}
const UnitTextInput: FC<IUnitTextInput> = ({ defaultValue, prefix = '', suffix = '' }) => {
  // functionality coming soon...
  return <input className="unit-text-input" defaultValue={`${prefix}${defaultValue}${suffix}`} />;
};

export default UnitTextInput;
