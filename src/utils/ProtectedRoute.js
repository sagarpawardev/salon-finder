import { Navigate, matchRoutes, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";

const importantPrefMissing = (auth) => {
    // return !auth?.user?.city || !auth?.user?.gender;
    return auth?.user?.user ? !auth.user.user.name : !auth.user.name;
};

export const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    const PROFILE_ROUTES = [{
        path: "/profile"
    }];

    if(!auth) {
        return <Navigate to="/signin" />
    }
    else if(!matchRoutes(PROFILE_ROUTES, location) && importantPrefMissing(auth)) { // to avoid infinite loop check if its a self loop
        return <Navigate to="/profile" />
    }
    else{
        return children;
    }
};

export default ProtectedRoute;