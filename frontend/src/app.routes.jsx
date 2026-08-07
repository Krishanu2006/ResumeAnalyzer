import { createBrowserRouter } from "react-router";

import Login from "./festures/auth/pages/Login.jsx";
import Register from "./festures/auth/pages/Register.jsx";
import ProtectedRoute from "./festures/auth/components/ProtectedRoute.jsx";

import Home from "./festures/interview/pages/Home.jsx";
import Interview from "./festures/interview/pages/Interview.jsx";
import PreviousReportsPage from "./festures/interview/pages/PreviousReportsPage.jsx";

import AppLayout from "./festures/shared/components/AppLayout.jsx";

export const router = createBrowserRouter([
// ─────────────────────────────────────
// Pages WITHOUT Header
// ─────────────────────────────────────

{
    path: "/login",
    element: <Login />
},
{
    path: "/register",
    element: <Register />
},

// ─────────────────────────────────────
// Pages WITH Header
// ─────────────────────────────────────

{
    element: <AppLayout />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/interview/:interviewId",
            element: (
                <ProtectedRoute>
                    <Interview />
                </ProtectedRoute>
            )
        },
        {
            path: "/interview/reports",
            element: (
                <ProtectedRoute>
                    <PreviousReportsPage />
                </ProtectedRoute>
            )
        },
        {
            path: "/interview/guest",
            element: <Interview />
        }
    ]
}
]);
