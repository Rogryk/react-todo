import React from "react";
import "./PopupMenu__button.css";

interface IPopupMenu__button {
  id: string;
  icon?: string | JSX.Element;
  text: string;
  onClick: (operation: string) => void;
}

const PopupMenu__button: React.FC<IPopupMenu__button> = (props) => {
  const clickHandler = () => {
    props.onClick(props.id);
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
