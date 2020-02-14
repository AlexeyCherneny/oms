import React from 'react';
import { Input } from 'antd';

class NumericInput extends React.PureComponent {
  onChange = e => {
    const { value } = e.target;
    const { isDecimal, isPositive, onChange } = this.props;
    const reg = isPositive 
      ? isDecimal ? /^(0|[1-9]\d*)(\.\d*)?$/ : /^\d*$/
      : isDecimal ? /^-?(0|[1-9]\d*)(\.\d*)?$/ : /^-?\d*$/;
    if (value === '' || reg.test(value)) {
      onChange(value);
    }
  };

  render() {
    const { isDecimal, isPositive, ...props } = this.props;
    return (
        <Input
          {...props}
          onChange={this.onChange}
        />
    );
  }
}

export default NumericInput;
