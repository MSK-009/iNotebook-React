import React, { useContext, useEffect, useState, useRef } from 'react'
import NoteContext from '../Context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = () => {


    const context = useContext(NoteContext)
    const { notes, getNotes, updateNote } = context
    let navigate = useNavigate()

    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

    useEffect(() => {
        if ( localStorage.getItem( 'token' ) ){
            getNotes()
        }
        else{
            navigate('/login') 
        }
        // eslint-disable-next-line
    }, [])


    const ref = useRef(null)
    const refClose = useRef(null)


    const editNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }

    const handleUpdateNote = (e) => {
        updateNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text text-bg-info">Title</span>
                                <input type="text" className="form-control" aria-label="Sizing example input" name='etitle' id='etitle' value={note.etitle} aria-describedby="inputGroup-sizing-sm" onChange={onChange} />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text text-bg-info">Description</span>
                                <input type="text" className="form-control" aria-label="Sizing example input" name='edescription' id='edescription' value={note.edescription} aria-describedby="inputGroup-sizing-sm" onChange={onChange} />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text text-bg-info">Tag</span>
                                <input type="text" className="form-control" aria-label="Sizing example input" name='etag' id='etag' value={note.etag} aria-describedby="inputGroup-sizing-sm" onChange={onChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdateNote} disabled={note.etitle.length < 3 || note.edescription.length < 5} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddNote />
            <div>
                <h1 className='my-3'>Your Notes</h1>
                <div className='d-flex flex-wrap'>
                    {notes.length === 0 && 'No notes to display'}
                    {notes.map((note) => { return <NoteItem note={note} key={note._id} updateNote={editNote} /> })}
                </div>
            </div>
        </>
    )
}

export default Notes
