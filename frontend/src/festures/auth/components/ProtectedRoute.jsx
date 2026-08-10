import { useAuth } from '../hooks/useAuth.js'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { isLoading, user } = useAuth();

    console.log("ProtectedRoute:", {
        isLoading,
        user
    });

    if (isLoading) {
        return <div>Loading.......</div>;
    }

    if (!user) {
        console.log("No authenticated user → redirecting");
        return <Navigate to="/login" replace />;
    }

    console.log("Authenticated → rendering protected page");

    return children;
};

export default ProtectedRoute