import React from "react";
import { Inote } from "../App";

const dateContext = React.createContext({
  selectedDate: new Date(),
});

const allNotesContext: React.ContextType<Inote[] | any> = React.createContext({
  allNotes: null,
});
