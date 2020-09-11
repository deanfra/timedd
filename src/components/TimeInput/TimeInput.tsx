import React, { useEffect, useState, ReactText } from 'react';
import Input from '../Input';
import timeUtil from '../../util/time';

type Props = {
  value: number,
  onBlur: (val: ReactText) => void,
}

const TimeInput = ({
  value,
  onBlur,
}: Props): JSX.Element => (
  <Input
    number
    value={value}
    onBlur={onBlur}
  />
);

export default TimeInput;
