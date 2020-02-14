import React from "react";
import { Input } from "antd";
import InputMask from "react-input-mask";

const FunctionalInput = props => {
  return <Input {...props} />;
};

const CustomMaskedInput = ({ disabled, ...props }) => {
  return <InputMask {...props}>{FunctionalInput}</InputMask>;
};

export default CustomMaskedInput;
