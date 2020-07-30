import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import ActiveSound from '../../../../assets/sound/active.m4a';
import Flex from '../../../../components/Flex';
import Interval from '../../../../models/Interval';
import ProgressBar from '../ProgressBar';
import Task from '../../../../models/Task';
import theme from '../../../../theme';
import TaskList from '../TaskList';

type Props = {
  interval: Interval,
  curTime: number,
  tasks: Task[]
}
const Block = ({ interval }: Props): JSX.Element => {
  const pctLeft = Math.floor((interval.remaining / interval.duration) * 100);
  const activeSound = new Audio(ActiveSound);

  useEffect(() => {
    if (interval.remaining === interval.duration) {
      activeSound.play();
    }
  }, []);

  return (
    <BlockWrap data-testid="block-wrap" align="flex-start">
      <TaskList interval={interval} />
      <ProgressBar pct={pctLeft} />
    </BlockWrap>
  );
};

export default Block;

const BlockWrap = styled(Flex)`
  background: ${theme.color.black};
  border-radius: 1em;
  overflow: hidden;
  min-height: 13em;
  max-width: 20em;
  width: 100%;
`;
