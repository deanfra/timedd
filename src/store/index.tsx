import React, {
  createContext, useReducer, ReactChild, useState,
} from 'react';
import TasksReducer, { TasksState, TasksActions } from './reducers/TasksReducer';
import TimeReducer, { TimeState, TimeActions } from './reducers/TimeReducer';

type Props = { children: ReactChild }
type Store = {
  tasks: { state: TasksState, dispatch: Dispatch },
  time: { state: TimeState, dispatch: Dispatch },
}

export type Action = {
  type: TimeActions | TasksActions
  props?: any
}

type Dispatch = (action: Action) => void
type DispatchWrap = (dispatch: Dispatch) => (action: Action) => void

const store: React.Context<Store> = createContext(null as any);
const { Provider } = store;

const StateProvider = ({ children }: Props) => {
  const [version, setVersion] = useState(1);
  const [timeState, timeDispatch] = useReducer(TimeReducer.callback, TimeReducer.initialState);
  const [tasksState, tasksDispatch] = useReducer(TasksReducer.callback, TasksReducer.initialState);

  const dispatchWrap: DispatchWrap = (dispatch: Dispatch) => (action: Action): void => {
    dispatch(action);
    setVersion(version + 1);
  };

  const reducers = {
    time: { state: timeState, dispatch: dispatchWrap(timeDispatch) },
    tasks: { state: tasksState, dispatch: dispatchWrap(tasksDispatch) },
  };

  return <Provider value={reducers}>{children}</Provider>;
};

export { store, StateProvider };
