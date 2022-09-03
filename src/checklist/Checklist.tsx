import React from "react";
import Checklist__element from "./Checklist__element";
import "./Checklist.css";
import { Inote } from "../App";

interface IChecklist {
  list: Inote[];
  onUpdate: (updatedNote: Inote) => void;
}

const Checklist: React.FC<IChecklist> = ({ list, onUpdate }) => {
  const pinnedNotes = list.filter((element) => element.priority === true);
  const unpinnedNotes = list.filter((element) => element.priority === false);

  return (
    <div className="scrollbox">
      <section className="check-list-container y-scroll">
        {pinnedNotes.map((note) => {
          return (
            <Checklist__element key={note.id} note={note} onChange={onUpdate} />
          );
        })}
        {pinnedNotes.length > 0 && <div className="notes-separator"></div>}
        {unpinnedNotes.map((note) => {
          return (
            <Checklist__element key={note.id} note={note} onChange={onUpdate} />
          );
        })}
      </section>
    </div>
  );
};

export default Checklist;
