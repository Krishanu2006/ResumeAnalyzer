import {createBrowserRouter} from "react-router";
import Login from "./festures/auth/pages/Login.jsx";
import Register from "./festures/auth/pages/Register.jsx";
import ProtectedRoute from './festures/auth/components/ProtectedRoute.jsx'
import Home from './festures/interview/pages/Home.jsx'
import Interview from "./festures/interview/pages/Interview.jsx";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/",
        element: <ProtectedRoute><Home/></ProtectedRoute>
    },
    {
        path:"/interview/:interviewId",
        element:<ProtectedRoute><Interview/></ProtectedRoute>
    }
])