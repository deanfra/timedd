import { Action } from '../index';
import Task from '../../models/Task';
import definition from '../../components/Icon/definition';

export type TasksState = Task[]
export type TasksActions = 'TASK_DONE' | 'TASK_UPDATED' | 'TASK_POSTPONE' | 'TASK_CREATE' | 'TASK_DELETE'

const templateState: TasksState = [
  {
    id: '4f22e42f-78a6-4632-a762-508aecaf682f',
    label: 'Example task',
    activeFrom: Date.now(),
    icon: 'localPhone',
    expiresAt: null,
    finished: false,
    finishedAt: null,
  },
];

const storedState = localStorage.getItem('timedd__tasks');
const initialState = storedState ? JSON.parse(storedState) : templateState;
const persist = (state: TasksState) => {
  localStorage.setItem('timedd__tasks', JSON.stringify(state));
  return state;
};

const iconNames = Object.keys(definition);

const newTask = (): Task => {
  const randIcon = iconNames[Math.floor(Math.random() * iconNames.length)];
  return {
    id: Math.floor(Math.random() * 100000000).toString(),
    label: 'New task',
    activeFrom: Date.now(),
    icon: randIcon,
    expiresAt: null,
    finished: false,
    finishedAt: null,
  };
};

const postPoneTask = (taskId: string, activeFrom: number, state: TasksState): TasksState => {
  const taskIndex = state.findIndex(({ id }) => id === taskId);
  const newState = [...state];
  if (taskIndex !== undefined) newState[taskIndex].activeFrom = activeFrom;
  return newState;
};

const updateTask = (state: TasksState, task: Task) => {
  const newState = [...state];
  const taskIndex = state.findIndex(({ id }: Task) => task.id === id);
  newState[taskIndex] = task;
  return newState;
};

const finishTask = (state: TasksState, task: Task): TasksState => {
  const updatedTask = { ...task, finished: true };
  return updateTask(state, updatedTask);
};

const callback = (curState: TasksState, action: Action): TasksState | never => {
  let newState: TasksState;
  switch (action.type) {
    case 'TASK_DONE':
      newState = finishTask(curState, action.props.task);
      break;
    case 'TASK_DELETE':
      newState = curState.filter(({ id }) => id !== action.props.task.id);
      break;
    case 'TASK_UPDATED':
      newState = updateTask(curState, action.props.task);
      break;
    case 'TASK_POSTPONE':
      newState = postPoneTask(action.props.id, action.props.activeFrom, curState);
      break;
    case 'TASK_CREATE':
      curState.push(newTask());
      newState = curState;
      break;
    default:
      newState = curState;
      break;
  }

  return persist(newState);
};

export default { callback, initialState };
