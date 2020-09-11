import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../../../store/index';
import Button from '../../../../components/Button';
import Popover from '../Popover';
import Icon from '../../../../components/Icon';
import Flex from '../../../../components/Flex';

type Props = {
  id: string
  icon: string
  next: number
}

export default ({ icon, id, next }: Props): JSX.Element => {
  const { tasks } = useContext(store);
  const [selected, setSelected] = useState(false);

  const taskDone = () => {
    tasks.dispatch({ type: 'TASK_DONE', props: { id } });
  };

  const postpone = (activeFrom: number) => {
    tasks.dispatch({ type: 'TASK_POSTPONE', props: { id, activeFrom } });
  };

  return (
    <Flex>
      <Popover selected={selected} deselect={setSelected}>
        <Button onClick={() => { taskDone(); }}>
          <Icon color="secondary" type="check" />
        </Button>
        <Button onClick={() => { postpone(next); }}>
          <Icon color="secondary" type="alarmAdd" />
        </Button>
      </Popover>
      <Button onClick={() => { setSelected(!selected); }}>
        <Icon type={icon} />
      </Button>
    </Flex>
  );
};
