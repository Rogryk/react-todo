import React, { useState } from "react";
import Checklist__element from "./Checklist__element";
import "./Checklist.css";

interface IChecklist {
  allNotes: {
    id: string;
    text: string;
    memo: string;
    date: Date;
    priority: boolean;
  }[];
  setAllNotes: React.Dispatch<
    React.SetStateAction<
      | {
          id: string;
          text: string;
          memo: string;
          date: Date;
          priority: boolean;
        }[]
      | null
    >
  >;
}

const Checklist: React.FC<IChecklist> = ({ allNotes, setAllNotes }) => {
  const [isPinnedNotes, setIsPinnedNotes] = useState(false);
  return (
    <div className="scrollbox">
      <section className="check-list-container y-scroll">
        {allNotes.map((note) => {
          if (note.priority === true) {
            !isPinnedNotes && setIsPinnedNotes(true);
            return (
              <Checklist__element
                key={note.id}
                id={note.id}
                text={note.text}
                memo={note.memo}
                date={note.date}
                priority={note.priority}
                allNotes={allNotes}
                setAllNotes={setAllNotes}
              />
            );
          }
        })}
        {isPinnedNotes && <div className="notes-separator"></div>}
        {allNotes.map((note) => {
          if (note.priority === false) {
            return (
              <Checklist__element
                key={note.id}
                id={note.id}
                text={note.text}
                memo={note.memo}
                date={note.date}
                priority={note.priority}
                allNotes={allNotes}
                setAllNotes={setAllNotes}
              />
            );
          }
        })}
      </section>
    </div>
  );
};

export default Checklist;
