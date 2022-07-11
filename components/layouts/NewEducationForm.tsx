import { FC, RefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Modal from 'react-modal';
import { ThemeContext } from 'styled-components';
import styles from '../../styles/NewEducationForm.module.css';
import { searchSchools, startYearRange, TSchool, TUserEducation } from '../../utils';
import Box, { HoverBox } from '../molecules/Box';
import Button from '../molecules/Button';
import { StyledInput } from '../molecules/Input';
import TextArea from '../molecules/TextArea';
import YearSelectDropDown from './YearSelectDropDown';

type NewEducationFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEducation: (education: TUserEducation) => void;
  editMode?: boolean;
  prevEducation?: TUserEducation;
};

const NewEducationForm: FC<NewEducationFormProps> = ({ isOpen, onClose, onSubmitEducation, editMode, prevEducation }) => {
  const theme = useContext(ThemeContext);
  const [school, setSchool] = useState<TSchool | undefined>(editMode ? prevEducation?.school : undefined);
  const [degree, setDegree] = useState(editMode ? prevEducation?.degree : '');
  const [fieldOfStudy, setFieldOfStudy] = useState(editMode ? prevEducation?.fieldOfStudy : '');
  const [startYear, setStartYear] = useState<number>(editMode ? prevEducation?.startYear ?? 0 : 0);
  const [endYear, setEndYear] = useState<number>(editMode ? prevEducation?.endYear ?? 0 : 0);
  const [grade, setGrade] = useState<number>(editMode ? prevEducation?.grade ?? 0 : 0);
  const [description, setDescription] = useState(editMode ? prevEducation?.description : '');
  const [searchedSchools, setSearchedSchools] = useState<Array<TSchool>>([]);
  const [schoolInputNode, setSchoolInputNode] = useState<Node | null>(null);

  const schoolInputRef = useCallback((node: Node) => {
    if(!schoolInputNode && node) {
      setSchoolInputNode(node);
      if(prevEducation) {
        (node as HTMLInputElement).value = prevEducation.school.name;
      }
    }
  }, []);
  const resetState = () => {
    setSchool(undefined);
    setDegree('');
    setFieldOfStudy('');
    setEndYear(0);
    setStartYear(0);
    setDescription('');
    setGrade(0);
    setSearchedSchools([]);
  }
  const onAdd = () => {
    if (school && fieldOfStudy && startYear && endYear && grade && degree && description) {
      onSubmitEducation({
        school,
        degree,
        fieldOfStudy,
        startYear,
        endYear,
        grade,
        description
      });
      resetState();
    }
  }

  const closeModal = () => {
    resetState();
    onClose();
  }

  const endYearRange = useMemo(() => [(startYear ?? 1980) + 1, (startYear ?? 1980) + 10], [startYear]);

  useEffect(() => {
    if (startYear > endYear) {
      setEndYear(0);
    }
  }, [startYear]);

  const onChangeGrade = (e: any) => {
    const newValue = e.target.value;
    if (isNaN(newValue)) {
      return;
    }
    if (newValue === '') {
      setGrade(0);
      return;
    }
    const newGrade =
      newValue.indexOf('.') >= 0
        ? newValue.substr(0, newValue.indexOf('.')) +
        newValue.substr(newValue.indexOf('.'), 3)
        : parseInt(newValue, 10).toString();
    if (parseFloat(newGrade) >= 0 && parseFloat(newGrade) <= 100) {
      setGrade(newGrade);
    }
  };

  useEffect(() => {
    const body = document.getElementsByTagName('body');
    if(body && body.length > 0) {
      body[0].style.overflowY ='hidden';

      return () => {
        if(theme.isMobile) {
          body[0].style.overflowY ='auto';
        }
      }
    }
  });

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
      className={theme.isMobile ? styles.ReactModal__Content__Mobile : styles.ReactModal__Content}
    >
      <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='space-between' height='90%' overflow='auto'>
        <Box textAlign='center' fontSize={24} mb={24}>Add education</Box>
        <Box display='flex' flexDirection='row' height='90%' overflowY='auto' width='100%' flexWrap='wrap' justifyContent='space-between'>
          <Box width='100%' position='relative'>
            <Box fontSize={16}>Name of the School</Box>
            <StyledInput
              placeholder='National Institute of Technology, Patna'
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
                    if (schoolInputNode) {
                      (schoolInputNode as HTMLInputElement).value = school.name;
                    }
                    setSearchedSchools([]);
                  }}>
                    {school.name}
                  </HoverBox>
                ))}
              </Box>)}
          </Box>
          <Box width={['100%', '48%']}>
            <Box fontSize={16}>Degree</Box>
            <StyledInput
              placeholder='B.Tech'
              value={degree}
              onChange={(e) => setDegree(e.target.value)} />
          </Box>
          <Box width={['100%', '48%']}>
            <Box fontSize={16}>Field of study</Box>
            <StyledInput
              placeholder='Computer Science'
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)} />
          </Box>
          <Box width={['100%', '32%']}>
            <Box fontSize={16}>Start Year</Box>
            <YearSelectDropDown range={startYearRange} value={startYear} onSelect={setStartYear} id='startYearDropDown' />
          </Box>
          <Box width={['100%', '32%']}>
            <Box fontSize={16}>End Year(or expected)</Box>
            <YearSelectDropDown range={endYearRange} value={endYear} onSelect={setEndYear} disabled={!startYear} id='endYearDropDown' />
          </Box>
          <Box width={['100%', '32%']}>
            <Box fontSize={16}>Grade</Box>
            <StyledInput
              value={grade || ''}
              onChange={onChangeGrade}
              placeholder='9.8' />
          </Box>
          <Box width='100%'>
            <Box fontSize={16}>Description</Box>
            <TextArea
              placeholder='Completed bachelor degree with a lot of fun...'
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
      </Box>
      <Box width='100%' display='flex' justifyContent='flex-end'>
        <Box display='flex' width={['100%', '40%']} justifyContent='space-between'>
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
            {editMode ? 'Submit' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewEducationForm;
