import { LINK } from '../constants';

export const getData = async () => {
  const response = await fetch(LINK);
  if (!response.ok) throw new Error('Failed to load data');
  return response.json();
};
