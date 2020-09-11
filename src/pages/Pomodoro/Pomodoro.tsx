import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { store } from '../../store/index';
import Interval from '../../models/Interval';
import theme from '../../theme';

import Block from './components/Block';
import Button from '../../components/Button';
import Controls from './components/Controls';
import Flex from '../../components/Flex';
import Icon from '../../components/Icon';
import SettingsPanel from './components/SettingsPanel';

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
  const { tasks, time, config } = useContext(store);
  const [isBreakState, setIsBreak] = useState(false);
  const [showSettingState, setShowSetting] = useState(false);
  const currentInterval: Interval | undefined = time.state.intervals[time.state.interval];

  const next = (() => { time.dispatch({ type: 'NEXT_INTERVAL', props: {} }); });
  const previous = (() => { time.dispatch({ type: 'PREVIOUS_INTERVAL', props: {} }); });
  const playPause = (() => { time.dispatch({ type: 'TOGGLE_PAUSED', props: {} }); });
  const replay = (() => { time.dispatch({ type: 'SKIP_SECONDS', props: { secs: -30 } }); });
  const skip = (() => { time.dispatch({ type: 'SKIP_SECONDS', props: { secs: 30 } }); });
  const toggleShowSetting = (() => { setShowSetting(!showSettingState); });

  // Generate intervals based on config
  useEffect(() => {
    time.dispatch({ type: 'GENERATE_INTERVALS', props: { config: config.state } });
  }, []);

  // Begin timer
  useEffect(() => {
    time.state.intervalEvent = setInterval(() => {
      time.dispatch({ type: 'TIME_TICK', props: {} });
    }, 100);
    return () => {
      clearInterval(time.state.intervalEvent);
    };
  }, []);

  useEffect(() => {
    if (currentInterval) {
      const isBreak = currentInterval.type === 'shortBreak' || currentInterval.type === 'longBreak';
      setIsBreak(isBreak);
    }
  }, [currentInterval]);

  return (
    <PomodoroWrap direction="column" isBreak={isBreakState} data-testid="app">
      {(showSettingState && (<SettingsPanel config={config.state} dispatch={config.dispatch} />))
      || (currentInterval && (
      <>
        <Block
          key={currentInterval.id}
          interval={currentInterval}
          curTime={time.state.curTime}
          tasks={tasks.state}
        />
        <Controls
          next={next}
          previous={previous}
          playPause={playPause}
          replay={replay}
          skip={skip}
          paused={time.state.paused}
        />
        {millisecondsToTime(currentInterval ? currentInterval.remaining : 0)}
      </>
      ))
      || null}

      <Flex>
        <Button onClick={() => toggleShowSetting()} opacity={0.3}>
          <Icon color="white" type="settings" />
        </Button>
      </Flex>
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
