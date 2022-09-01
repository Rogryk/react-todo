import React from "react";
import "./Display.css";

interface IDisplay {
  upperText: string | null;
  lowerText: string | null;
  onClick: () => void;
}

const Display: React.FC<IDisplay> = ({ upperText, lowerText, onClick }) => {
  const clickHandler = () => {
    onClick();
  };

  return (
    <div className="display-width center-hor white-text">
      <h2 onClick={clickHandler} className="pointer">
        {upperText}
      </h2>
      <p onClick={clickHandler} className="pointer opacity05">
        {lowerText}
      </p>
    </div>
  );
};

export default Display;
