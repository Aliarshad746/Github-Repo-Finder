import { MONTHS } from "./contants";

// format Date in dd MMM yy format
export const getFormattedDate = (timestamp = '') => {
    
      const date = new Date(timestamp);
      const day = date.getDate();
      const month = MONTHS[date.getMonth()];
      const year = date.getFullYear().toString().slice(-2);
    
      return `${day} ${month} ${year}`;
}