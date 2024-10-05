import { useContext, useState } from "react"
import NoteContext from "./NoteContext"
import AlertContext from "../alert/AlertContext"

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []

  const [notes, setNotes] = useState( notesInitial )
  const { showAlert } = useContext( AlertContext )

  // Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }




  // Add a Note
  const addNote = async (title, description, tag) => {
    // For Server side
    let response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    // For Client side
    const note = await response.json()
    setNotes(notes.concat(note))
  }



  // Delete a Note
  const deleteNote = async (id) => {

    // For Server Side
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    // For Client Side
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  // Update a Note

  // For Server side
  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    }
    )
    const json = await response.json();
    if (json.success){
      let newNotes = JSON.parse(JSON.stringify(notes))
      // For Client side
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes)
      showAlert("Success: Your Note has been updated", "success")
    }

    else{
      showAlert("Error: Failed to update your note", "danger")
    }
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, updateNote, deleteNote, getNotes }}>
      {props.children};
    </NoteContext.Provider>
  )
}

export default NoteState;