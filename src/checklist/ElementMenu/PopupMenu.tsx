import React from "react";
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
    <div className="popup-menu">
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
  );
};

export default Popup;
