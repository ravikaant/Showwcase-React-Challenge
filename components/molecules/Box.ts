import styled from 'styled-components';
import { color, space, layout, flexbox, typography, position, border, shadow } from 'styled-system';
import css from '@styled-system/css';
import { BoxProps } from '../../utils';

const Box = styled.div<BoxProps>`
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
);

export const DropDown = styled(Box)(
  css({
    bg: 'background',
    color: 'text',
    cursor: 'pointer',
    border: '1px solid',
    borderColor: 'midgray',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: 12,
    mb: 26,
    p: 12,
    fontSize: 20,
    borderRadius: 4,
    width: '100%',
  })
);
export default Box;
