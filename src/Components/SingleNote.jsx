// import React, { useState } from 'react';
// import IconBar from './IconBar';
// import '../Style/SingleNote.css';

// export default function SingleNote({ note }) {
//     const [hoveredIndex, setHoveredIndex] = useState(null);
//     const [notes, setNotes] = useState(note);

//     const handleMouseEnter = (index) => {
//         setHoveredIndex(index);
//     };

//     const handleMouseLeave = () => {
//         setHoveredIndex(null);
//     };

//     return (
//         <div className="card-container">
//             {note.map((ele, index) => (
//                 <div
//                     className="card"
//                     key={index}
//                     style={{ backgroundColor: ele.color }} 
//                     onMouseEnter={() => handleMouseEnter(index)}
//                     onMouseLeave={handleMouseLeave}
//                 >
//                     <h2>{ele.title}</h2>
//                     <p>{ele.description}</p>
//                     {hoveredIndex === index && (
//                         <div className="footer">
//                             <IconBar
//                                 noteId={ele._id}
//                                 onColorChange={(color) => handleColorChange(index, color)}
//                                 handleClose={() => setHoveredIndex(null)} // Assuming handleClose closes the color picker
// />
                            
//                             <span className="close-btn" onClick={() => setHoveredIndex(null)}>
//                                 Close
//                             </span>
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }

import React, { useState } from 'react';
import IconBar from './IconBar';
import '../Style/SingleNote.css';
import { toggleArchiveNote } from '../Services/noteService';
import { NavLink } from 'react-router-dom';
export default function SingleNote({ note }) {
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
            console.error("Error toggling archive status:", error);
        }
    };

    return (
        <div className="card-container">
            {note.map((ele, index) => (
                <NavLink 
                to={`/dashboard/note/${ele._id}`} key={ele._id}  >
                <div
                    className="card"
                    key={index}
                    style={{ backgroundColor: ele.color }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <h2>{ele.title}</h2>
                    <p>{ele.description}</p>
                    {hoveredIndex === index && (
                        <div className="footer">
                            <IconBar
                                noteId={ele._id}
                                isArchived={ele.isArch}
                                onToggleArchive={() => handleToggleArchive(ele._id, ele.isArch)}
                                handleClose={() => setHoveredIndex(null)}
                            />
                            <span className="close-btn" onClick={() => setHoveredIndex(null)}>
                                Close
                            </span>
                        </div>
                    )}
                </div>
                </NavLink>
            ))}
        </div>
    );
}






