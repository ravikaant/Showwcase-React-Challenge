import { fetchSchoolsByQuery } from "../api/universityAPI";

export type TUserEducation = {
  school: TSchool;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade: number;
  description: string;
};

export type TSchool = {
  country: string;
  name: string;
  web_pages: Array<string>;
  alpha_two_code: string
}

export const debouncedSearch = (fn: Function, delay: number) => {
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

export const searchSchools = debouncedSearch(fetchSchools, 500)
