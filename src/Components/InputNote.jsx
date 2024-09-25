import React, { useState, useEffect } from 'react';
import '../Style/search.css';
import IconBar from './IconBar';
import { createNote, retrieveNote, updateNote } from '../Services/noteService';
import { useParams } from 'react-router-dom';

export default function InputNote({ editn, close, noteCreated, setNoteCreated }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [colour, setColour] = useState('');
    const [edit, setEdit] = useState(editn || false);
    const { id } = useParams(); 
    const [edata, setEData] = useState({
        title: "",
        description: "",
        colour: ""
    });

    const [data, setData] = useState({
        title: "",
        description: "",
        colour: ""
    });

    useEffect(() => {
        if (edit) {
            const fetchNote = async () => {
                const res = await retrieveNote(id); 
                setEData({
                    title: res?.data?.note?.title || "",
                    description: res?.data?.note?.description || "",
                    colour: res?.data?.note?.colour || ""
                });
                setColour(res?.data?.note?.colour || ""); 
                console.log("Fetched note:", res?.data?.note);
            };
            fetchNote();
        }
    }, [id, edit]);

    
    const handleOpen = () => {
        setIsExpanded(true);
    };

    
    const send = async () => {
        if (data.title.trim() !== "" || data.description.trim() !== "") {
            try {
                const res = await createNote(data);
                //console.log(res);
                setNoteCreated(true);
                setData({ title: "", description: "", colour: "" });
            } catch (error) {
                console.error("Error creating note:", error);
            }
        }
    };

    const handleToggle = async () => {
        if (edit) {
            if (edata.title.trim() !== "" && edata.description.trim() !== "") {
                try {
                    const res = await updateNote(id, edata);
                    console.log("Note updated:", res);
                    setNoteCreated(true);
                    close();
                } catch (error) {
                    console.error("Error updating note:", error);
                }
            } else {
                console.log("Error: title and description cannot be empty");
            }
        } else {
            if (data.title.trim() !== "" || data.description.trim() !== "") {
                send(); 
            }
            setIsExpanded(false);
        }
    };

    
    const handleColour = (value) => {
        setColour(value);
        if (edit) {
            setEData(prevDetails => ({
                ...prevDetails,
                colour: value
            }));
        } else {
            setData(prevDetails => ({
                ...prevDetails,
                colour: value
            }));
        }
    };

    return (
        <>
            <div className={`note-input ${isExpanded ? 'expanded' : ''}`} style={{ backgroundColor: colour }}>
                {(isExpanded || edit) && (
                    <div className="note-form">
                        <input
                            type="text"
                            placeholder="Title"
                            className="title-input"
                            name="title"
                            value={edit ? edata.title : data.title}
                            onChange={(e) =>
                                edit
                                    ? setEData({ ...edata, [e.target.name]: e.target.value })
                                    : setData({ ...data, [e.target.name]: e.target.value })
                            }
                        />
                    </div>
                )}

                <div className="note-header" onClick={handleOpen}>
                    <input
                        type="text"
                        placeholder="Take a note..."
                        className={`note-input-field ${isExpanded ? 'expanded-field' : ''}`}
                        name="description"
                        value={edit ? edata.description : data.description}
                        onChange={(e) =>
                            edit
                                ? setEData({ ...edata, [e.target.name]: e.target.value })
                                : setData({ ...data, [e.target.name]: e.target.value })
                        }
                    />
                </div>

                {(isExpanded || edit) && (
                    <div className="note-footer">
                        <IconBar input={true} handleColour={handleColour} />
                        <span className="close-btn" onClick={handleToggle}>Close</span>
                    </div>
                )}
            </div>
        </>
    );
}
