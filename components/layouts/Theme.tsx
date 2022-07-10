import React, { FC, memo, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Box from '../molecules/Box';
import ShowwcaseIcon from '../../public/showwcase.svg';

const Theme = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <Box
      onClick={themeContext.toggleTheme}
      className='cursor-pointer'
      p={2}
      mt={2}
      mr={2}
      position='absolute'
      right={0}>
      <ShowwcaseIcon />
    </Box>
  );
};

export default Theme;
