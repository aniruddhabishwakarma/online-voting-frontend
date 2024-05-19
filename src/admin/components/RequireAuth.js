import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AdminLayout from "../AdminLayout";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.admin
            ? <Outlet></Outlet>
            : <Navigate to = "/adminlogin" state = {{from: location}} replace />
            
    );
}
export default RequireAuth;