import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IconContext } from "react-icons";
import "./ArrowButtonLR.css";

interface IArrowButton {
  direction: "left" | "right";
  onClick: (direction: string) => void;
}

const ArrowButton: React.FC<IArrowButton> = ({ direction, onClick }) => {
  const clickHandler = () => {
    onClick(direction);
  };

  return (
    <button
      className={`button-styles-reset arrow center-abs-block-vertically arrow_${direction}`}
      onClick={clickHandler}
    >
      <IconContext.Provider value={{ size: "2em" }}>
        {direction === "left" ? <BsChevronLeft /> : <BsChevronRight />}
      </IconContext.Provider>
    </button>
  );
};

export default ArrowButton;
