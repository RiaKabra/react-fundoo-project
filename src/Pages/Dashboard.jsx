import React, { useEffect, useState } from 'react';
import SideNav from '../Components/SideNav';
import '../Style/dashboard.css';
import InputNote from '../Components/InputNote';
import { getAll } from '../Services/noteService';
import SingleNote from '../Components/SingleNote';
import GridViewIcon from '@mui/icons-material/GridView';
import ListViewIcon from '@mui/icons-material/ViewList';
import Header from '../Components/Header';

export default function Dashboard() {
    const [note, setNote] = useState([]);
    const [noteCreated, setNoteCreated] = useState(false);
    const [tabs, setTabs] = useState(1);
    const [isGrid, setIsGrid] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); 
    


    const handleToggleView = (value) => {
        setIsGrid(value);
    };

    const handleSearch = (query) => {
        console.log(query);
        const filteredNotes = note.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.description.toLowerCase().includes(query.toLowerCase())
        );

        setNote(filteredNotes);
        // setDisplayedNotes(filteredNotes);
    };
    
    const getNotes = async () => {
        try {
            const res = await getAll();
            console.log("Notes fetched:", res); 
            if (res.note) {
                setNote(res.note); 
            } else {
                setNote([]);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNote([]);
        }
    };

    useEffect(() => {
        getNotes();
    }, [noteCreated, tabs]);
    // useEffect(()=>{
    //    handleSearch(searchTerm);
    // },[searchTerm]);
    
    const filtered = note.filter(item => {
      if (tabs === 1 && !item.isTrash && !item.isArch) {
        return item.title.includes(searchTerm) || item.description.includes(searchTerm);
      } else if (tabs === 4 && item.isArch) {
        return item.title.includes(searchTerm) || item.description.includes(searchTerm);
      } else if (tabs === 5 && item.isTrash) {
        return item.title.includes(searchTerm) || item.description.includes(searchTerm);
      }
      return false;
  });
  
    
    // const function_1 = ()=>
    // {
    //    console.log("message is called--------->");
    // }
    const filt = (value)=>{
          setSearchTerm(value);
    }
    return (
        <div style={{ backgroundColor: "#202124", height: '100vh', minHeight: '100vh' }}>
            {/* <Header handleView={handleToggleView} filt={filt}  /> */}
            
            <SideNav setTabs={setTabs} handleToggleView={handleToggleView} filt={filt}/>
            
            <div className="search">
                <InputNote setNoteCreated={setNoteCreated} noteCreated={noteCreated} />
            </div>
            <div className="view-toggle">
                {/* Optional toggle view logic */}
            </div>
            <div className="search">
                {filtered.length > 0 ? (
                    <SingleNote 
                        note={filtered} 
                        setNoteCreated={setNoteCreated} 
                        noteCreated={noteCreated}
                        isGrid={isGrid} 
                    />
                ) : (
                    <p style={{color:'white'}}>No notes available</p> 
                )}
            </div>
        </div>
    );
}
