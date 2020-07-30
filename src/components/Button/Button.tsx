import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import theme from '../../theme';

interface Props {
  onClick?: any
  border?: boolean
  label?: string
  size?: 'sm'
  opacity?: number
}

export default ({
  label, children, onClick, size, opacity,
}: PropsWithChildren<Props>) => (
  <Button size={size} tabIndex={0} onClick={onClick} type="button" opacity={opacity}>
    {children}
    {label ? <Label>{label}</Label> : null }
  </Button>
);

//* Styling
const hwSizes = {
  default: '3.5em',
  sm: '1.8em',
};
const fontSizes = {
  default: '0.8em',
  sm: '0.5em',
};

const Label = styled('span')`
  bottom: -0.2em;
  color: ${theme.color.black};
  font-size: ${(props: Props) => fontSizes[props.size || 'default']};
  left: 0;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
`;

const Button = styled('button')`
  background: transparent;
  border-color: ${(props: Props) => (props.border ? theme.color.black : 'transparent')};
  border-radius: 100%;
  border: 1px solid transparent;
  border: none;
  cursor: pointer;
  position: relative;
  opacity: ${(props: Props) => props.opacity};
  height: ${(props: Props) => hwSizes[props.size || 'default']};
  width: ${(props: Props) => hwSizes[props.size || 'default']};
  &:hover, &:focus {
    opacity: 1;
    background: ${theme.color.purpleA700};
  }
`;
