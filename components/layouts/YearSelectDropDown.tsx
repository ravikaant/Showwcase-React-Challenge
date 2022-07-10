import Image from 'next/image';
import React, { FC, useEffect, useMemo, useState } from 'react';
import Box, { DropDown, HoverBox } from '../molecules/Box';
import ChevronDown from '../../public/chevron-down.svg'
import ChevronUp from '../../public/chevron-up.svg'

type YearSelectDropDownProps = {
  range: Array<number>;
  onSelect: (year: number) => void;
  value: number;
  id: string;
  disabled?: boolean;
}

const YearSelectDropDown: FC<YearSelectDropDownProps> = ({ range, onSelect, value, disabled, id }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const years = useMemo(() => {
    const yrs = [];
    for (let yr = range[0]; yr <= range[1]; yr++) {
      yrs.push(yr);
    }
    return yrs;
  }, [range]);
  const toggleDropDown = () => !disabled && setDropDownOpen(prev => !prev)

  useEffect(() => {
    const selector = document.getElementById(`${id}-dropDownSelector`);
    const dropDownBody = document.getElementById(`${id}-dropDownBody`);
    if (!disabled && selector) {
      const outSideClickListener = (e: MouseEvent) => {
        if (
          dropDownOpen &&
          e.target !== selector &&
          !selector.contains(e.target as Node) &&
          !dropDownBody?.contains(e.target as Node)
        )
          toggleDropDown();
      };
      document.addEventListener('click', outSideClickListener, true);
      return () => {
        document.removeEventListener('click', outSideClickListener, true);
      };
    }
  }, [id, dropDownOpen, disabled]);
  return (
    <Box position='relative' id={id}>
      <DropDown onClick={toggleDropDown} id={`${id}-dropDownSelector`}>
        <Box>{value || ''}</Box>
        <Box color='text' bg='background'>
          {dropDownOpen ? <ChevronUp /> : <ChevronDown />}
        </Box>
      </DropDown>
      {!disabled && dropDownOpen && <Box
        id={`${id}-dropDownBody`}
        width='100%'
        top='calc(100% + 8px)'
        border='1px solid'
        borderColor='midgray'
        borderRadius={4}
        bg='background'
        position='absolute'
        maxHeight={200}
        zIndex={24}
        overflow='auto'>
        {years.map((year, index) => (
          <HoverBox fontSize={20} key={`${year}-${index}`} p={12} onClick={() => {
            onSelect(year);
            toggleDropDown();
          }}>
            {year}
          </HoverBox>))}</Box>}
    </Box>
  );
};


export default YearSelectDropDown;
