import React, { useState, useEffect, useRef } from "react";
import { TextInput, MantineProvider } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconAlignLeft, IconCalendar } from "@tabler/icons";
import { notePrep } from "../utilities/notePrep";
import { useOutsideAlerter } from "../hooks/useOutsideAlerter";
import "../index.css";

interface IInput {
  notesContainer:
    | {
        id: string;
        text: string;
        memo: string;
        date: Date;
        priority: boolean;
      }[]
    | null;
  setNotesContainer: React.Dispatch<
    React.SetStateAction<
      | {
          id: string;
          text: string;
          memo: string;
          date: Date;
          priority: boolean;
        }[]
      | null
    >
  >;
}

const Input: React.FC<IInput> = ({ notesContainer, setNotesContainer }) => {
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isClickedOutside = useOutsideAlerter(formRef);

  const moment = require("moment");

  useEffect(() => {
    setIsCalendarOpen(false);
  }, [isClickedOutside]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue && notesContainer) {
      setNotesContainer([...notesContainer, notePrep(inputValue, date)]);
    }
    setInputValue("");
    setIsCalendarOpen(false);
    setDate(new Date());
  };

  const handleDateChange = (value: Date) => {
    setDate(value);
  };

  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <form
        className="input-form"
        action="submit"
        onSubmit={(event) => submitHandler(event)}
        ref={formRef}
      >
        <TextInput
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          classNames={{ root: "text-input-root", input: "text-input-wrapper" }}
          placeholder="Add a task..."
          icon={<IconAlignLeft size={14} />}
          rightSection={
            <IconCalendar
              className="hov-pointer color_white06"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            />
          }
          aria-label="task input"
        />
        {isCalendarOpen && (
          <Calendar
            className="calendar_position calendar_colors"
            value={date}
            // month={date}
            onChange={handleDateChange}
          />
        )}
      </form>
    </MantineProvider>
  );
};

export default Input;
