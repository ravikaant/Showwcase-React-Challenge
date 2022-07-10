import styled from 'styled-components';
import {
  color,
  space,
  layout,
  typography,
  position,
  border,
  shadow,
  compose,
  variant,
} from 'styled-system';
import css from '@styled-system/css';
import { BoxProps } from '../../utils';

const TextArea = styled.textarea<BoxProps | {resize?: string | Array<string>}>(
  css({
    outline: 'none',
    '&:focus': {
      outline: 'none',
      borderColor: 'text',
    },
  }),
  variant({
    prop: 'resize',
    variants: {
      vertical: {
        resize: 'vertical'
      },
      horizontal: {
        resize: 'horizontal',
      }
    }
  }),
  compose(
    space,
    color,
    layout,
    typography,
    position,
    border,
    shadow,
  )
);

export default TextArea;
