import {useAuth} from '../hooks/useAuth.js'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {isLoading, user} = useAuth()
    if(isLoading) {
        return (
            <main><h1>Loading.......</h1></main>
        )
    }

    if(!user) {
        return <Navigate to={'/login'} replace/>
    }
  return children
}

export default ProtectedRoute