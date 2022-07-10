import React, { FC } from 'react';
import Education from './Education';
import { TUserEducation } from '../../utils';
import Welcome from './Welcome';

type BodyProps = {
  userName: string|undefined;
  userEducation: Array<TUserEducation>;
  onEntername: (name: string) => void;
  setUserEducation: (education: Array<TUserEducation>) => void;
};

const Body: FC<BodyProps> = ({ userName, userEducation, onEntername, setUserEducation }) => {
  return userName ? <Education userName={userName} userEducation={userEducation} setUserEducation={setUserEducation} /> : <Welcome onEntername={onEntername} /> ;
};

export default Body;
