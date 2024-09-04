import React, { useState } from 'react'
import '../Style/search.css'
import IconBar from './IconBar';
import { createNote } from '../Services/noteService';

export default function InputNote({setNoteCreated}) {
    const [isExpanded, setIsExpanded] = useState(false);


    const [data, setData] = useState({
        title: "",
        description: "",
    })

    const handleOpen = () => {
        setIsExpanded(true)
    }


    const send = async () => {

        try {
            if (data.title !== "" || data.description !== "") {
                const res = await createNote(data);
                console.log(res);
                setNoteCreated(true)
                setData({title:"",description:""});
            }
        } catch (error) {
            console.error("Error creating note:", error);
        }
    }

    const handleToggle = () => {

        if (data.title === "" && data.description === "") {
            setIsExpanded(false);
        } else {
            send();
            setIsExpanded(false);

        }

    };


    return (
        <>
            <div className={`note-input ${isExpanded ? 'expanded' : ''}`}>
                {isExpanded && (
                    <div className="note-form">
                        <input type="text" placeholder="Title" className="title-input" name="title" value={data.title} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                    </div>
                )}
                <div className="note-header" onClick={handleOpen}>
                    <input
                        type="text"
                        placeholder="Take a note..."
                        className={`note-input-field ${isExpanded ? 'expanded-field' : ''}`}
                        name="description" value={data.description} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                    />
                </div>
                {isExpanded && (
                    <div className="note-footer">
                        <IconBar />
                        <span className="close-btn" onClick={handleToggle}>Close</span>
                    </div>
                )}

            </div>
        </>
    )
}