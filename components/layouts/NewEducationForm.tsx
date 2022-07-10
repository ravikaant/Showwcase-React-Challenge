import React, { FC, RefObject, useContext, useRef, useState } from 'react';
import Modal from 'react-modal';
import styled, { ThemeContext } from 'styled-components';
import css from '@styled-system/css';
import { searchSchools, TSchool, TUserEducation } from '../../utils';
import Box, { HoverBox } from '../molecules/Box';
import Button from '../molecules/Button';
import Input, { StyledInput } from '../molecules/Input';
import TextArea from '../molecules/TextArea';
import styles from '../../styles/NewEducationForm.module.css';

type NewEducationFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddEducation: (education: TUserEducation) => void;
};

const NewEducationForm: FC<NewEducationFormProps> = ({ isOpen, onClose, onAddEducation }) => {
  const theme = useContext(ThemeContext);
  const [school, setSchool] = useState<TSchool | undefined>();
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [grade, setGrade] = useState<string>('');
  const [description, setDescription] = useState('');
  const [searchedSchools, setSearchedSchools] = useState<Array<TSchool>>([]);
  const schoolInputRef: RefObject<HTMLInputElement | null | undefined> = useRef();
  const resetState = () => {
    setSchool(undefined);
    setFieldOfStudy('');
    setEndYear('');
    setStartYear('');
    setDescription('');
    setGrade('');
    setSearchedSchools([]);
  }
  const onAdd = () => {
    school &&
      onAddEducation({
        school,
        fieldOfStudy,
        startYear,
        endYear,
        grade: Number(grade) || 0,
        description
      });
    resetState();
  }

  const closeModal = () => {
    resetState();
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          background: theme.colors.overlay,
        },
        content: {
          background: theme.colors.background,
          color: theme.colors.text,
        }
      }}
      className={styles.ReactModal__Content}
    >
      <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='space-between' height='90%' overflow='auto'>
        <Box textAlign='center' fontSize={24} mb={24}>Add education</Box>
        <Box width='100%' position='relative'>
          <Box fontSize={16}>Name of the School</Box>
          <StyledInput
            ref={schoolInputRef}
            onKeyUp={(e) => searchSchools(e.target.value, setSearchedSchools)} />
          {searchedSchools.length > 0 && (
            <Box
              width='100%'
              top='80%'
              border='1px solid'
              borderColor='midgray'
              borderRadius={4}
              bg='background'
              position='absolute'
              maxHeight={200}
              zIndex={24}
              overflow='auto'>
              {searchedSchools.map((school, index) => (
                <HoverBox fontSize={20} key={`${school.name}-${index}`} p={12} onClick={() => {
                  setSchool(school);
                  if (schoolInputRef.current) {
                    schoolInputRef.current.value = school.name;
                  }
                  setSearchedSchools([]);
                }}>
                  {school.name}
                </HoverBox>
              ))}
            </Box>)}
        </Box>
        <Box width='100%'>
          <Box fontSize={16}>Field of study</Box>
          <StyledInput
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)} />
        </Box>
        <Box width={['100%', '32%']}>
          <Box fontSize={16}>Start Year</Box>
          <StyledInput
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)} />
        </Box>
        <Box width={['100%', '32%']}>
          <Box fontSize={16}>End Year(or expected)</Box>
          <StyledInput
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)} />
        </Box>
        <Box width={['100%', '32%']}>
          <Box fontSize={16}>Grade</Box>
          <StyledInput
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder='9.8' />
        </Box>
        <Box width='100%'>
          <Box fontSize={16}>Description</Box>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            resize='vertical'
            width='100%'
            minHeight={200}
            mt={12}
            mb={26}
            p={12}
            fontSize={20}
            border='1px solid'
            color='text'
            borderColor='midgray'
            bg='background'
            borderRadius={4} />
        </Box>
      </Box>
      <Box width='100%' display='flex' justifyContent='flex-end'>
        <Box display='flex' width='40%' justifyContent='space-between'>
          <Button
            flex={1}
            mt={18}
            mr={12}
            variant='secondary'
            display='flex'
            justifyContent='center'
            onClick={closeModal}>
            Cancel
          </Button>
          <Button
            display='flex'
            justifyContent='center'
            flex={1}
            mt={18}
            variant='primary'
            onClick={onAdd}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewEducationForm;
