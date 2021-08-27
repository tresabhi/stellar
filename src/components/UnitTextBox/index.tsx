import { FC, useState } from "react";

interface IUnitTextBox {
  prefix?: string;
  suffix?: string;
  defaultValue: string | number;
}

const UnitTextBox: FC<IUnitTextBox> = ({
  prefix = "",
  suffix = "",
  defaultValue
}) => {
  let trueValue = defaultValue;
  const [value, setValue] = useState(`${prefix}${defaultValue}${suffix}`);

  const onFocus = () => {
    setValue(String(defaultValue));
  };

  const onBlur = () => {
    setValue(`${prefix}${defaultValue}${suffix}`);
  };

  return <input value={value} onFocus={onFocus} onBlur={onBlur} />;
};

export default UnitTextBox;
