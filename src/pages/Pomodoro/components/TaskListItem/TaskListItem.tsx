import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from '../../../../components/Button';
import definition from '../../../../components/Icon/definition';
import Flex from '../../../../components/Flex';
import Icon from '../../../../components/Icon';
import Task from '../../../../models/Task';
import theme from '../../../../theme';

type Props = {
  task: Task
  updateTask: any
  deleteTask: any
  doneTask: any
}

const TaskListItem = ({
  task, updateTask, doneTask, deleteTask,
}: Props): JSX.Element => {
  const [state, setstate] = useState(task);
  const [softDone, setSoftDone] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setstate(task);
  }, [task.label]);

  const onChange = (type: string, value: string) => {
    setstate({ ...state, ...{ [type]: value } });
  };

  const saveClick = (e: Event) => {
    updateTask(state);
    setEditMode(false);
    e.stopPropagation();
  };

  const cancelClick = (e: Event) => {
    setstate(task);
    setEditMode(false);
    e.stopPropagation();
  };

  const doneClick = (e: Event) => {
    // Done animation
    setSoftDone(true);
    setTimeout(() => {
      doneTask(state);
    }, 500);
    e.stopPropagation();
  };

  const deleteClick = (e: Event) => {
    deleteTask(state);
    e.stopPropagation();
  };

  return (
    <TaskItem
      key={task.id}
      data-testid="task-item"
      direction="row"
      justify="flex-start"
      done={softDone}
    >
      {(editMode && (
        <Flex wrap="wrap">
          <Select value={state.icon} onChange={(e) => onChange('icon', e.target.value)}>
            {
              Object.keys(definition).map((icon) => (
                <option value={icon} selected={state.icon === icon}>
                  {icon}
                </option>
              ))
            }
          </Select>
          <Input value={state.label} onChange={(e) => onChange('label', e.target.value)} />
          <Button onClick={cancelClick}>
            <Icon
              type="close"
              color="white"
            />
          </Button>
          <Button onClick={saveClick}>
            <Icon
              type="check"
              color="white"
            />
          </Button>
          <Button onClick={deleteClick}>
            <Icon
              type="delete"
              color="white"
            />
          </Button>
        </Flex>
      )) || (
        <>
          <TaskIcon type={task.icon} color="white" />
          <Flex grow="1" justify="flex-start">{task.label}</Flex>
          <Button onClick={() => setEditMode(true)} size="sm" opacity={0.3}>
            <Icon type="edit" color="white" size="sm" />
          </Button>
          <Button onClick={doneClick} size="sm" opacity={0.3}>
            <Icon
              type={softDone ? 'check' : 'check'}
              color="white"
              size="sm"
            />
          </Button>

        </>
      )}

    </TaskItem>
  );
};

export default TaskListItem;

//* Styling

type TaskItem = {
  done: boolean;
}

const TaskItem = styled(Flex)`
  flex: 0;
  padding: 0.75em 1em;
  width: 100%;
  transition: 300ms background-color;
  background-color: transparent;
  cursor: pointer;
  transition: opacity 300ms;
  transition-delay: 300ms;
  opacity: ${(props:TaskItem) => (props.done ? 0 : 1)};
  &:hover {
    background-color: ${theme.color.grey};
  }
`;

const Select = styled('select')`
  width: 25%;
  padding: 0.3em 0.5em;
`;

const Input = styled('input')`
  width: 75%;
  padding: 0.3em 0.5em;
`;

const TaskIcon = styled(Icon)`
  margin: 0 0.5em 0 0;
`;
