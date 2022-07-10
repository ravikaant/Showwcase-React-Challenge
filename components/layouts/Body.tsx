import React, { FC } from 'react';
import Welcome from './Welcome';

type BodyProps = {
  userName: string|undefined;
  onEntername: (name: string) => void;
};


const Body: FC<BodyProps> = ({ userName, onEntername }) => {
  return <Welcome onEntername={onEntername} /> ;
};

export default Body;
