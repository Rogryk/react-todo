import React, { useState, useEffect, useRef } from "react";
import { MantineProvider } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useOutsideAlerter } from "../hooks/useOutsideAlerter";
import { useDateArrayState } from "../hooks/useDateArrayState";
import ArrowButton from "./ArrowButtonLR";
import Display from "./Display";
import "./ArrowDatePicker.css";

interface IArrowDatePicker {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  displayOpt: string;
}

const ArrowDatePicker: React.FC<IArrowDatePicker> = ({
  date,
  setDate,
  displayOpt,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const arrowDatePickerRef = useRef<HTMLParagraphElement>(null);
  const isClickedOutside = useOutsideAlerter(arrowDatePickerRef);
  const dateArray = useDateArrayState(date, displayOpt);

  useEffect(() => {
    isClickedOutside && setIsCalendarOpen(false);
  }, [isClickedOutside]);

  const handleDateChange = (value: Date) => {
    value && setDate(value);
  };

  const prepareDisplayText = (displayOpt: string) => {
    if (displayOpt === "day") {
      return [
        date.toLocaleString("en", { weekday: "long" }).toString(),
        `${date.toLocaleString("en", {
          month: "short",
        })} ${date.getDate()}, ${date.getFullYear()}`.toString(),
      ];
    } else if (displayOpt === "week") {
      const startWeek = new Date();
      const endWeek = new Date();
      startWeek.setDate(date.getDate() - date.getDay() + 1);
      endWeek.setDate(date.getDate() - date.getDay() + 7);

      return [
        `${startWeek.getDate()} - ${endWeek.getDate()}`.toString(),
        `${date.toLocaleString("en", {
          month: "short",
        })}, ${date.getFullYear()}`.toString(),
      ];
    } else if (displayOpt === "month") {
      return [
        date.toLocaleString("en", { month: "long" }).toString(),
        date.getFullYear().toString(),
      ];
    } else if (displayOpt === "year") {
      return [date.getFullYear().toString(), null];
    } else {
      return [null, null];
    }
  };

  const [upperText, lowerText] = prepareDisplayText(displayOpt);

  const arrowButtonHandler = (direction: string) => {
    direction === "left" ? setDate(dateArray[0]) : setDate(dateArray[2]);
  };

  const dateDisplayClickHandler = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div
      className="arrowDatePicker center-hor arrowDatePicker_padding"
      ref={arrowDatePickerRef}
    >
      <ArrowButton direction={"left"} onClick={arrowButtonHandler} />
      <Display
        upperText={upperText}
        lowerText={lowerText}
        onClick={dateDisplayClickHandler}
      />
      <ArrowButton direction={"right"} onClick={arrowButtonHandler} />
      {isCalendarOpen && (
        <MantineProvider theme={{ colorScheme: "dark" }}>
          <Calendar
            className="calendar_position calendar_colors arrowPicker__calendar-xposition"
            value={date}
            onChange={handleDateChange}
          />
        </MantineProvider>
      )}
    </div>
  );
};

export default ArrowDatePicker;
