import React, { useState } from 'react';
import IconBar from './IconBar';
import '../Style/SingleNote.css';
import { toggleArchiveNote, toggleTrashNote} from '../Services/noteService';
import { NavLink } from 'react-router-dom';

export default function SingleNote({ noteCreated,note, setNoteCreated, isGrid }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [notes, setNotes] = useState(note);
    
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleToggleArchive = async (noteId, currentStatus) => {
        try {
            await toggleArchiveNote(noteId, !currentStatus);
            const updatedNotes = notes.map(n => n._id === noteId ? { ...n, isArch: !currentStatus } : n);
            setNotes(updatedNotes);
        } catch (error) {
        }
    };
    
    const handleToggleTrash = async (noteId, currentStatus) => {
        try {
            await toggleTrashNote(noteId, !currentStatus);
            const updatedNotes = notes.map(n => n._id === noteId ? { ...n, isArch: !currentStatus } : n);
            setNotes(updatedNotes);
        } catch (error) {
        }
    };

    return (
        <div className={isGrid ? 'grid-view' : 'card-container-list'}>
            {note.map((ele, index) => (
                <NavLink
                    to={`/dashboard/notes/${ele._id}`}
                    key={ele._id}
                    style={{ textDecoration: 'none' }}
                >
                    <div
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        className='heading'
                        style = {{backgroundColor:`${ele.colour}`}}
                    >
                        <h2>{ele.title}</h2>
                        <p>{ele.description}</p>
                        {hoveredIndex === index && (
                            <div className="footer" >
                                <IconBar
                                    noteId={ele._id}
                                    isArchived={ele.isArch}
                                    isTrashed={ele.isTrash}
                                    onToggleArchive={() => handleToggleArchive(ele._id, ele.isArch)}
                                    onToggleTrash={() => handleToggleTrash(ele._id, ele.isTrash)}
                                    setNoteCreated={setNoteCreated}
                                    handleClose={() => setHoveredIndex(null)}
                                    style={{color:'white'}}
                                    
                                />
                               
                            </div>
                        )}
                    </div>
               
                </NavLink >
          ))}
        
        </div>
    );
}



