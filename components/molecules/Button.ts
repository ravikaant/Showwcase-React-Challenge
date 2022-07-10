import styled from 'styled-components';
import { variant } from 'styled-system';
import css from '@styled-system/css';
import Box from './Box';

const Button = styled(Box)(
  css({
    px: 4,
    py: 2,
    border: 1,
    bg: 'gray',
    fontSize: 18,
    borderRadius: 4,
    color: 'text',
  }),
  variant({
    variants: {
      primary: {
        bg: 'gray',
        border: '1px solid',
        cursor: 'pointer',
        borderColor: 'midgray',
        ':hover': {
          bg: 'midgray'
        }
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
        ':hover': {
          bg: 'gray'
        }
      }
    }
  })
)

export default Button;
