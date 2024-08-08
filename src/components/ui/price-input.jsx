import React from 'react';
import { NumericFormat } from 'react-number-format';

const FormattedPriceInput = ({ value, onChange, ...props }) => {
  return (
    <NumericFormat
      value={value}
      onValueChange={(values) => {
        const { formattedValue } = values;
        onChange(formattedValue);
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale={true}
      allowNegative={false}
      customInput={props.customInput}
      {...props}
    />
  );
};

export default FormattedPriceInput;