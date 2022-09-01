import React from "react";
import "./Element__textContent.css";

interface IElement__Text {
  note: string;
  memo: string;
}

const Element__Text: React.FC<IElement__Text> = ({ note, memo }) => {
  return (
    <div className="text-box">
      <p className="element__text x-wrap">{note}</p>
      <p className="element__memo ">{memo}</p>
    </div>
  );
};

export default Element__Text;
