import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Block from './components/Block';
import Controls from './components/Controls';
import Flex from '../../components/Flex';
import { store } from '../../store/index';
import theme from '../../theme';
import Icon from '../../components/Icon';

const millisecondsToTime = (milliseconds: number): string => {
  const minutes = Math.round((milliseconds / 1000) / 60);
  const seconds = (milliseconds / 1000) % 60;
  const secondsStr = seconds.toString();
  let secs;
  if (seconds >= 10) {
    secs = secondsStr.substring(0, 2);
  } else {
    secs = `0${secondsStr.substring(0, 1)}`;
  }

  return `${minutes}:${secs}`;
};

const Pomodoro = (): JSX.Element => {
  const { tasks, time } = useContext(store);
  const [breakState, setBreak] = useState(false);
  const { curTime } = time.state;
  const taskList = tasks.state;
  const currentInterval = time.state.intervals[time.state.interval];

  const next = (() => {
    time.dispatch({ type: 'NEXT_INTERVAL' });
  });

  const previous = (() => {
    time.dispatch({ type: 'PREVIOUS_INTERVAL' });
  });

  const playPause = (() => {
    time.dispatch({ type: 'TOGGLE_PAUSED' });
  });

  const replay = (() => {
    time.dispatch({ type: 'SKIP_SECONDS', props: { secs: -30 } });
  });

  const skip = (() => {
    time.dispatch({ type: 'SKIP_SECONDS', props: { secs: 30 } });
  });

  useEffect(() => {
    time.state.intervalEvent = setInterval(() => {
      time.dispatch({ type: 'TIME_TICK' });
    }, 100);
    return () => {
      clearInterval(time.state.intervalEvent);
    };
  }, []);

  useEffect(() => {
    setBreak(currentInterval.type === 'shortBreak' || currentInterval.type === 'longBreak');
  }, [currentInterval.type]);

  return (
    <PomodoroWrap direction="column" isBreak={breakState} data-testid="app">
      <Block
        key={currentInterval.id}
        interval={currentInterval}
        curTime={curTime}
        tasks={taskList}
      />
      <Controls
        next={next}
        previous={previous}
        playPause={playPause}
        replay={replay}
        skip={skip}
        paused={time.state.paused}
      />
      <br />
      <br />

      {millisecondsToTime(currentInterval.remaining)}
      <p>
        <Icon type="settings" color="white" />
      </p>
    </PomodoroWrap>
  );
};

export default Pomodoro;

type WrapType = {
  isBreak: boolean
}

const PomodoroWrap = styled(Flex)`
  height: 100%;
  background-color: ${(props: WrapType) => (props.isBreak ? theme.color.secondaryDarker : theme.color.grey)};
  transition: background-color 300ms;
`;
