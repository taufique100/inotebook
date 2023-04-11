import React, {useContext} from 'react'
import NoteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';

function Notes() {
    const contex = useContext(NoteContext);
    const {notes, setNotes} = contex;
  return (
<div className="row my-3">
        <h2>Your Note</h2>
        {notes.map((note)=>{
          return <NoteItem note={note}/>;
        })}
      </div>  )
}

export default Notes
