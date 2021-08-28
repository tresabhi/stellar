import { FC, useState, Component } from "react";
import { JsxElement } from "typescript";

interface IUnitTextBox {
  prefix?: string;
  suffix?: string;
  defaultValue: string | number;
}

class UnitTextBox extends Component {
  constructor(props) {
    super(props);

    this.setState({ value: "asd" });
  }

  onFocus() {
    this.setState({ value: "asd" });
  }

  render() {
    return <input />;
  }
}

export default UnitTextBox;
