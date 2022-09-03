import React, { useEffect, useState, useRef } from "react";
import { Checkbox } from "@mantine/core";
import PushPinIcon from "@mui/icons-material/PushPin";
import Element__textContent from "./Element__textContent";
import Element__menu from "./ElementMenu/Element__menu";
import InputPopup from "../layout/InputPopup";
import { Inote } from "../App";
import "./Checklist__element.css";

interface IChecklist__element {
  note: Inote;
  allNotes: Inote[];
  setAllNotes: React.Dispatch<React.SetStateAction<Inote[] | null>>;
}

const Checklist__element: React.FC<IChecklist__element> = (props) => {
  const { allNotes, setAllNotes } = props;
  const { id, text, memo, priority } = props.note;
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [isMemoInputOpen, setIsMemoInputOpen] = useState(false);
  const [elementOperation, setElementOperation] = useState<string>("");
  const checkboxRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (elementOperation) {
      switch (elementOperation) {
        case "pinBtn":
          pinElement(id);
          break;
        case "deleteBtn":
          deleteElement(id);
          break;
        case "memoBtn":
          setIsMemoInputOpen(true);
          inputRef?.current?.focus();
          break;
      }
    }
    return () => {
      setElementOperation("");
    };
  }, [elementOperation]);

  const deleteElement = (id: string) => {
    setAllNotes(
      allNotes.filter((note) => {
        if (note.id !== id) {
          return note;
        }
      })
    );
  };

  const addMemo = (memo: string) => {
    setAllNotes(
      allNotes.map((note) => {
        if (note.id === id) {
          note.memo = memo;
        }
        return note;
      })
    );
  };

  const pinElement = (id: string) => {
    setAllNotes(
      allNotes.map((note) => {
        if (note.id === id) {
          note.priority = !note.priority;
        }
        return note;
      })
    );
  };

  const checkButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStatus((prevStatus: any) => !prevStatus);
    setTimeout(() => {
      checkboxRef.current?.checked && deleteElement(id);
    }, 200); // checkbox handle delay
  };

  const menuClickHandler = (operation: string) => {
    setElementOperation(operation);
  };

  return (
    <div className="element-container">
      {priority && <PushPinIcon className="element__pin-icon rotate_-45" />}
      <div id={id} className="check-list__element">
        <Checkbox
          className="checkbox"
          checked={checkboxStatus}
          ref={checkboxRef}
          onChange={checkButtonHandler}
          color="rgb(60, 66, 74)"
        />
        <Element__textContent note={text} memo={memo} />
        <Element__menu
          menuClickHandler={menuClickHandler}
          buttonsSet={priority ? 1 : 0}
        />
        {isMemoInputOpen && (
          <InputPopup
            ref={inputRef}
            onSubmit={addMemo}
            closePopup={() => setIsMemoInputOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Checklist__element;
