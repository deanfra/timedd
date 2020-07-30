import React from 'react';
import styled from '@emotion/styled';
import definition from './definition';
import theme from '../../theme';

type Props = { code: string; color?: string; size?: 'sm' }

/* eslint-disable react/jsx-props-no-spreading */
export default ({
  type, ...rest
}: {type:string, color?:string, size?: 'sm'}) => (
  <Base code={definition[type]} {...rest} />
);

//* Styling

const fontSizes = {
  default: '1.5em',
  sm: '0.8em',
};

const Base = styled('i')`
  font-family: 'Material Icons';
  font-style: normal;
  color: ${(props: Props) => theme.color[props.color || 'primary']};
  font-size: ${(props: Props) => fontSizes[props.size || 'default']};
  line-height: 1;
  letter-spacing: normal;
  &:after {
    content: '\\${(props: Props) => props.code}';
  }
`;
