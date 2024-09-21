import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Style/UpdateNote.css';
import InputNote from './InputNote';
export default function Edit({ onClose, setNoteCreated, noteCreated }) {

    const { id } = useParams();

    const [edit, setedit] = useState(true);

    const close = () => {
        onClose(true)
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    {/* <h2>Note Details</h2> */}
                    <br />
                    <InputNote editn={edit} close={close} setNoteCreated={setNoteCreated} noteCreated={noteCreated} />

                    {/* <button onClick={close}>Close</button> */}
                </div>
            </div>
        </>
    )
}