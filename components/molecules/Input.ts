import styled from 'styled-components';
import {
  color,
  space,
  layout,
  typography,
  position,
  border,
  shadow
} from 'styled-system';

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

export default Input;
