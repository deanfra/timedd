import React from 'react';
import styled from '@emotion/styled';
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import theme from '../../../../theme';

type Props = {
  selected: boolean
  deselect: any
  children: JSX.Element[] | null
}

export default ({ children, selected, deselect }: Props): JSX.Element | null => (selected ? (
  <Popover direction="column">
    <Button onClick={() => { deselect(); }}>
      <Icon color="secondary" type="cancel" />
    </Button>
    <Flex>
      {children}
    </Flex>
  </Popover>
) : null);

const { secondary, secondaryVariant, border } = theme.color;

const Popover = styled(Flex)`
  border: 1px ${secondary} solid;
  position: absolute;
  z-index: 1;
  top: calc(-0.5em - 1px);
  border-radius: 2em;
  background: rgba(0,0,0, 0.7);
  padding: 0.5em 1em;
`;
