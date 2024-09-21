import React, { useEffect, useState } from 'react';
import SideNav from '../Components/SideNav';
import '../Style/dashboard.css';
import InputNote from '../Components/InputNote';
import { getAll } from '../Services/noteService';
import SingleNote from '../Components/SingleNote';
import GridViewIcon from '@mui/icons-material/GridView';
import ListViewIcon from '@mui/icons-material/ViewList';
export default function Dashboard() {
    const [note, setNote] = useState([]);
    const [noteCreated, setNoteCreated] = useState(false);
    const [tabs, setTabs] = useState(1);
    const [isGrid, setIsGrid] = useState(true);
    const handleToggleView = (value) => {
      setIsGrid(value);
    };

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
    });

    // const toggleView = () => {
    //     setIsGrid(!isGrid);
    // };

    return (
        <div style={{ backgroundColor: "#202124", height: '100vh', minHeight: '100vh' }}>
          <SideNav setTabs={setTabs} handleToggleView={handleToggleView}/>
          <div className="search">
            <InputNote setNoteCreated={setNoteCreated} noteCreated ={noteCreated} />
          </div>
          <div className="view-toggle">
          
              {/* {isGrid ? 'Switch to List View' : 'Switch to Grid View'} */}
         
            {/* // <IconButton onClick={handleToggleView} aria-label="Toggle View" style={{ color: 'white' }}>
            //             {isGrid ? <ListViewIcon /> : <GridViewIcon />}
            //         </IconButton> */}
          </div>
          <div className="search">
            <SingleNote 
              note={filtered} 
              setNoteCreated={setNoteCreated} 
              noteCreated={noteCreated}
              isGrid={isGrid} 
            />
          </div>
        </div>
    );
}
