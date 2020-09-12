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
}: Props): JSX.Element => {
  const [timeState, setTimeState] = useState(timeUtil.millisecondsToTime(value));

  useEffect(() => {
    setTimeState(timeUtil.millisecondsToTime(value));
  }, [value]);

  return (
    <Input
      value={timeState}
      onBlur={(val: string) => onBlur(timeUtil.timeToMilliseconds(val))}
    />
  );
};

export default TimeInput;
