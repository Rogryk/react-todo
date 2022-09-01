import React from "react";
import "./PopupMenu__button.css";

interface IPopupMenu__button {
  id: any;
  icon?: any;
  text: string | JSX.Element;
  setElementOperation: React.Dispatch<React.SetStateAction<string>>;
}

const PopupMenu__button: React.FC<IPopupMenu__button> = (props) => {
  const clickHandler = () => {
    props.setElementOperation(props.id);
  };

  return (
    <button
      id={props.id}
      className="button-styles-reset popup-menu__button"
      onMouseDown={clickHandler}
    >
      <div className="button__icon">{props.icon}</div>
      <p className="button__text">{props.text}</p>
    </button>
  );
};

export default PopupMenu__button;
