import React, { useState } from "react";
import PopupMenu from "../ElementMenu/PopupMenu";
import "./Element__menu.css";

interface IElement__menuButton {
  buttonsSet: number;
  menuClickHandler: (operation: string) => void;
}

const Element__menu: React.FC<IElement__menuButton> = ({
  buttonsSet,
  menuClickHandler,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const clickHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const blurHandler = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="menu">
      <button
        className="button-styles-reset menu__mainButton"
        onClick={clickHandler}
        onBlur={blurHandler}
      ></button>
      {isMenuOpen && (
        <PopupMenu buttonsSet={buttonsSet} onClick={menuClickHandler} />
      )}
    </div>
  );
};

export default Element__menu;
