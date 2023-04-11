import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "643106ce9fcb18d5faebfb5b",
          "user": "642ea9db29aa0b2d78e040a8",
          "title": "My title third",
          "description": "second time This is title description",
          "tag": "persihonality",
          "date": "2023-04-08T06:16:46.798Z",
          "__v": 0
        },
        {
          "_id": "643109089fcb18d5faebfb5e",
          "user": "642ea9db29aa0b2d78e040a8",
          "title": "New note",
          "description": "Added this notes",
          "tag": "project",
          "date": "2023-04-08T06:26:16.642Z",
          "__v": 0
        },
        {
          "_id": "643109089fcb18d5faebfb5e",
          "user": "642ea9db29aa0b2d78e040a8",
          "title": "New note",
          "description": "Added this notes",
          "tag": "project",
          "date": "2023-04-08T06:26:16.642Z",
          "__v": 0
        },
        {
          "_id": "643109089fcb18d5faebfb5e",
          "user": "642ea9db29aa0b2d78e040a8",
          "title": "New note",
          "description": "Added this notes",
          "tag": "project",
          "date": "2023-04-08T06:26:16.642Z",
          "__v": 0
        },
        {
          "_id": "643109089fcb18d5faebfb5e",
          "user": "642ea9db29aa0b2d78e040a8",
          "title": "New note",
          "description": "Added this notes",
          "tag": "project",
          "date": "2023-04-08T06:26:16.642Z",
          "__v": 0
        },
        {
          "_id": "643117a9b621a8592b8624b2",
          "user": "642ea9db29aa0b2d78e040a8",
          "title": "New nmbnote",
          "description": "Addedmn this notes",
          "tag": "prjkoject",
          "date": "2023-04-08T07:28:41.478Z",
          "__v": 0
        },
        {
          "_id": "64311f9404c9f33c1651458f",
          "user": "642ea9db29aa0b2d78e040a8",
          "title": "New this  nmbnote",
          "description": "Addedmn this  this notes",
          "tag": "prjkoject what kind of notes you want to delete",
          "date": "2023-04-08T08:02:28.186Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState; 