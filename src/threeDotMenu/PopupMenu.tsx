import React from "react";
import PopupMenu__button from "./PopupMenu__button";
import "./PopupMenu.css";

interface IPopupMenu {
  buttons: (JSX.Element | string | React.MutableRefObject<undefined>)[][];
  setElementOperation: React.Dispatch<React.SetStateAction<null>>;
}

const Popup: React.FC<IPopupMenu> = (props) => {
  return (
    <div className="popup-menu">
      {props.buttons.map((button, index) => {
        return (
          <PopupMenu__button
            key={index}
            id={button[0]}
            icon={button[1]}
            text={button[2]}
            setElementOperation={props.setElementOperation}
          />
        );
      })}
    </div>
  );
};

export default Popup;
