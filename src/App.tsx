// TOFIX: dates preparation
// TODO: add date select

import React, { useState, useEffect } from "react";
import ArrowDatePicker from "./ArrowDatePicker/ArrowDatePicker";
import TopMenu from "./TabMenu/TabMenu";
import Input from "./layout/Input";
import Checklist from "./checklist/Checklist";
import { notePrep } from "./utilities/notePrep";

export type Inote = {
  id: string;
  text: string;
  memo: string;
  date: Date;
  priority: boolean;
};

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [topMenuState, setTopMenuState] = useState("day");
  const [notesContainer, setNotesContainer] = useState<
    | {
        id: string;
        text: string;
        memo: string;
        date: Date;
        priority: boolean;
      }[]
    | null
  >(null);
  const moment = require("moment");

  useEffect(() => {
    const localStorageData = localStorage.getItem("notesContainer") || null;

    if (localStorageData) {
      let tempData = JSON.parse(localStorageData);

      tempData = tempData.map((element: any) => {
        element.date = new Date(element.date);
        return element;
      });
      setNotesContainer(tempData);
    } else {
      setNotesContainer([]);
    }
  }, []);

  useEffect(() => {
    notesContainer &&
      localStorage.setItem("notesContainer", JSON.stringify(notesContainer));
  }, [notesContainer]);

  const notesFilters = (
    tabState: string,
    selectedDate: Date,
    notesList: any
  ) => {
    const [selectedYear, selectedMonth, selectedDay] = [
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
    ];

    let filteredNotes: any = [];

    switch (tabState) {
      case "day":
        filteredNotes = notesList.filter((note: any) => {
          if (
            [selectedYear, selectedMonth, selectedDay].toString() ==
            [
              note.date.getFullYear(),
              note.date.getMonth(),
              note.date.getDate(),
            ].toString()
          ) {
            return note;
          }
        });
        break;

      case "week":
        const startWeek = new Date();
        const endWeek = new Date();
        startWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1);
        startWeek.setFullYear(selectedDate.getFullYear());
        endWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 7);
        endWeek.setDate(selectedDate.getFullYear());

        filteredNotes = notesList.filter((note: any) => {
          if (note.date >= startWeek && note.date <= endWeek) {
            console.log(note.date);
            console.log(selectedDate.getDate());

            return note;
          }
        });
        break;
      case "month":
        filteredNotes = notesList.filter((note: any) => {
          if (
            [selectedYear, selectedMonth].toString() ==
            [note.date.getFullYear(), note.date.getMonth()].toString()
          ) {
            return note;
          }
        });
        break;
      case "year":
        filteredNotes = notesList.filter((note: any) => {
          if (
            [selectedYear].toString() == [note.date.getFullYear()].toString()
          ) {
            return note;
          }
        });
        break;
    }

    return filteredNotes;
  };

  const submitHandler = (inputText: string, date: Date) => {
    if (inputText && notesContainer) {
      setNotesContainer([...notesContainer, notePrep(inputText, date)]);
    }
  };

  return (
    <main className="main-window">
      <TopMenu tabState={topMenuState} setTabState={setTopMenuState} />
      <ArrowDatePicker
        date={selectedDate}
        setDate={setSelectedDate}
        displayOpt={topMenuState}
      />
      <Input onSubmit={submitHandler} />
      {notesContainer && (
        <Checklist
          allNotes={notesFilters(topMenuState, selectedDate, notesContainer)}
          setAllNotes={setNotesContainer}
        />
      )}
    </main>
  );
};

export default App;
