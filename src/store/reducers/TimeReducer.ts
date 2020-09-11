import Interval from '../../models/Interval';
import { ConfigState } from './ConfigReducer';

export type TimeAction = {
  type: 'TIME_TICK' | 'TOGGLE_PAUSED' | 'NEXT_INTERVAL' | 'PREVIOUS_INTERVAL' | 'GENERATE_INTERVALS' | 'SKIP_SECONDS',
  props: any
}

export type TimeState = {
  curTime: number
  paused: boolean,
  intervalEvent: any,
  interval: number,
  intervals: Interval[]
}

type IntervalTemplates = {
  [key: string]: Omit<Interval, 'id' | 'remaining' | 'type'>;
}

const second = 1000;
const minute = (second * 60);

const intervalTemplates: IntervalTemplates = {
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

const cycles = ['work', 'shortBreak', 'work', 'shortBreak', 'work', 'shortBreak', 'work', 'longBreak'];
const createIntervals = (templates: IntervalTemplates): Interval[] => cycles.map((type, i) => ({
  id: Math.floor(Math.random() * 1000).toString(),
  type,
  remaining: templates[type].duration,
  ...templates[type],
}));

const initialState: TimeState = {
  curTime: Date.now(),
  intervalEvent: null,
  paused: false,
  interval: 0,
  intervals: [],
};

const timeTick = (state: TimeState) => {
  const newState = { ...state };
  if (!newState.paused && newState.intervals.length) {
    if (newState.intervals[state.interval].remaining > 0) {
      newState.intervals[state.interval].remaining -= 100;
    } else {
      newState.interval += 1;
    }
  }
  return newState;
};

const generateIntervals = (appConfig: ConfigState) => {
  const newState = { ...initialState };
  intervalTemplates.work.duration = appConfig.workIntervalDuration;
  intervalTemplates.shortBreak.duration = appConfig.shortBreakIntervalDuration;
  intervalTemplates.longBreak.duration = appConfig.longBreakIntervalDuration;

  newState.intervals = createIntervals(intervalTemplates);
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

const callback = (state: TimeState, action: TimeAction): TimeState | never => {
  const newState = { ...state };
  switch (action.type) {
    case 'GENERATE_INTERVALS':
      return generateIntervals(action.props.config);
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
