import { Navigate } from "react-router-dom";
export const AuthRoute = ({children}) =>
{
    const token = localStorage.getItem('token');
    if(!token)
    {
        return children;
    }

    return <Navigate to = '/dashboard' replace />
}