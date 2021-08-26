import { FC } from "react";

interface IUnitTextBox {
  prefix?: string;
}

const UnitTextBox: FC<IUnitTextBox> = () => {
  return (
    <input
      value="asd"
      onFocus={() => {
        alert("uwu");
      }}
    />
  );
};

export default UnitTextBox;
