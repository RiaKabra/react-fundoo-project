// // import React from 'react'
// // import SideNav from '../Components/SideNav'
// // //import '../Style/dasboard.css'
// // import InputNote from '../Components/InputNote'
// // export default function Dashboard() {
// //     return (
// //         <>
// //             <div style={{ backgroundColor: "#202124", height: '100vh', minHeight: '100vh' }}>
// //                 <SideNav />
// //                 <div className="search">
// //                     <InputNote />

// //                 </div>
// //             </div>


// //         </>
// //     )
// // }
// import React from 'react';
// import SideNav from '../Components/SideNav';
// import InputNote from '../Components/InputNote';
// import { IconButton } from '@mui/material';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useNavigate } from 'react-router-dom';

// export default function Dashboard() {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         console.log('Logout button clicked'); 
//         localStorage.removeItem('token');
//         navigate('/');

//         const getNotes = async () => {
//             try {
//                 const res = await allnote();
//                 const data1 = res?.data?.data || [];
//                 setNote(data1);
//             } catch (error) {
//                 console.error("Failed to fetch notes:", error);
//                 setNote([]); 
//             }
//         }
//         console.log(note)
//         useEffect(() => {
//             getNotes();
//         }, [])
//     };
    

//     return (
//         <>
//             <div style={{ backgroundColor: "#202124", height: '100vh', minHeight: '100vh', position: 'relative' }}>
//                 <div style={{ position: 'absolute', right: 20, top: 20 }}>
//                     <IconButton onClick={handleLogout} color="inherit">
//                         <LogoutIcon />
//                     </IconButton>
//                 </div>
//                 <SideNav />
//                 <div className="search">
//                     <InputNote />
//                 </div>
//             </div>
//         </>
//     );
// }

import React, { useEffect, useState } from 'react'
import SideNav from '../Components/SideNav'
import '../Style/dashboard.css'
import InputNote from '../Components/InputNote'
import { getAll } from '../Services/noteService'
import SingleNote from '../Components/SingleNote'

export default function Dashboard() {

    const [note, setNote] = useState([])

    const getNotes = async () => {
        try {
            const res = await getAll();
            const data1 = res?.data?.data || [];
            setNote(data1);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
            setNote([]); // Fallback to an empty array in case of an error
        }
    }
    console.log(note)
    useEffect(() => {
        getNotes();
    }, [])


    return (

        <>
            <div style={{ backgroundColor: "#202124", height: '100vh', minHeight: '100vh' }} >
                <SideNav />
                <div className="search">
                    <InputNote />
                </div>
                <div className="singlenote">
                    <SingleNote note={note} />
                </div>
            </div>


        </>
    )
}
