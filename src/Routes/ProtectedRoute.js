import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({children}) =>{
    const token = localStorage.getItem('token');
    if(token && token!== 'undefined')
    {
        return children;
    }

    return <Navigate to = '/' replace />
    
}