import React, { useEffect, useState, useRef } from "react";
import { Checkbox } from "@mantine/core";
import { TextInput, MantineProvider } from "@mantine/core";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import PopupMenu from "../threeDotMenu/PopupMenu";
import Input from "../layout/Input";
import "./Checklist__element.css";
import "../threeDotMenu/ThreeDotMenu.css";

interface IChecklist__element {
  id: string;
  text: string;
  memo: string;
  date: Date;
  priority: boolean;

  allNotes: {
    id: string;
    text: string;
    memo: string;
    date: Date;
    priority: boolean;
  }[];
  setAllNotes: React.Dispatch<
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

const Checklist__element: React.FC<IChecklist__element> = (props) => {
  const { id, text, memo, priority, allNotes, setAllNotes } = props;

  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMemoInputOpen, setIsMemoInputOpen] = useState(false);
  const [elementOperation, setElementOperation] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (elementOperation) {
      switch (elementOperation) {
        case "pinBtn":
          console.log("pin", id);
          pinElement(id);
          break;
        case "deleteBtn":
          console.log("delete", id);
          deleteElement(id);
          break;
        case "memoBtn":
          setIsMemoInputOpen(true);
          document.getElementById(".text-input")?.focus();
          break;
      }
    }
    return () => {
      setElementOperation(null);
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

  const addMemo = (id: string, memo: string) => {
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

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue) {
      addMemo(id, inputValue);
    }
    setInputValue("");
    setIsMemoInputOpen(false);
  };

  const pinIcon = (
    <PushPinIcon
      className="color_white08 rotate_-45"
      style={{ fontSize: "15" }}
    />
  );
  const noteIcon = (
    <StickyNote2Icon className="color_white08" style={{ fontSize: "15" }} />
  );
  const deleteIcon = (
    <DeleteIcon className="color_white08" style={{ fontSize: "15" }} />
  );
  const menuButtons = [
    [
      ["pinBtn", pinIcon, "Pin on the top"],
      ["memoBtn", noteIcon, "Add a memo"],
      ["deleteBtn", deleteIcon, "delete"],
    ],
    [
      ["pinBtn", pinIcon, "Unpin from the top"],
      ["memoBtn", noteIcon, "Add a memo"],
      ["deleteBtn", deleteIcon, "delete"],
    ],
  ];

  return (
    <>
      <div className="element-container">
        {priority && <PushPinIcon className="element__pin-icon rotate_-45" />}
        <div id={id} className="check-list__element">
          <Checkbox
            className="checkbox"
            checked={checkboxStatus}
            ref={checkboxRef}
            onChange={(event) => checkButtonHandler(event)}
            color="rgb(60, 66, 74)"
          />
          <div className="text-box">
            <p className="element__text x-wrap">{text}</p>
            <p className="element__memo ">{memo}</p>
          </div>
          <div className="three-dot">
            <button
              className="button-styles-reset three-dot__button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onBlur={() => setIsMenuOpen(false)}
            ></button>
          </div>
          {isMenuOpen && (
            <PopupMenu
              buttons={priority ? menuButtons[1] : menuButtons[0]}
              setElementOperation={setElementOperation}
            />
          )}
          {isMemoInputOpen && (
            <MantineProvider theme={{ colorScheme: "dark" }}>
              <form action="submit" onSubmit={(event) => submitHandler(event)}>
                <TextInput
                  autoFocus
                  id="text-input"
                  value={inputValue}
                  onBlur={() => setIsMemoInputOpen(false)}
                  onChange={(event) => setInputValue(event.currentTarget.value)}
                  classNames={{
                    root: "memo-input-root",
                    input: "memo-input-wrapper",
                  }}
                  placeholder="Add a memo..."
                  aria-label="memo input"
                />
              </form>
            </MantineProvider>
          )}
        </div>
      </div>
    </>
  );
};

export default Checklist__element;
