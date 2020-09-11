import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../../../store/index';
import ActiveSound from '../../../../assets/sound/active.m4a';
import Button from '../../../../components/Button';
import Flex from '../../../../components/Flex';
import Icon from '../../../../components/Icon';
import Popover from '../Popover';
import topLevelIcons from '../../../../components/Icon/topLevel';

export default (): JSX.Element => {
  const { tasks: taskStore } = useContext(store);
  const [expanded, setExpanded] = useState(false);
  const activeSound = new Audio(ActiveSound);

  useEffect(() => {
    activeSound.play();
  }, []);

  const newTask = (type: string) => {
    taskStore.dispatch({ type: 'TASK_CREATE', props: { icon: type } });
    setExpanded(false);
  };

  return (
    <Flex direction="column">
      <Button label="New" onClick={() => setExpanded(true)}>
        <Icon type={expanded ? 'cancel' : 'addCircleOutline'} />
      </Button>

      <Popover selected={expanded} deselect={setExpanded}>
        {expanded ? topLevelIcons.map((icon) => (
          <Button key={icon} onClick={() => newTask(icon)}>
            <Icon type={icon} color="secondary" />
          </Button>
        )) : null}
      </Popover>
    </Flex>
  );
};
