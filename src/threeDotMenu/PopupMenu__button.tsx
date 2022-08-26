import React from "react";
import "./PopupMenu__button.css";

interface IPopupMenu__button {
  id?: any;
  icon?: any;
  text: any;
  setElementOperation: React.Dispatch<React.SetStateAction<null>>;
}

const PopupMenu__button: React.FC<IPopupMenu__button> = ({
  id,
  icon,
  text,
  setElementOperation,
}) => {
  return (
    <button
      id={id}
      className="button-styles-reset popup-menu__button"
      onMouseDown={() => setElementOperation(id)}
    >
      <div className="button__icon">{icon}</div>
      <p className="button__text">{text}</p>
    </button>
  );
};

export default PopupMenu__button;
