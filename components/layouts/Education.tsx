import React, { FC, useState } from 'react';
import { TUserEducation } from '../../utils';
import Box from '../molecules/Box';
import Button from '../molecules/Button';
import NewEducationForm from './NewEducationForm';
import styles from '../../styles/Education.module.css'

type EducationProps = {
  userName: string;
  userEducation: Array<TUserEducation>;
  setUserEducation: (education: Array<TUserEducation>) => void;
}

const Education: FC<EducationProps> = ({ userName, userEducation, setUserEducation }) => {
  const [newEducationModalOpen, setNewEducationModalOpen] = useState(false);
  const toggleNewEducationModal = () => setNewEducationModalOpen((prev) => !prev);
  const onAddEducation = (education: TUserEducation) => {
    setUserEducation([ education, ...userEducation]);
    toggleNewEducationModal();
  }
  return (
    <Box className={newEducationModalOpen ? styles.filter : ''} pt={80} px={[4, 12]} display='flex' flexDirection='column' alignItems='center'>
      <Box fontSize={24}>Welcome to {userName}'s education page.</Box>
      <Button
        width='max-content'
        mt={18}
        variant='primary'
        onClick={toggleNewEducationModal}>
        Add new Education
      </Button>
      <NewEducationForm isOpen={newEducationModalOpen} onClose={toggleNewEducationModal} onAddEducation={onAddEducation} />
      <Box display='flex' flexDirection='row' width='100%' p={40}>
        <Box width='20%'>{
          userEducation.map(education => <Box key={education.school.name}>{education.school.name}</Box>)
          }</Box>
        <Box width='80%'>{
          userEducation.map(education => <Box key={education.school.name}>{education.school.name}</Box>)
          }</Box>
      </Box>
    </Box>
  );
};

export default Education;
