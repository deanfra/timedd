import React, { useEffect, useState, ReactText } from 'react';

type Props = {
  value: ReactText,
  number?: boolean,
  onBlur: (val: ReactText) => void,
}

const Input = ({
  value,
  number,
  onBlur,
}: Props): JSX.Element => {
  const [state, setState] = useState<ReactText>(value);
  useEffect(() => { setState(value); }, [value]);
  const type = number ? 'number' : 'text';

  return (
    <input
      value={state}
      type={type}
      onChange={(e) => { setState(e.target.value); }}
      onBlur={(e) => { onBlur(e.target.value); }}
    />
  );
};

export default Input;
