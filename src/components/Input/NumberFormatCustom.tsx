/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/27
 */
import * as React from 'react';
import NumberFormat from 'react-number-format';

export function NumberFormatCustom(props) {
  const {inputRef, onChange, ...other} = props;

  return (
    <NumberFormat {...other}
                  getInputRef={inputRef}
                  onValueChange={values => {
                    onChange({
                      target: {
                        value: values.value,
                      },
                    });
                  }}
                  thousandSeparator
                  prefix="¥"
    />
  );
}
