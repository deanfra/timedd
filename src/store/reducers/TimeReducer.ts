/* eslint-disable no-param-reassign */
import { Action } from '../index';
import Interval from '../../models/Interval';

export type TimeActions = 'TIME_TICK' | 'TOGGLE_PAUSED' | 'NEXT_INTERVAL' | 'PREVIOUS_INTERVAL' | 'SKIP_SECONDS'

export type TimeState = {
  curTime: number
  paused: boolean,
  intervalEvent: any,
  interval: number,
  intervals: Interval[]
}

type IntervalTypes = {
  [key: string]: Omit<Interval, 'id' | 'remaining' | 'type'>;
}

const minute = (1000 * 60);
const intervalTypes: IntervalTypes = {
  shortBreak: {
    label: 'Short Break',
    duration: minute * 4,
  },
  longBreak: {
    label: 'Long Break',
    duration: minute * 19,
  },
  work: {
    label: 'Focus on work',
    duration: minute * 24,
  },
};

const intervals: Interval[] = ['work', 'shortBreak', 'work', 'shortBreak', 'work', 'shortBreak', 'work', 'longBreak'].map((type, i) => ({
  id: Math.floor(Math.random() * 1000).toString(),
  type,
  remaining: intervalTypes[type].duration,
  ...intervalTypes[type],
}));

const initialState: TimeState = {
  curTime: Date.now(),
  intervalEvent: null,
  paused: false,
  interval: 0,
  intervals,
};

const timeTick = (state: TimeState) => {
  const newState = { ...state };
  if (!newState.paused) {
    if (newState.intervals[state.interval].remaining > 0) {
      newState.intervals[state.interval].remaining -= 100;
    } else {
      newState.interval += 1;
    }
  }
  return newState;
};

const incrementInterval = (state: TimeState, direction: number) => {
  const newState = { ...state };
  newState.interval = Math.max(0, newState.interval + direction);
  newState.intervals[newState.interval].remaining = newState.intervals[newState.interval].duration;
  return newState;
};

const incrementTime = (state: TimeState, seconds: number) => {
  const newState = { ...state };
  const { remaining, duration } = state.intervals[newState.interval];
  const newTime = remaining - seconds * 1000;

  newState.intervals[newState.interval].remaining = Math.max(0, Math.min(duration, newTime));
  return newState;
};

const callback = (state: TimeState, action: Action): TimeState | never => {
  const newState = { ...state };
  switch (action.type) {
    case 'NEXT_INTERVAL':
      return incrementInterval(state, 1);
    case 'PREVIOUS_INTERVAL':
      return incrementInterval(state, -1);
    case 'SKIP_SECONDS':
      return incrementTime(state, action.props.secs);
    case 'TIME_TICK':
      return timeTick(state);
    case 'TOGGLE_PAUSED':
      newState.paused = !newState.paused;
      return newState;
    default: break;
  }
  return state;
};

export default { callback, initialState };
