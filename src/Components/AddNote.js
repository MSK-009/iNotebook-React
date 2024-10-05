import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext'
import AlertContext from '../Context/alert/AlertContext'

const AddNote = () => {

    const [note, setNote] = useState( { title: "", description: "", tag: "" } )

    const context = useContext( NoteContext )
    const { addNote } = context

    const alertContext = useContext( AlertContext )
    const { showAlert } = alertContext

    const handleAddNote = ( e ) => {
        e.preventDefault();
        if ( note.title.length === 0 || note.description.length === 0 ) {
            showAlert( "Title or Description should not be empty", "info" )
            return

        }
        addNote( note.title, note.description, note.tag )
        showAlert("Your note has been added", "success")
        setNote( { title: "", description: "", tag: "" } )
        
    }

    const onChange = ( e ) => {
        setNote({ ...note, [ e.target.name ]: e.target.value })
    }
    return (
        <div>
            <div>
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={ onChange } value={ note.title } />
                        <div id="emailHelp" className="form-text">We'll never share your notes with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={ onChange } value={ note.description } />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={ onChange } value={ note.tag } />
                    </div>
                    <div className='d-flex flex-row-reverse'>
                        <button type="submit" className="btn btn-primary" onClick={ handleAddNote } disabled= { note.title.length < 3 || note.description.length < 5 } >Add Note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote
