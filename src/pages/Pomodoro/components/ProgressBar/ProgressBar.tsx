import React from 'react';
import styled from '@emotion/styled';
import Flex from '../../../../components/Flex';
import theme from '../../../../theme';

const ProgressBar = ({ pct }: { pct: number }): JSX.Element => (
  <Wrap justify="flex-end" direction="column">
    <Bar pct={pct} />
  </Wrap>
);

export default ProgressBar;

const Wrap = styled(Flex)`
  height: 100%;
  background: #4d4d4d;
`;

const Bar = styled(Flex)`
  width: 1em;
  height: ${(props: {pct: number}) => props.pct}%;
  transition: height 100ms;
  background: ${theme.color.secondary};
`;
