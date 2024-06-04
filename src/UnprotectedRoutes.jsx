
import { Navigate } from "react-router-dom"

export const UnProtectedRoutes = ({ user, children }) => {
    if(user) {
        return <Navigate to="/" replace={true}/>
    }
    return children
}