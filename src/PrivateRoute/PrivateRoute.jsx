import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = use(AuthContext);
    // console.log(user);

    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (user) {
        return children;
    }


    return <Navigate state={location?.pathname} to={"/register"}></Navigate>


};

export default PrivateRoute;