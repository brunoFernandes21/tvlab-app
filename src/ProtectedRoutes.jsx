
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = ({ user, children }) => {
    if(!user) {
        return <Navigate to={"/landing-page"} replace={true}/>
    }
    return children
}