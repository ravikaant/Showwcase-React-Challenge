import { Children } from 'react';
import styled from 'styled-components';
import { color, space, layout, flexbox, typography, position, border, shadow, compose, variant } from 'styled-system';
import Box from './Box';

const Button = styled(Box)(
  variant({
    variants: {
      primary: {
        bg: 'gray',
        border: '1px solid',
        cursor: 'pointer',
        borderColor: 'midgray',
      },
      disabled: {
        cursor: 'default',
        bg: 'gray',
        color: 'midgray',
      },
      secondary: {
        cursor: 'pointer',
        bg: 'background',
        border: '1px solid',
        borderColor: 'midgray',
      }
    }
  })
)
Button.defaultProps = {
  px: 4,
  py: 2,
  border: 1,
  bg: 'gray',
  fontSize: 18,
  borderRadius: 4,
  color: 'text',
}
export default Button;
