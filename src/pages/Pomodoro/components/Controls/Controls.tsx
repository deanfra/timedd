import React from 'react';
import styled from '@emotion/styled';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import Flex from '../../../../components/Flex';

type Props = {
  next: () => void,
  replay: () => void,
  previous: () => void,
  playPause: () => void,
  skip: () => void,
  paused: boolean
}

const Controls = ({
  playPause,
  paused,
  previous,
  replay,
  skip,
  next,
}: Props): JSX.Element => (
  <Wrap>
    <Button onClick={() => previous()} opacity={0.3}>
      <Icon color="white" type="skipPrevious" />
    </Button>
    <Button onClick={() => replay()} opacity={0.3}>
      <Icon color="white" type="replay30" />
    </Button>
    <Button onClick={() => playPause()} opacity={0.3}>
      <Icon color="white" type={paused ? 'playArrow' : 'pause'} />
    </Button>
    <Button onClick={() => skip()} opacity={0.3}>
      <Icon color="white" type="forward30" />
    </Button>
    <Button onClick={() => next()} opacity={0.3}>
      <Icon color="white" type="skipNext" />
    </Button>
  </Wrap>
);

export default Controls;

const Wrap = styled(Flex)`
  margin: 1em 0;
`;
