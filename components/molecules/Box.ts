import styled from 'styled-components';
import { color, space, layout, flexbox, typography, position, border, shadow } from 'styled-system';

const Box = styled.div`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${typography}
  ${position}
  ${border}
  ${shadow}

  &.cursor-pointer {
    cursor: pointer;
  }
`;

export default Box;
