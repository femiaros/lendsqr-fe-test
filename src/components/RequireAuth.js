//component to helps protect routes
import { useLocation, Navigate,Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();

  return (
    auth?.admin 
        ? <Outlet /> //protected page can only be accessed when user is logged in
          :
          <Navigate to='/' state={{from: location}} replace />
        // Navigate helps to replace route-where user-with-no-access is coming from with '/' login-page-path, 
  );
}

export default RequireAuth