import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth.js";
import "../style/header.scss";

const Header = () => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            await handleLogout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="app-header">
            <div className="app-header__inner">

                {/* Logo */}
                <NavLink to="/" className="app-header__brand">
                    <span className="app-header__logo">
                        RA
                    </span>

                    <span className="app-header__name">
                        Resume<span>Analyzer</span>
                    </span>
                </NavLink>

                {/* Navigation */}
                <nav className="app-header__nav">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `app-header__link ${isActive ? "active" : ""}`
                        }
                    >
                        Home
                    </NavLink>

                    {user && (
                        <NavLink
                            to="/reports"
                            className={({ isActive }) =>
                                `app-header__link ${isActive ? "active" : ""}`
                            }
                        >
                            My Reports
                        </NavLink>
                    )}

                </nav>

                {/* Right Side */}
                <div className="app-header__actions">

                    {user ? (
                        <div className="app-header__user">

                            <div className="app-header__avatar">
                                {(
                                    user.name ||
                                    user.username ||
                                    user.email ||
                                    "U"
                                )
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="app-header__user-info">
                                <span className="app-header__user-name">
                                    {user.name || user.username || "User"}
                                </span>

                                <span className="app-header__user-email">
                                    {user.email}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="app-header__logout"
                                onClick={onLogout}
                            >
                                Logout
                            </button>

                        </div>
                    ) : (
                        <div className="app-header__auth">

                            <button
                                type="button"
                                className="app-header__login"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                className="app-header__signup"
                                onClick={() => navigate("/register")}
                            >
                                Sign Up
                            </button>

                        </div>
                    )}

                </div>

            </div>
        </header>
    );


};

export default Header;
