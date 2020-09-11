export type ConfigAction = {
  type: 'CONFIG_UPDATED',
  props: any
}

export type ConfigState = {
  workIntervalDuration: number,
  shortBreakIntervalDuration: number,
  longBreakIntervalDuration: number,
}

// HELPERS
const second = 1000;
const minute = (second * 60);
const persist = (state: ConfigState): ConfigState => {
  localStorage.setItem('timedd__config', JSON.stringify(state));
  return state;
};

const templateState = {
  workIntervalDuration: 25 * minute,
  shortBreakIntervalDuration: 5 * minute,
  longBreakIntervalDuration: 15 * minute,
};

const storedState = localStorage.getItem('timedd__config');
const initialState = storedState ? JSON.parse(storedState) : templateState;

const updateState = (props:any, state: ConfigState) => {
  const updatedState = { ...state, ...props };
  return persist(updatedState);
};

const callback = (state: ConfigState, action: ConfigAction): ConfigState | never => {
  const newState = { ...state };

  switch (action.type) {
    case 'CONFIG_UPDATED':
      return updateState(action.props, newState);
    default: break;
  }
  return state;
};

export default { callback, initialState };
