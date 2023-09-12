import { useAuth } from "./AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    return token ? (<Outlet />) : (<Navigate to='/' />)
}

export function InitialRoute() {
    const { roles } = useAuth();

    if (roles.length > 0) {
        return roles.some((role) => role === 'ROLE_ADMIN' || role === 'ROLE_ATENDENTE') ? (<Outlet />) : <Navigate to='/inicio' />
    }
}

export function DetailsRoute() {
    const { roles } = useAuth();

    if (roles.length > 0) {
        return roles.some((role) => role === 'ROLE_ADMIN' || role === 'ROLE_ATENDENTE') ? (<Outlet />) : <Navigate to='/inicio' />
    }
}

export function NewUserRoute() {
    const { roles } = useAuth();

    if (roles.length > 0) {
        return roles.some((role) => role === 'ROLE_ADMIN') ? (<Outlet />) : <Navigate to='/inicio' />
    }
}
