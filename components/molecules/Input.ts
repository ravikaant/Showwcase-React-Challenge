import styled from 'styled-components';
import {
  color,
  space,
  layout,
  typography,
  position,
  border,
  shadow,
  variant
} from 'styled-system';
import css from '@styled-system/css';

const Input = styled.input`
  ${space}
  ${color}
  ${layout}
  ${typography}
  ${position}
  ${border}
  ${shadow}

  outline: none;

  &:focus {
    outline: none;
    border-color: 'text';
  }

  &.capitalcase {
    text-transform: capitalize;
  }
`;

export const StyledInput = styled(Input)(
  css({
    mt: 12,
    mb: 26,
    p: 12,
    fontSize: 20,
    border: '1px solid',
    color: 'text',
    borderColor: 'midgray',
    bg: 'background',
    borderRadius: 4,
    width: '100%',
  })
);

export default Input;
