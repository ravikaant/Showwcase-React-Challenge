import React, { FC } from 'react';
import { TUserEducation } from '../../utils';
import Box from '../molecules/Box';

type EducationCardProps = {
  education: TUserEducation;
  id: string
}
const EducationCard: FC<EducationCardProps> = ({ education, id }) => {
  return (
    <Box bg='gray' p={[20, 40]} mb={20} borderRadius={4} id={id}>
      <Box fontSize={20} fontWeight={500} width='100%' display='flex' flexDirection='row' alignItems='center' justifyContent={['space-between', 'flex-start']}>
        <Box>{education.school.name}</Box>
        <Box fontWeight={450} fontSize={16} ml={12}>{education.school.country}</Box>
      </Box>
      <Box mt={16} fontSize={18} fontWeight={500}>{education.fieldOfStudy}</Box>
      <Box display='flex' flexDirection={['column','row']} fontWeight={400} fontSize={16} mt={16}>
        <Box> Duration: {education.startYear} - {education.endYear}</Box>
        <Box ml={[0, 20]} mt={[16, 0]}>Grade: {education.grade}</Box>
      </Box>
      <Box maxHeight={200} mt={16} fontWeight={450} fontSize={16}>{education.description}</Box>
    </Box>
  );
};

export default EducationCard;
