import React, { FC, useContext } from 'react';
import { TUserEducation } from '../../utils';
import Box from '../molecules/Box';
import EditIcon from '../../public/edit.svg';
import styles from '../../styles/EducationCard.module.css'
import { ThemeContext } from 'styled-components';

type EducationCardProps = {
  education: TUserEducation;
  id: string;
  onEdit: () => void;
}
const EducationCard: FC<EducationCardProps> = ({ education, id, onEdit }) => {
  const theme = useContext(ThemeContext);
  return (
    <Box bg='gray' p={[20, 40]} mb={20} borderRadius={4} id={id} position='relative' className={theme.isMobile ? '' : styles.cardContainer}>
      <Box position='absolute' right={0} top={0} onClick={onEdit} className={`cursor-pointer ${styles.editEducation}`}>
        <EditIcon />
      </Box>
      <Box fontSize={20} fontWeight={500} width='100%' display='flex' flexDirection='row' alignItems='center' justifyContent={['space-between', 'flex-start']}>
        <Box>{education.school.name}</Box>
        <Box fontWeight={450} fontSize={16} ml={12}>{education.school.country}</Box>
      </Box>
      <Box mt={16} fontSize={16} fontWeight={500} display='flex' alignItems='center'>
        <Box mr={12} fontWeight={400}>
          Degree:
        </Box>
        {education.degree}
      </Box>
      <Box mt={16} fontSize={16} fontWeight={500} display='flex' alignItems='center'>
        <Box mr={12} fontWeight={400}>
          Field of study:
        </Box>
        {education.fieldOfStudy}</Box>
      <Box display='flex' flexDirection={['column', 'row']} fontWeight={400} fontSize={16} mt={16}>
        <Box> Duration: {education.startYear} - {education.endYear}</Box>
        <Box ml={[0, 20]} mt={[16, 0]}>Grade: {education.grade}</Box>
      </Box>
      <Box maxHeight={200} mt={16} fontWeight={450} fontSize={16}>{education.description}</Box>
    </Box>
  );
};

export default EducationCard;
