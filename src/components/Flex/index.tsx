import styled from '@emotion/styled';

type Props = {
  align?: string;
  grow?: string;
  direction?: string;
  justify?: string;
  wrap?: string;
}

export default styled('div')`
  display: flex;
  position: relative;
  flex-grow: ${({ grow }:Props) => grow || 'inherit'};
  align-items: ${({ align }:Props) => align || 'center'};
  justify-content: ${({ justify }:Props) => justify || 'center'};
  flex-direction: ${({ direction }:Props) => direction || 'row'};
  flex-wrap: ${({ wrap }:Props) => wrap || 'inherit'};
`;
