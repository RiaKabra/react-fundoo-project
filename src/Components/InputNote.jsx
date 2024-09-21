import React, { useState, useEffect } from 'react'
import '../Style/search.css'
import IconBar from './IconBar';
import { createNote ,retrieveNote,updateNote} from '../Services/noteService';
import { useParams } from 'react-router-dom';


export default function InputNote({editn, close, noteCreated,setNoteCreated}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [colour,setColour] = useState();
    const [input,setInput] = useState(true);
    const {id}=useParams();
    const [data, setData] = useState({
        title: "",
        description: "",
        colour:colour
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
                setData({title:"",description:"",colour:colour});
            }
        } catch (error) {
            console.error("Error creating note:", error);
        }
        console.log(noteCreated)
    }

    const handleColour = async(value) =>{
        setColour(value);
        setData(prevDetails => ({
            ...prevDetails,

            colour: value
        }));
    }

    const handleToggle = async () => {
            if (data.title === "" && data.description === "") {
                setIsExpanded(false);
                setColour("")
            } else {
                await send();
                setIsExpanded(false);
                setData({
                    title: "",
                    description: "",
                    colour: ""
                });
                setColour("")
            }
        }
    


    return (
        <>
            <div className={`note-input ${isExpanded ? 'expanded' : ''}` } style={{backgroundColor:colour}}>
            {(isExpanded || edit === true) && (
                    <div className="note-form" >
                        <input
                            type="text"
                            placeholder="Title"
                            className="title-input"
                            name="title"
                            value={ data.title}
                            onChange={(e) =>
                                     setData({ ...data, [e.target.name]: e.target.value })
                            }

                        />
                    </div>
                )}

            <div className="note-header" onClick={handleOpen} >
                    <input
                        type="text"
                        placeholder="Take a note..."
                        className={`note-input-field ${isExpanded ? 'expanded-field' : ''}`} 
                        name="description"
                        value={ data.description}
                        onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                        }

                    />
                </div>
                {(isExpanded || edit === true) && (
                    <div className="note-footer" >
                        <IconBar  input={input} handleCol={handleColour} />
                        <span className="close-btn" onClick={handleToggle}>Close</span>
                    </div>
                )}

            </div>
        </>
    )
}