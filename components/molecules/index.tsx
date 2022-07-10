import type { NextPage } from 'next'
import Box from '../StyledComponents/Box'
import { ThemeContext } from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import Theme from '../components/Theme'
import Body from '../components/Body'
import { TUserEducation } from '../utils'

const Home: NextPage = () => {
  const ISSERVER = typeof window === "undefined";
  const [userName, setUserName] = useState<undefined | string>();
  const [userEducation, setUserEducation] = useState<Array<TUserEducation>>([]);
  const themeContext = useContext(ThemeContext);
  useEffect(() => {
    if(!ISSERVER) {
      const userNameFromLocalStorage = localStorage.getItem('userName');
      if(userNameFromLocalStorage) {
        setUserName(userNameFromLocalStorage);
      }
      const userEducationFromLocalStorage = localStorage.getItem('userEducation');
      if(userEducationFromLocalStorage) {
        const parsedUserEducation = JSON.parse(userEducationFromLocalStorage);
        setUserEducation(parsedUserEducation);
      }
    }
  }, [ISSERVER]);

  const onEntername = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
  }

  return (
    <Box
      color='text'
      bg='background'
      minHeight='100vh'
      w='100%'
      position='relative'>
      <Theme />
      <Body userName={userName} userEducation={userEducation} onEntername={onEntername} setUserEducation={setUserEducation} />
    </Box>
  )
}

export default Home
