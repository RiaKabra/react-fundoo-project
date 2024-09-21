import React, { useState, useEffect } from 'react'
import '../Style/search.css'
import IconBar from './IconBar';
import { createNote ,retrieveNote,updateNote} from '../Services/noteService';
import { useParams } from 'react-router-dom';


export default function InputNote({editn, close, noteCreated,setNoteCreated}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [colour,setColour] = useState();
    const [input,setInput] = useState(true);
    const[edit,setEdit]=useState(false || editn);
    const {id}=useParams();
    const [data, setData] = useState({
        title: "",
        description: "",
        colour:colour
    })
    const [edata, setEData] = useState({
        title: "",
        description: "",
        colour: colour
    });
    useEffect(() => {
        const fetchNote = async () => {
            const res = await retrieveNote(id);
            setEData(res?.data?.note);
            console.log(res?.data?.note)
        }
        fetchNote();
    }, [id]);
    
   

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
        setEData(prevDetails => ({
            ...prevDetails,

            colour: value
        }));
    }

    const handleToggle = async () => {
        if (edit === true) {
            console.log(id);
            console.log(edata);
            const res = await updateNote(id, edata);
            console.log(res);
            setNoteCreated(true);
            close()
        } else {
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
    };


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
                            value={edit === true ? edata.title : data.title}
                            onChange={(e) =>
                                edit === true
                                    ? setEData({ ...edata, [e.target.name]: e.target.value })
                                    : setData({ ...data, [e.target.name]: e.target.value })
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
                        value={edit === true ? edata.description : data.description}
                        onChange={(e) =>
                            edit === true
                                ? setEData({ ...edata, [e.target.name]: e.target.value })
                                : setData({ ...data, [e.target.name]: e.target.value })
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