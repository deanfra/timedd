import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import Flex from '../../../../components/Flex';
import Icon from '../../../../components/Icon';
import Interval from '../../../../models/Interval';
import { store } from '../../../../store';
import Task from '../../../../models/Task';
import TaskListItem from '../TaskListItem';
import Button from '../../../../components/Button';
import theme from '../../../../theme';

type Props = {
  interval: Interval
}

const TaskList = ({ interval }: Props): JSX.Element => {
  const { tasks: taskStore } = useContext(store);

  const unfinishedTasks = taskStore.state.filter((task) => !task.finished);
  const finishedTasks = taskStore.state.filter((task) => task.finished);

  const updateTask = (task: Task): any => {
    taskStore.dispatch({ type: 'TASK_UPDATED', props: { task } });
  };

  const newTask = (): any => {
    taskStore.dispatch({ type: 'TASK_CREATE' });
  };

  const deleteTask = (task: Task): any => {
    taskStore.dispatch({ type: 'TASK_DELETE', props: { task } });
  };

  const doneTask = (task: Task): any => {
    taskStore.dispatch({ type: 'TASK_DONE', props: { task } });
  };

  if (interval.type === 'work') {
    return (
      <Tasks direction="column" data-testid="task-list" justify="flex-start">
        <H1>Tasks</H1>
        {!unfinishedTasks.length ? (
          <p>empty</p>
        ) : unfinishedTasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            doneTask={doneTask}
          />
        ))}
        <Button onClick={() => newTask()} opacity={0.3}><Icon type="add" color="white" /></Button>
        {finishedTasks.map((task) => (
          <Done>
            {task.label}
            <Button opacity={0.3} size="sm" onClick={() => updateTask({ ...task, finished: false })}>
              <Icon
                size="sm"
                type="undo"
                color="white"
              />
            </Button>

            <Button opacity={0.3} size="sm" onClick={() => deleteTask(task)}>
              <Icon
                size="sm"
                type="delete"
                color="white"
              />
            </Button>
          </Done>
        ))}
      </Tasks>
    );
  } return (
    <Tasks data-testid="task-list">
      <Break data-testid="break">
        {interval.label}
      </Break>
    </Tasks>
  );
};

export default TaskList;

const H1 = styled('h1')`
  font-size: 1em;
  margin: 1em 0 0.2em;
`;

const Tasks = styled(Flex)`
  flex: 1;
  height: 100%;
`;

const Break = styled(Flex)`
  padding: 1em;
`;

const BreakIcon = styled(Icon)`
  margin: 0 0.5em;
`;

const Done = styled('span')`
  color: ${theme.color.grey}
`;
