import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import Box from '../molecules/Box';
import Button from '../molecules/Button';
import Input from '../molecules/Input';

type WelcomeProps = {
  onEntername: (name: string) => void
}

const Welcome: FC<WelcomeProps> = ({ onEntername }) => {
  const [enteredName, setEnteredName] = useState('');
  const theme = useContext(ThemeContext);
  const onEnter = () => {
    if (enteredName.length > 2) {
      onEntername(enteredName.charAt(0).toUpperCase() + enteredName.slice(1));
    }
  }

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => setEnteredName(e.target.value);

  const ctaVariant = useMemo(() => enteredName.length > 2 ? 'primary' : 'disabled', [enteredName]);
  return (
    <Box
      display='flex'
      flexDirection='column'
      width='100vw'
      height='100vh'
      justifyContent='space-around'
      alignItems='center'>
      <Box fontSize={16}>Hi there! Welcome to your education showcase.</Box>
      <Box width='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Box fontSize={16}>Type your name and click &ldquo;Enter&rdquo; below to begin!</Box>
        <Input
          width={theme.isMobile ? '80%' : '30%'}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              onEnter();
            }
          }}
          value={enteredName}
          onChange={onChangeValue}
          className='capitalcase'
          textAlign='center'
          mt={20}
          p={12}
          fontSize={20}
          boxShadow='2px 2px 4px gray'
          border='1px solid'
          color='text'
          borderColor='text'
          bg='background'
          borderRadius={4} />
        <Button
          width='max-content'
          mt={18}
          variant={ctaVariant}
          onClick={onEnter}>
            Enter
        </Button>
      </Box>
      <Box />
    </Box >
  );
};

export default Welcome;
