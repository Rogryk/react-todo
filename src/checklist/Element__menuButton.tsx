import React, { useState } from "react";
import PopupMenu from "./ElementMenu/PopupMenu";
import "./Element__menuButton.css";
import "../index.css";

interface IElement__menuButton {
  isOpen: boolean;
  buttonsSet: number;
  setMenuAction: React.Dispatch<React.SetStateAction<string>>;
}

const Element__menu: React.FC<IElement__menuButton> = ({
  isOpen,
  buttonsSet,
  setMenuAction,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const clickHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const blurHandler = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="three-dot">
        <button
          className="button-styles-reset three-dot__button"
          onClick={clickHandler}
          onBlur={blurHandler}
        ></button>
      </div>
      {isMenuOpen && (
        <PopupMenu
          buttonsSet={buttonsSet}
          setElementOperation={setMenuAction}
        />
      )}
    </>
  );
};

export default Element__menu;
