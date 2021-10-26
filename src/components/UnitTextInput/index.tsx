import { FC } from 'react';

import './index.scss';

type UnitTextInputProps = {
  defaultValue: number | string;
  prefix?: string;
  suffix?: string;
  isolated?: boolean;
};
const UnitTextInput: FC<UnitTextInputProps> = ({
  defaultValue,
  prefix = '',
  suffix = '',
  isolated = true,
}) => {
  // TODO: functionality coming soon...
  return (
    <input
      className={`
        unit-text-input
        ${isolated ? 'isolated' : ''}
      `}
      defaultValue={`${prefix}${defaultValue}${suffix}`}
    />
  );
};

export default UnitTextInput;
