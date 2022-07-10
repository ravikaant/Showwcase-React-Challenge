export const fetchSchoolsByQuery = async (query: string) => {
  const res = await (await fetch(`http://universities.hipolabs.com/search?name=${query}`)).json();
  return res;
}
