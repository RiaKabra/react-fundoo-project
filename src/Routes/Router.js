import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Edit from '../Components/Edit'
import Dashboard from '../Pages/Dashboard'
import { AuthRoute } from './AuthRoute'
import { ProtectedRoute } from './ProtectedRoute'
import SingleNote from '../Components/SingleNote'
import { getAll,createNote,toggleArchiveNote,retrieveNote,updateNote,deleteNote,colourUpdate,toggleTrashNote } from '../Services/noteService'
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path = '/' element ={<AuthRoute><Login/></AuthRoute>}/>
      <Route path = '/signup' element ={<AuthRoute><SignUp/></AuthRoute>}/> 
      <Route path = '/dashboard/' element ={<ProtectedRoute><Dashboard/></ProtectedRoute>}> 
      <Route path="/dashboard/notes/:id" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

