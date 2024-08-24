import { React, useState, useEffect } from 'react'
import IconBar from './IconBar';
import '../Style/SingleNote.css'

export default function SingleNote({ note }) {

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };
    const [isExpanded, setIsExpanded] = useState(false);

    const handleOpen = () => {
        setIsExpanded(true)
    }

    const handleToggle = () => {
        setIsExpanded(false);
    };

    return (
        <div className="card-container">
            {note.map((ele, index) => (
                <div
                    className="card"
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <h2>{ele.title}</h2>
                    <p>{ele.description}</p>
                    {hoveredIndex === index && <div > <IconBar /> <span className="close-btn" onClick={handleToggle}>Close</span></div>}
                </div>
            ))}
        </div>
    );
}