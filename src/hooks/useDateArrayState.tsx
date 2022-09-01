import { useState, useEffect } from "react";
import { addDays, addWeeks, addMonths, addYears } from "../utilities/addDays";

export const useDateArrayState = (date: Date, displayOpt: string) => {
  const [dateArray, setDateArray] = useState<Date[]>([]);

  useEffect(() => {
    if (displayOpt === "day") {
      setDateArray([addDays(date, -1), date, addDays(date, 1)]);
    } else if (displayOpt === "week") {
      setDateArray([addWeeks(date, -1), date, addWeeks(date, 1)]);
    } else if (displayOpt === "month") {
      setDateArray([addMonths(date, -1), date, addMonths(date, 1)]);
    } else if (displayOpt === "year") {
      setDateArray([addYears(date, -1), date, addYears(date, 1)]);
    }
  }, [date, displayOpt]);

  //   return [dateArray, setDateArray];
  return dateArray;
};
