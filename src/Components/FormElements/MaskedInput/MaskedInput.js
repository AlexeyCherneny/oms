import React from "react";
import { Input } from "antd";
import InputMask from "react-input-mask";

const FunctionalInput = props => {
  return <Input {...props} {...props.meta} />;
};

const CustomMaskedInput = props => {
  return (
    <InputMask {...props} meta={{ disabled: props.disabled }}>
      {FunctionalInput}
    </InputMask>
  );
};

export default CustomMaskedInput;
