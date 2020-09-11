import React, { useEffect, useContext } from 'react';
import styled from '@emotion/styled';

import { store } from '../../store/index';
import Block from './components/Block';
import Flex from '../../components/Flex';
import theme from '../../theme';

const Timer = (): JSX.Element => {
  const { tasks, time } = useContext(store);

  // useEffect(() => {
  //   setInterval(() => {
  //     time.dispatch({ type: 'TIME_TICK' });
  //   }, 1000);
  // }, [time.state.intervals]);

  return (
    <div>
      <Blocks>
        {/* {time.state.intervals.map((interval, i) => (
          <Flex key={`dot-${interval.activeFrom}`}>
            <Block
              tasks={tasks.state}
              tick={time.state.curTime}
              int={interval}
            />
          </Flex>
        ))} */}
      </Blocks>
    </div>
  );
};

export default Timer;

const Blocks = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
