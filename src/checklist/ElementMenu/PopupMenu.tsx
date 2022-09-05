import React, { useState, useRef, useEffect } from "react";
import PopupMenu__button from "./PopupMenu__button";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import "./PopupMenu.css";

interface IPopupMenu {
  buttonsSet: number;
  onClick: (operation: string) => void;
}

const Popup: React.FC<IPopupMenu> = (props) => {
  const [isOverflowing, setIsOverflowing] = useState<boolean | null>(null);
  const [loadingState, setloadingState] = useState(true);
  const popupMenuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!!popupMenuRef.current) {
      const offsetTop =
        popupMenuRef.current.parentElement?.parentElement?.parentElement
          ?.offsetTop ?? 0;
      console.log(offsetTop);
      offsetTop > maxPopupOverflowPosition
        ? setIsOverflowing(true)
        : setIsOverflowing(false);
    }
    setloadingState(false);
    console.log("loading done");

    return () => {
      setIsOverflowing(null);
    };
  }, []);

  const maxPopupOverflowPosition = 181;

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

  const buttons = [
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
      <div
        ref={popupMenuRef}
        // className={`popup-menu ${
        //   isOverflowing
        //     ? "popup-menu_top-position-reversed popup-menu_size"
        //     : "popup-menu_top-position popup-menu_size"
        // }`}
        className="popup-menu popup-menu_size popup-menu_top-position-reversed"
      >
        {buttons[props.buttonsSet].map((button, index) => {
          return (
            <PopupMenu__button
              key={index}
              id={button[0].toString()}
              icon={button[1]}
              text={button[2].toString()}
              onClick={props.onClick}
            />
          );
        })}
      </div>
    </>
  );
};

export default Popup;
