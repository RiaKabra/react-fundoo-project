import React, { useState, useEffect } from 'react';
import IconBar from './IconBar';
import '../Style/SingleNote.css';
import { toggleArchiveNote, toggleTrashNote } from '../Services/noteService';
import { NavLink } from 'react-router-dom';
import Edit from './Edit';

export default function SingleNote({ noteCreated, note, setNoteCreated, isGrid }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [notes, setNotes] = useState(note);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setNotes(note);
    }, [note]);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleToggleArchive = async (e, noteId, currentStatus) => {
        e.stopPropagation();
        try {
            await toggleArchiveNote(noteId, !currentStatus);
            const updatedNotes = notes.map(n =>
                n._id === noteId ? { ...n, isArch: !currentStatus } : n
            );
            setNotes(updatedNotes);
        } catch (error) {
            console.error("Error archiving note:", error);
        }
    };

    const handleToggleTrash = async (noteId, currentStatus) => {
        try {
            await toggleTrashNote(noteId, !currentStatus);
            const updatedNotes = notes.map(n =>
                n._id === noteId ? { ...n, isTrash: !currentStatus } : n
            );
            setNotes(updatedNotes);
        } catch (error) {
            console.error("Error trashing note:", error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    console.log("Notes passed to SingleNote component:", notes);

    return (
        <div className={isGrid ? 'grid-view' : 'card-container-list'}>
            {notes.length > 0 ? (
                notes.map((ele, index) => (
                    <NavLink
                        to={`/dashboard/notes/${ele._id}`}
                        key={ele._id}
                        style={{ textDecoration: 'none' }}
                    >
                        <div
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            className='heading'
                            style={{ backgroundColor: `${ele.colour}` }}
                        >
                            <div onClick={openModal}>
                                <h2>{ele.title}</h2>
                                <p>{ele.description}</p>
                            </div>
                            {hoveredIndex === index && (
                                <div className="footer" onMouseLeave={handleMouseLeave}>
                                    <IconBar
                                        noteId={ele._id}
                                        isArchived={ele.isArch}
                                        isTrashed={ele.isTrash}
                                        onToggleArchive={(e) => handleToggleArchive(e, ele._id, ele.isArch)}
                                        onToggleTrash={() => handleToggleTrash(ele._id, ele.isTrash)}
                                        setNoteCreated={setNoteCreated}
                                        handleClose={() => setHoveredIndex(null)}
                                    />
                                </div>
                            )}
                        </div>
                    </NavLink>
                ))
            ) : (
                <p>No notes available</p>
            )}
            {isModalOpen && (
                <Edit onClose={closeModal} setNoteCreated={setNoteCreated} noteCreated={noteCreated} />
            )}
        </div>
    );
}



