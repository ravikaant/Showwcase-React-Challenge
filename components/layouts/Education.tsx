import { FC, useEffect, useState } from 'react';
import styles from '../../styles/Education.module.css';
import { throttle, TUserEducation } from '../../utils';
import Box from '../molecules/Box';
import Button from '../molecules/Button';
import EducationCard from './EducationCard';
import NewEducationForm from './NewEducationForm';

type EducationProps = {
  userName: string;
  userEducation: Array<TUserEducation>;
  setUserEducation: (education: Array<TUserEducation>) => void;
}

const Education: FC<EducationProps> = ({ userName, userEducation, setUserEducation }) => {
  const [newEducationModalOpen, setNewEducationModalOpen] = useState(false);
  const [editObjectiveIndex, setEditObjectiveIndex] = useState(-1);
  const [selectedEducationIndex, setSelectedEducationIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(false);

  const toggleNewEducationModal = () => {
    setNewEducationModalOpen((prev) => !prev);
    setEditObjectiveIndex(-1);
  }

  const onAddEducation = (education: TUserEducation) => {
    const newUserEducation = [education, ...userEducation]
    setUserEducation(newUserEducation);
    localStorage.setItem('userEducation', JSON.stringify(newUserEducation));
    toggleNewEducationModal();
    const educationContainer = document.getElementById('education-card-container');
    if (educationContainer) {
      educationContainer.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    setSelectedEducationIndex(0);
  }

  const onEditObjective = (newEducation: TUserEducation) => {
    const newUserEducation = [...userEducation];
    newUserEducation[editObjectiveIndex] = newEducation;
    localStorage.setItem('userEducation', JSON.stringify(newUserEducation));
    setUserEducation(newUserEducation);
    setEditObjectiveIndex(-1);
  }

  const onSelectEducation = (index: number) => {
    setAutoScroll(true);
    const selectedEducation = document.getElementById(`educationCard${index}`);
    if (selectedEducation) {
      selectedEducation.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedEducationIndex(index);
    setTimeout(() => setAutoScroll(false), 1000);
  }

  const setEducationIndexOnScroll = () => {
    if (autoScroll) {
      return;
    }
    const educationContainer = document.getElementById('education-card-container');
    if (educationContainer) {
      if (educationContainer.scrollTop === 0) {
        setSelectedEducationIndex(0);
        return;
      }
      for (let educationIndex = 0; educationIndex < userEducation.length; educationIndex++) {
        const currentEducation = document.getElementById(`educationCard${educationIndex}`);
        if (currentEducation && currentEducation.getBoundingClientRect().top >= educationContainer.getBoundingClientRect().top) {
          setSelectedEducationIndex(educationIndex);
          break;
        }
      }
    }
  }

  useEffect(() => {
    setNewEducationModalOpen(editObjectiveIndex !== -1);
  }, [editObjectiveIndex]);

  const onScroll = throttle(setEducationIndexOnScroll, 100);

  return (
    <Box className={newEducationModalOpen ? styles.filter : ''} pt={80} px={[4, 12]} display='flex' flexDirection='column' alignItems='center'>
      <Box fontSize={[20, 24]} textAlign='center'>Welcome to {userName}&#39;s education page.</Box>
      <Button
        width='max-content'
        mt={18}
        variant='primary'
        onClick={toggleNewEducationModal}>
        Add new Education
      </Button>
      {newEducationModalOpen && (
        <NewEducationForm
          isOpen={newEducationModalOpen}
          onClose={toggleNewEducationModal}
          onSubmitEducation={editObjectiveIndex === -1 ? onAddEducation : onEditObjective}
          editMode={editObjectiveIndex !== -1}
          prevEducation={editObjectiveIndex !== -1 ? userEducation[editObjectiveIndex] : undefined} />)}
      {userEducation.length > 0 && (
        <Box display='flex' flexDirection={['column', 'row']} width='100%' maxHeight={['auto', 'calc(100vh - 150px)']} p={[0, 40]} mt={[20, 0]} justifyContent='space-between'>
          <Box width={['100%', '30%']} height='min-content' p={12} bg='gray' borderRadius={4}>
            {userEducation.map((education, index) => (
              <Box
                className='cursor-pointer'
                onClick={() => onSelectEducation(index)}
                key={`${education.school.name}-${index}`}
                fontSize={index === selectedEducationIndex ? 16 : 14}
                fontWeight={index === selectedEducationIndex ? 450 : 400}
                pb={index === userEducation.length - 1 ? 0 : 12}>
                {education.school.name}
              </Box>))}
          </Box>
          <Box width={['100%', '68%']} mt={[20, 0]} maxHeight={['auto', '100%']} overflowY='auto' id='education-card-container' onScroll={onScroll}>
            {userEducation.map((education, index) => <EducationCard key={`${education.school.name}-${index}`} education={education} id={`educationCard${index}`} onEdit={() => setEditObjectiveIndex(index)} />)}
          </Box>
        </Box>)}
    </Box>
  );
};

export default Education;
