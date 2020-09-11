import React, { Dispatch, useState, ReactText } from 'react';
import styled from '@emotion/styled';
import Flex from '../../../../components/Flex';
import TimeInput from '../../../../components/TimeInput';
import theme from '../../../../theme';
import { ConfigState } from '../../../../store/reducers/ConfigReducer';

type Props = {
  config: ConfigState,
  dispatch: Dispatch<any>
}

const maybeParse = (val: ReactText) => (typeof val === 'string' ? parseInt(val, 10) : val);

const Controls = ({ config, dispatch }: Props): JSX.Element => {
  const settingsUpdated = (key: string, val: ReactText) => dispatch({ type: 'CONFIG_UPDATED', props: { [key]: val } });

  return (
    <Wrap direction="column">
      <p>Long break</p>
      <TimeInput
        value={config.longBreakIntervalDuration}
        onBlur={(val: ReactText) => { settingsUpdated('longBreakIntervalDuration', maybeParse(val)); }}
      />
      <p>Short break</p>
      <TimeInput
        value={config.shortBreakIntervalDuration}
        onBlur={(val: ReactText) => { settingsUpdated('shortBreakIntervalDuration', maybeParse(val)); }}
      />
      <p>Work interval</p>
      <TimeInput
        value={config.workIntervalDuration}
        onBlur={(val: ReactText) => { settingsUpdated('workIntervalDuration', maybeParse(val)); }}
      />
      <br />
    </Wrap>
  );
};

export default Controls;

const Wrap = styled(Flex)`
  margin:  0 0 1em 0;
  background: ${theme.color.black};
  border-radius: 1em;
  overflow: hidden;
  min-height: 13em;
  max-width: 20em;
  width: 100%;
`;
