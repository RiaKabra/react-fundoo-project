// import React, { useEffect, useState } from 'react';
// import SideNav from '../Components/SideNav';
// import '../Style/dashboard.css';
// import InputNote from '../Components/InputNote';
// import { getAll } from '../Services/noteService';
// import SingleNote from '../Components/SingleNote';

// export default function Dashboard() {
//     const [note, setNote] = useState([]);
//     const [noteCreated, setNoteCreated] = useState(false);
//     const [tabs, setTabs] = useState(1)
//     const [filter,setFilter] = useState();

//     const getNotes = async () => {
//         try {
//             const res = await getAll();
//             const data1 = res?.note || [];
//             setNote(data1);
//         } catch (error) {
//             console.error("Failed to fetch notes:", error);
//             setNote([]);
//         }
//     };

//     useEffect(() => {
//         getNotes();
//     }, [noteCreated]);
    
//     const filtered = note.filter(item => {
//         if(tabs==1 && item.isTrash === false && item.isArch ===false)
//         {
//             return item
//         }
//         else if (tabs === 4 && item.isArch ===true)
//         {
//             console.log(item)
//             return item
//         }
//         else if (tabs===5 && item.isTrash ===true)
//         {
//             return item
//         }
//     });
//    const tab = (value)=>{
//     setTabs(value)
//    }

//     return (
//         <div style={{ backgroundColor: "#202124", height: '100vh', minHeight: '100vh' }}>
//             <SideNav />
//             <div className="search">
//                 <InputNote setNoteCreated={setNoteCreated} />
//             </div>
//             <div className="singlenote">
//                 <SingleNote note={note} />
//             </div>
//         </div>
//     );
// }

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

    const getNotes = async () => {
        try {
            const res = await getAll();
            const data1 = res?.note || [];
            setNote(data1);
            console.log(data1);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
            setNote([]);
        }
    };

    useEffect(() => {
        getNotes();
    }, [noteCreated, tabs]);

    const filtered = note.filter(item => {
        if (tabs === 1 && item.isTrash===false && item.isArch===false) {
            return item;
        } else if (tabs === 4 && item.isArch===true) {
            return item;
        } else if (tabs === 5 && item.isTrash===true) {
            return item;
        }
        return false;
    });

    const tab = (value) => {
        setTabs(value);
    };

    return (
        <div style={{ backgroundColor: "#202124", height: '100vh', minHeight: '100vh' }}>
            <SideNav setTabs={setTabs} />
            <div className="search">
                <InputNote setNoteCreated={setNoteCreated} />
            </div>
            <div className="singlenote">
                <SingleNote note={filtered} />
            </div>
        </div>
    );
}
