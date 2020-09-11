import React, {
  createContext, useReducer, ReactChild, useState,
} from 'react';
import ConfigReducer, { ConfigState, ConfigAction } from './reducers/ConfigReducer';
import TasksReducer, { TasksState, TasksAction } from './reducers/TasksReducer';
import TimeReducer, { TimeState, TimeAction } from './reducers/TimeReducer';

type ActionList = TimeAction | TasksAction | ConfigAction
type Props = { children: ReactChild }
type Store = {
  config: { state: ConfigState, dispatch: Dispatch<ConfigAction> },
  tasks: { state: TasksState, dispatch: Dispatch<TasksAction> },
  time: { state: TimeState, dispatch: Dispatch<TimeAction> },
}

type Dispatch<A> = (action: A) => void
type DispatchWrap<A> = (dispatch: Dispatch<A>) => (action: A) => void

const store: React.Context<Store> = createContext(null as any);
const { Provider } = store;

const StateProvider = ({ children }: Props) => {
  const [version, setVersion] = useState(1);
  const [timeState, timeDispatch] = useReducer(TimeReducer.callback, TimeReducer.initialState);
  const [tasksState, tasksDispatch] = useReducer(TasksReducer.callback, TasksReducer.initialState);
  const [confState, confDispatch] = useReducer(ConfigReducer.callback, ConfigReducer.initialState);

  const dispatchWrap: DispatchWrap<ActionList> = (dispatch) => (action): void => {
    dispatch(action);
    setVersion(version + 1);
  };

  const reducers = {
    config: { state: confState, dispatch: dispatchWrap(confDispatch) },
    time: { state: timeState, dispatch: dispatchWrap(timeDispatch) },
    tasks: { state: tasksState, dispatch: dispatchWrap(tasksDispatch) },
  };

  return <Provider value={reducers}>{children}</Provider>;
};

export { store, StateProvider };
