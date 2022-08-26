import { uniqueIdGenerator } from "./uniqueIdGenerator";

export const notePrep = (text: string, date = new Date()) => {
  return {
    id: String(uniqueIdGenerator()),
    text: text,
    memo: "",
    date: date,
    priority: false,
  };
};
