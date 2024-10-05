import React, { useContext } from 'react'
import NoteContext from "../Context/notes/NoteContext"
import AlertContext from '../Context/alert/AlertContext'


const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const { deleteNote } = context

    const alertContext = useContext(AlertContext)
    const { showAlert } = alertContext

    const handleDeleteNote = () => {
        deleteNote( note._id )
        showAlert(`${ note.title } has been deleted!`, 'danger')
    }

    const { note,  updateNote } = props;

    return (
        <>
            <div>
                <div className="card mx-1 position-relative my-1" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <div className='d-flex justify-content-between align-items-center'>
                            <h5 className="card-title">{ note.title }</h5>
                            <div className='d-flex gap-3'>
                                <i className="fa-solid fa-pen-to-square" onClick={ ()=>{ updateNote(note) } }></i>
                                <i className="fa-solid fa-trash" onClick={ handleDeleteNote }></i>
                            </div>
                        </div>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{ note.tag }</h6>
                        <p className="card-text">{ note.description }</p>
                        <a href="/" className="card-link">Card link</a>
                        <a href="/" className="card-link">Another link</a>
                    </div>
                </div>

            </div>
        </>
    )
}

export default NoteItem
