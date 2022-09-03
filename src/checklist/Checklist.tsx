import React, { useState } from "react";
import Checklist__element from "./Checklist__element";
import "./Checklist.css";
import { Inote } from "../App";

interface IChecklist {
  allNotes: Inote[];
  setAllNotes: React.Dispatch<React.SetStateAction<Inote[] | null>>;
}

const Checklist: React.FC<IChecklist> = ({ allNotes: list, setAllNotes }) => {
  const [isPinnedNotes, setIsPinnedNotes] = useState(false);
  return (
    <div className="scrollbox">
      <section className="check-list-container y-scroll">
        {list.map((note) => {
          if (note.priority === true) {
            !isPinnedNotes && setIsPinnedNotes(true);
            return (
              <Checklist__element
                key={note.id}
                note={note}
                allNotes={list}
                setAllNotes={setAllNotes}
              />
            );
          }
        })}
        {isPinnedNotes && <div className="notes-separator"></div>}
        {list.map((note) => {
          if (note.priority === false) {
            return (
              <Checklist__element
                key={note.id}
                note={note}
                allNotes={list}
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
