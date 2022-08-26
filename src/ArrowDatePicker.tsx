import React, { useState, useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { addDays, addWeeks, addMonths, addYears } from "./utilities/addDays";
import { MantineProvider } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useOutsideAlerter } from "./hooks/useOutsideAlerter";
import { weekdays } from "moment";

interface IArrowDatePicker {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  displayOpt?: string;
}

const ArrowDatePicker: React.FC<IArrowDatePicker> = ({
  date,
  setDate,
  displayOpt,
}) => {
  const [dateArray, setDateArray] = useState<Date[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const sectionRef = useRef<HTMLParagraphElement>(null);
  const isClickedOutside = useOutsideAlerter(sectionRef);

  useEffect(() => {
    setIsCalendarOpen(false);
  }, [isClickedOutside]);

  useEffect(() => {
    if (displayOpt === "day") {
      setDateArray([addDays(date, -1), date, addDays(date, 1)]);
    } else if (displayOpt === "week") {
      setDateArray([addWeeks(date, -1), date, addWeeks(date, 1)]);
    } else if (displayOpt === "year") {
    } else if (displayOpt === "month") {
      setDateArray([addMonths(date, -1), date, addMonths(date, 1)]);
    } else if (displayOpt === "year") {
      setDateArray([addYears(date, -1), date, addYears(date, 1)]);
    }
  }, [date, displayOpt]);

  const handleDateChange = (value: Date) => {
    setDate(value);
  };

  let title = null;
  let description = null;

  if (displayOpt === "day") {
    title = date.toLocaleString("en", { weekday: "long" });
    description = `${date.toLocaleString("en", {
      month: "short",
    })} ${date.getDate()}, ${date.getFullYear()}`;
  } else if (displayOpt === "week") {
    const startWeek = new Date();
    const endWeek = new Date();
    startWeek.setDate(date.getDate() - date.getDay() + 1);
    endWeek.setDate(date.getDate() - date.getDay() + 7);

    title = `${startWeek.getDate()} - ${endWeek.getDate()}`;
    description = `${date.toLocaleString("en", {
      month: "short",
    })}, ${date.getFullYear()}`;
  } else if (displayOpt === "month") {
    title = date.toLocaleString("en", { month: "long" });
    description = date.getFullYear();
  } else if (displayOpt === "year") {
    title = date.getFullYear();
    description = null;
  }

  return (
    <>
      <section ref={sectionRef} className="slide-pick slide-pick_position">
        <IconContext.Provider value={{ size: "2em" }}>
          <button
            className="button-styles-reset arrow center-abs-block-vertically arrow_left"
            onClick={() => setDate(dateArray[0])}
          >
            <BsChevronLeft />
          </button>
          <div className="element white-text">
            <h2 className="element__name">{title}</h2>
            <p
              ref={sectionRef}
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="element__description"
            >
              {description}
            </p>
          </div>

          <button
            className="button-styles-reset arrow center-abs-block-vertically arrow_right"
            onClick={() => setDate(dateArray[2])}
          >
            <BsChevronRight />
          </button>
        </IconContext.Provider>
        {isCalendarOpen && (
          <MantineProvider theme={{ colorScheme: "dark" }}>
            <Calendar
              className="calendar_position calendar_colors arrowPicker__calendar-xposition"
              value={date}
              onChange={handleDateChange}
              styles={(theme) => ({
                cell: {
                  color: theme.colors.gray[1],
                },
              })}
            />
          </MantineProvider>
        )}
      </section>
    </>
  );
};

export default ArrowDatePicker;
