import { setHours, setMinutes } from 'date-fns';

const convertSharp = (date: string | Date) => setMinutes(setHours(date, 0), 0);

export default convertSharp;
