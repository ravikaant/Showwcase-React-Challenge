import styled from 'styled-components';
import { color, space, layout, flexbox, typography, position, border, shadow } from 'styled-system';
import css from '@styled-system/css';

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

  &.hover-color {
    &:hover {
      background-color: gray;
    }
  }
`;

export const HoverBox = styled(Box)(
  css({
    bg: 'background',
    borderBottom: '1px solid',
    borderColor: 'midgray',
    cursor: 'pointer',
    ':hover': {
      bg: 'gray',
    },
    ':last-child': {
      border: 'none'
    }
  })
)
export default Box;
