import { fetchSchoolsByQuery } from "../api/universityAPI";

export type TUserEducation = {
  school: TSchool;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
  grade: number;
  description: string;
};

export type TSchool = {
  country: string;
  name: string;
  web_pages: Array<string>;
  alpha_two_code: string
}

export type typeString = string | Array<string>;
export type typeNumber = number | Array<number>;
export type typeStringNumber = typeString | typeNumber;


export type BoxProps = {
  width?: typeStringNumber;
  height?: typeStringNumber;
  minHeight?: typeStringNumber;
  maxHeight?: typeStringNumber;
  minWeight?: typeStringNumber;
  maxWeight?: typeStringNumber;
  fontSize?: typeStringNumber;
  fontWeight?: typeStringNumber;
  top?: typeStringNumber;
  bottom?: typeStringNumber;
  left?: typeStringNumber;
  right?: typeStringNumber;
  border?: typeStringNumber;
  borderColor?: typeString;
  borderRadius?: typeStringNumber;
  position?: typeString;
  display?: typeString;
  flexDirection?: typeString;
  flexWrap?: typeString;
  flex?: typeStringNumber;
  justifyContent?: typeString;
  alignItems?: typeString;
  bg?: typeString;
  color?: typeString;
  textAlign?: typeString;
  m?: typeStringNumber;
  mb?: typeStringNumber;
  mt?: typeStringNumber;
  ml?: typeStringNumber;
  mr?: typeStringNumber;
  mx?: typeStringNumber;
  my?: typeStringNumber;
  p?: typeStringNumber;
  px?: typeStringNumber;
  py?: typeStringNumber;
  pt?: typeStringNumber;
  pb?: typeStringNumber;
  pl?: typeStringNumber;
  pr?: typeStringNumber;
  zIndex?: typeNumber;
  variant?: typeString;
  overflow?: typeString;
  overflowX?: typeString;
  overflowY?: typeString;
  boxShadow?: typeStringNumber
}

export const debounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Array<any>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }
};

const fetchSchools = async (query: string, cb: (schools: Array<any>) => void) => {
  if(query.length === 0) {
    cb([]);
    return;
  }
  const allSchools = await fetchSchoolsByQuery(query);
  cb(allSchools);
}

export const searchSchools = debounce(fetchSchools, 500);

export const throttle = (fn: Function, delay: number) => {
  let flag = true;
  return (...args: Array<any>) => {
    if(flag){
      fn(...args);
      flag = false;
      setTimeout(() => {
        flag=true;
      }, delay);
    }
  }
};

export const startYearRange = [1980, 2022];
