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
  onChange: (updatedNote: Inote) => void;
  scrollBoxRef: any;
}

const Checklist__element: React.FC<IChecklist__element> = (props) => {
  const { note, onChange, scrollBoxRef } = props;

  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [isMemoInputOpen, setIsMemoInputOpen] = useState(false);
  const [elementOperation, setElementOperation] = useState<string>("");
  const checkboxRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (elementOperation) {
      switch (elementOperation) {
        case "pinBtn":
          pinElement();
          break;
        case "deleteBtn":
          deleteElement();
          break;
        case "memoBtn":
          setIsMemoInputOpen(true);
          inputRef?.current?.focus();
          break;
      }
      onChange(note);
    }
    return () => {
      setElementOperation("");
    };
  }, [elementOperation]);

  const deleteElement = () => {
    note.text = "";
    note.memo = "";
  };

  const pinElement = () => {
    note.priority = !note.priority;
  };

  const memoInputHandler = (memo: string) => {
    note.memo = memo;
  };

  const checkButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStatus((prevStatus: boolean) => !prevStatus);
    setTimeout(() => {
      checkboxRef.current?.checked && setElementOperation("deleteBtn");
    }, 200); // checkbox handle delay
  };

  const menuClickHandler = (operation: string) => {
    setElementOperation(operation);
  };

  return (
    <div className="element-container">
      {note.priority && (
        <PushPinIcon className="element__pin-icon rotate_-45" />
      )}
      <div id={note.id} className="check-list__element">
        <Checkbox
          className="checkbox"
          checked={checkboxStatus}
          ref={checkboxRef}
          onChange={checkButtonHandler}
          color="rgb(60, 66, 74)"
        />
        <Element__textContent note={note.text} memo={note.memo} />
        <Element__menu
          menuClickHandler={menuClickHandler}
          buttonsSet={note.priority ? 1 : 0}
        />
        {isMemoInputOpen && (
          <InputPopup
            ref={inputRef}
            onSubmit={memoInputHandler}
            closePopup={() => setIsMemoInputOpen(false)}
            value={note.memo}
          />
        )}
      </div>
    </div>
  );
};

export default Checklist__element;
