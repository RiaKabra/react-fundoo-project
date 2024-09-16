import React, { useEffect, useState } from 'react';
import SideNav from '../Components/SideNav';
import '../Style/dashboard.css';
import InputNote from '../Components/InputNote';
import { getAll } from '../Services/noteService';
import SingleNote from '../Components/SingleNote';

export default function Dashboard() {
    const [note, setNote] = useState([]);
    const [noteCreated, setNoteCreated] = useState(false);
    const [tabs, setTabs] = useState(1);
    const [isGrid, setIsGrid] = useState(true);

    const getNotes = async () => {
        try {
            const res = await getAll();
            const data1 = res?.note || [];
            setNote(data1);
        } catch (error) {
            setNote([]);
        }
    };

    useEffect(() => {
        getNotes();
    }, [noteCreated, tabs]);

    const filtered = note.filter(item => {
        if (tabs === 1 && item.isTrash === false && item.isArch === false) {
            return item;
        } else if (tabs === 4 && item.isArch === true) {
            return item;
        } else if (tabs === 5 && item.isTrash === true) {
            return item;
        }
        return false;
    });

    const toggleView = () => {
        setIsGrid(!isGrid);
    };

    return (
        <div style={{ backgroundColor: "#202124", height: '100vh', minHeight: '100vh' }}>
          <SideNav setTabs={setTabs} />
          <div className="search">
            <InputNote setNoteCreated={setNoteCreated} />
          </div>
          <div className="view-toggle">
            <button onClick={toggleView}>
              {isGrid ? 'Switch to List View' : 'Switch to Grid View'}
            </button>
          </div>
          <div className="search">
            <SingleNote 
              note={filtered} 
              setNoteCreated={setNoteCreated} 
              isGrid={isGrid} 
            />
          </div>
        </div>
    );
}
