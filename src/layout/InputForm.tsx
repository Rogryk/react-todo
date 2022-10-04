import React, { useState, useEffect, useRef } from "react";
import { TextInput } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconAlignLeft, IconCalendar } from "@tabler/icons";
import { useOutsideAlerter } from "../hooks/useOutsideAlerter";
import "../index.css";

interface IInputForm {
  onSubmit: (inputText: string, date: Date) => void;
}

const Input: React.FC<IInputForm> = ({ onSubmit }) => {
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
    inputValue.trim() && onSubmit(inputValue, date);

    // reset component states
    setInputValue("");
    setDate(new Date());
    setIsCalendarOpen(false);
  };

  const handleDateChange = (value: Date) => {
    setDate(value);
  };

  return (
    <form
      className="input-form"
      action="submit"
      onSubmit={submitHandler}
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
          onChange={handleDateChange}
        />
      )}
    </form>
  );
};

export default Input;
