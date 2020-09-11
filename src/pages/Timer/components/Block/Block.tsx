import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import Flex from '../../../../components/Flex';
// import Interval from '../../../../models/Interval';
import ITask from '../../../../models/Task';
import NewTask from '../NewTask';
import Task from '../Task';
import theme from '../../../../theme';

type Props = {
  int: any;
  tasks: ITask[];
  tick: number;
}

type StyleProps = {
  active: boolean
  elapsed: boolean
}

export default ({
  int, tasks, tick,
}: Props): JSX.Element | null => {
  const elapsed = int.activeUntil < tick;
  const active = int.activeFrom <= tick && !elapsed;
  const secondsLeft = Math.floor(((int.activeUntil - tick) / 1000));
  const minutesLeft = Math.floor(secondsLeft / 60);

  return active ? (
    <BlockWrap>
      <Block active={active} elapsed={elapsed}>
        <FlexWrap className="block__tasks">
          {tasks.map(({
            id, icon, label, activeFrom,
          }, i) => (activeFrom < int.activeUntil ? (
            <Task next={int.activeUntil} key={label} icon={icon} id={id} />
          ) : null))}
        </FlexWrap>
        <Flex>
          <NewTask />
        </Flex>
        <Test>
          {`${minutesLeft}:${(secondsLeft - (minutesLeft * 60))}`}
        </Test>
      </Block>
    </BlockWrap>
  ) : null;
};

const { primary, primaryVariant, border } = theme.color;

const FlexWrap = styled(Flex)`
  flex-wrap: wrap;
  min-width: 2em;
  margin: 1em 1em;
  font-size: 1em;
`;

const BlockWrap = styled(FlexWrap)`
  margin: 4em 1em;
`;

const Block = styled('div')`
  border: 1px solid transparent;
  border-color: ${(props: StyleProps) => `${(props.active && primary) || (props.elapsed && primaryVariant) || border}`};
  color: ${(props: StyleProps) => `${props.active ? primary : 'transparent'}`};
  padding: 1em;
  max-width: 20rem;

  border-radius: 1em;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  transition: border-color 300ms, width 300ms, height 300ms, color 300ms;
`;

const Test = styled('span')`
  font-size: 0.75em;
  color: ${border};
`;
